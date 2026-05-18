import { useCallback, useEffect, useMemo, useState } from 'react';
import { adminConfig } from './adminConfig';
import {
  brand,
  nextEvent,
  form,
  agenda,
  logos,
} from '../data/content';
import {
  login as apiLogin,
  getToken,
  clearToken,
  inscripciones as apiInscripciones,
  gastos as apiGastos,
  proveedores as apiProveedores,
  isDev,
} from './api';
import {
  seedInscripciones,
  seedGastos,
  seedProveedores,
} from './seedData';

// =====================================================
// Hub privado de las fundadoras (/admin)
// Backend: Vercel serverless + Upstash Redis (Vercel KV).
// En dev local, usa localStorage como fake backend.
// =====================================================

const STORAGE_KEYS = {
  checklist: 'ss_admin_checklist_v1',
  notas: 'ss_admin_notas_v1',
};

const PRICE_INSCRIPCION = 20000; // ₡20.000 por inscripción (ver nextEvent.price)

// -------------------------------
// Hooks
// -------------------------------
function useLocalState(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);
  return [value, setValue];
}

function useResource(api) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const reload = useCallback(async () => {
    setStatus('loading');
    setError('');
    try {
      const list = await api.list();
      setItems(list);
      setStatus('success');
    } catch (err) {
      setError(err.message || 'Error cargando.');
      setStatus('error');
    }
  }, [api]);

  useEffect(() => {
    reload();
  }, [reload]);

  const create = async (data) => {
    const item = await api.create(data);
    setItems((prev) => [item, ...prev]);
    return item;
  };
  const update = async (id, patch) => {
    const item = await api.update(id, patch);
    setItems((prev) => prev.map((x) => (x.id === id ? item : x)));
    return item;
  };
  const remove = async (id) => {
    await api.remove(id);
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  return { items, status, error, reload, create, update, remove };
}

// -------------------------------
// Helpers
// -------------------------------
function fmtCRC(n) {
  const num = Number(n) || 0;
  return new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 0,
  }).format(num);
}

function fmtDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('es-CR', {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return iso;
  }
}

function eventDate() {
  return new Date('2026-06-13T10:00:00-06:00');
}

function useCountdown(target) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  const diffMs = target.getTime() - now.getTime();
  const totalMinutes = Math.max(0, Math.floor(diffMs / 60_000));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  return { days, hours, isPast: diffMs <= 0 };
}

// -------------------------------
// Password gate
// -------------------------------
function PasswordGate({ onUnlock }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiLogin(input);
      onUnlock();
    } catch (err) {
      setError(err.message || 'Contraseña incorrecta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm"
      >
        <img
          src={logos.wineOnCream}
          alt="Sculpt Society"
          className="mx-auto mb-6 h-16 w-auto rounded-xl object-contain"
        />
        <h1 className="display text-2xl text-wine text-center">
          Hub de fundadoras
        </h1>
        <p className="mt-2 text-center text-sm text-charcoal/60">
          Espacio privado. Ingresá la contraseña.
        </p>
        <label htmlFor="pwd" className="label-base mt-8">
          Contraseña
        </label>
        <input
          id="pwd"
          type="password"
          autoFocus
          className="input-base"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error) setError('');
          }}
        />
        {error && <p className="mt-3 text-xs text-orange">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-6 w-full disabled:opacity-60"
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>
        <a
          href="/"
          className="mt-4 block text-center text-xs text-charcoal/50 hover:text-wine"
        >
          ← Volver al sitio público
        </a>
        {isDev && (
          <p className="mt-6 rounded-lg bg-pink/30 p-3 text-[10px] leading-snug text-charcoal/70">
            <strong>Modo dev:</strong> usá la contraseña <code>sparkle2026</code>.
            Los datos se guardan en este navegador hasta deploy a Vercel.
          </p>
        )}
      </form>
    </div>
  );
}

// -------------------------------
// Section: Resumen / Dashboard financiero
// -------------------------------
function ResumenSection({ inscripcionesData, gastosData, proveedoresData }) {
  const target = useMemo(() => eventDate(), []);
  const { days, hours, isPast } = useCountdown(target);

  const totalInscritas = inscripcionesData.items.length;
  const pagadas = inscripcionesData.items.filter(
    (x) => x.pagoConfirmado
  ).length;
  const totalIngresos = pagadas * PRICE_INSCRIPCION;
  const totalGastos = gastosData.items.reduce(
    (acc, g) => acc + (Number(g.monto) || 0),
    0
  );
  const balance = totalIngresos - totalGastos;

  const allEmpty =
    inscripcionesData.items.length === 0 &&
    gastosData.items.length === 0 &&
    proveedoresData.items.length === 0 &&
    inscripcionesData.status === 'success' &&
    gastosData.status === 'success' &&
    proveedoresData.status === 'success';

  return (
    <div className="space-y-6">
      {allEmpty && (
        <SeedImporter
          inscripcionesData={inscripcionesData}
          gastosData={gastosData}
          proveedoresData={proveedoresData}
        />
      )}

      <div className="rounded-3xl bg-wine p-8 text-cream">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold">
          {isPast ? 'Evento pasado' : 'Cuenta regresiva'}
        </p>
        <p className="display mt-3 text-5xl">
          {isPast ? '✦' : `${days}d ${hours}h`}
        </p>
        <p className="mt-2 text-sm text-cream/70">
          al {nextEvent.title} — {nextEvent.date}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          tone="white"
          label="Inscritas"
          value={totalInscritas}
          hint={`${pagadas} pagadas`}
        />
        <StatCard
          tone="white"
          label="Ingresos"
          value={fmtCRC(totalIngresos)}
          hint={`${pagadas} × ${fmtCRC(PRICE_INSCRIPCION)}`}
        />
        <StatCard
          tone="white"
          label="Gastos"
          value={fmtCRC(totalGastos)}
          hint={`${gastosData.items.length} movimientos`}
        />
        <StatCard
          tone={balance >= 0 ? 'wine' : 'orange'}
          label="Balance"
          value={fmtCRC(balance)}
          hint={balance >= 0 ? 'Ganancia hasta hoy' : 'Pérdida hasta hoy'}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-orange">
            Evento
          </p>
          <p className="mt-2 text-base font-medium text-wine">
            {nextEvent.title}
          </p>
          <p className="text-sm text-charcoal/70">{nextEvent.date} · {nextEvent.time}</p>
          <p className="text-sm text-charcoal/70">{nextEvent.location}</p>
        </div>
        <div className="rounded-2xl bg-white p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-orange">
            Próximos pasos
          </p>
          <ul className="mt-2 space-y-1 text-sm text-charcoal/80">
            <li>· Pasá a Inscripciones para ver quién falta de pagar</li>
            <li>· Pasá a Gastos para registrar lo último que pagaron</li>
            <li>· Pasá a Checklist para ver qué queda por hacer</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function SeedImporter({ inscripcionesData, gastosData, proveedoresData }) {
  const [importing, setImporting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const total =
    seedInscripciones.length + seedGastos.length + seedProveedores.length;

  const run = async () => {
    setImporting(true);
    setError('');
    try {
      for (const it of seedInscripciones) {
        await inscripcionesData.create(it);
      }
      for (const g of seedGastos) {
        await gastosData.create(g);
      }
      for (const p of seedProveedores) {
        await proveedoresData.create(p);
      }
      setDone(true);
    } catch (err) {
      setError(err.message || 'Error importando datos.');
    } finally {
      setImporting(false);
    }
  };

  if (done) return null;

  return (
    <div className="rounded-3xl bg-gold/30 p-6">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-orange">
        Datos iniciales del evento
      </p>
      <h3 className="display mt-2 text-2xl text-wine">
        Importar {total} registros precargados
      </h3>
      <p className="mt-2 text-sm text-charcoal/70">
        Tenemos los datos de los Excel de Gastos e Ingresos listos para cargar:
        {' '}
        <strong>{seedInscripciones.length} inscritas</strong>,{' '}
        <strong>{seedGastos.length} gastos</strong> (₡
        {seedGastos.reduce((a, g) => a + g.monto, 0).toLocaleString('es-CR')}),
        y <strong>{seedProveedores.length} proveedor</strong>.
      </p>
      {error && (
        <p className="mt-3 rounded-lg bg-orange/20 p-3 text-sm text-orange">
          {error}
        </p>
      )}
      <button
        onClick={run}
        disabled={importing}
        className="btn-primary mt-4 disabled:opacity-60"
      >
        {importing ? 'Importando…' : 'Importar datos iniciales'}
      </button>
    </div>
  );
}

function StatCard({ tone, label, value, hint }) {
  const cls =
    tone === 'wine'
      ? 'bg-wine text-cream'
      : tone === 'orange'
        ? 'bg-orange text-cream'
        : 'bg-white';
  const labelCls =
    tone === 'wine' || tone === 'orange'
      ? 'text-gold'
      : 'text-orange';
  const hintCls =
    tone === 'wine' || tone === 'orange'
      ? 'text-cream/60'
      : 'text-charcoal/50';
  const valueCls =
    tone === 'wine' || tone === 'orange' ? '' : 'text-wine';

  return (
    <div className={`rounded-2xl p-5 ${cls}`}>
      <p
        className={`text-[10px] font-medium uppercase tracking-[0.2em] ${labelCls}`}
      >
        {label}
      </p>
      <p className={`display mt-1 text-3xl ${valueCls}`}>{value}</p>
      {hint && <p className={`mt-1 text-[11px] ${hintCls}`}>{hint}</p>}
    </div>
  );
}

// -------------------------------
// Section: Inscripciones (CRUD nativa)
// -------------------------------
function InscripcionesSection({ data }) {
  const { items, status, error, reload, create, update, remove } = data;
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((it) =>
      [
        it.nombre,
        it.email,
        it.telefono,
        it.instagram,
        it.brunch,
        it.notas,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [items, query]);

  const togglePago = (it) =>
    update(it.id, { pagoConfirmado: !it.pagoConfirmado });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Inscripciones</p>
          <h2 className="display text-3xl text-wine">Quién viene al evento</h2>
          <p className="mt-2 max-w-2xl text-sm text-charcoal/70">
            Cada inscripción del formulario público aparece acá automáticamente.
            Marcalas pagadas con un clic, agregales notas, o agregá manualmente
            las que entren por WhatsApp.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={reload} className="btn-secondary text-xs">
            ↻ Refrescar
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setShowForm(true);
            }}
            className="btn-primary"
          >
            + Agregar inscripción
          </button>
        </div>
      </div>

      {/* Search */}
      {items.length > 0 && (
        <div className="mt-6">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, email, brunch…"
            className="input-base max-w-sm"
          />
        </div>
      )}

      {status === 'loading' && (
        <p className="mt-10 text-center text-sm text-charcoal/60">Cargando…</p>
      )}
      {status === 'error' && (
        <div className="mt-6 rounded-xl bg-orange/10 p-4 text-sm text-orange">
          {error}
        </div>
      )}
      {status === 'success' && items.length === 0 && (
        <div className="mt-8 rounded-2xl bg-white p-8 text-center">
          <p className="display text-2xl text-wine">Aún sin inscripciones</p>
          <p className="mt-2 text-sm text-charcoal/60">
            Cuando alguien complete el formulario público, aparecerá acá.
          </p>
        </div>
      )}

      {/* Table */}
      {status === 'success' && filtered.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-3xl bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-charcoal/10 bg-cream">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">
                    Nombre
                  </th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">
                    Contacto
                  </th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">
                    Brunch
                  </th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">
                    Pago
                  </th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">
                    Notas
                  </th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">
                    Fecha
                  </th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5">
                {filtered.map((it) => (
                  <tr key={it.id} className="hover:bg-pink/10">
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium text-charcoal">{it.nombre}</p>
                      {it.instagram && (
                        <p className="text-xs text-charcoal/50">
                          {it.instagram}
                        </p>
                      )}
                      {it.acompanantes && (
                        <p className="text-xs text-charcoal/50">
                          {it.acompanantes}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-charcoal/70">
                      {it.email && <p>{it.email}</p>}
                      {it.telefono && <p>{it.telefono}</p>}
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-charcoal/70">
                      {it.brunch || '—'}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <button
                        onClick={() => togglePago(it)}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          it.pagoConfirmado
                            ? 'bg-wine text-cream'
                            : 'bg-cream text-charcoal/70 hover:bg-pink/30'
                        }`}
                      >
                        {it.pagoConfirmado ? '✓ Pagada' : 'Pendiente'}
                      </button>
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-charcoal/70 max-w-[200px]">
                      {it.notas || '—'}
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-charcoal/50">
                      {fmtDate(it.createdAt)}
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <button
                        onClick={() => {
                          setEditingId(it.id);
                          setShowForm(true);
                        }}
                        className="text-xs text-charcoal/60 hover:text-wine"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar a "${it.nombre}"?`)) remove(it.id);
                        }}
                        className="ml-3 text-xs text-charcoal/40 hover:text-orange"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <InscripcionForm
          editing={items.find((x) => x.id === editingId) || null}
          onClose={() => setShowForm(false)}
          onSubmit={async (data) => {
            if (editingId) await update(editingId, data);
            else await create(data);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

function InscripcionForm({ editing, onClose, onSubmit }) {
  const [data, setData] = useState(() => ({
    nombre: editing?.nombre || '',
    telefono: editing?.telefono || '',
    email: editing?.email || '',
    instagram: editing?.instagram || '',
    acompanantes: editing?.acompanantes || '',
    brunch: editing?.brunch || '',
    comprobante: editing?.comprobante || '',
    notas: editing?.notas || '',
    pagoConfirmado: editing?.pagoConfirmado || false,
    source: editing?.source || 'manual',
  }));
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const set = (k) => (e) =>
    setData((d) => ({
      ...d,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr('');
    try {
      await onSubmit(data);
    } catch (e) {
      setErr(e.message || 'Error guardando.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal onClose={onClose} title={editing ? 'Editar inscripción' : 'Nueva inscripción'}>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Nombre completo *" value={data.nombre} onChange={set('nombre')} required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Teléfono" value={data.telefono} onChange={set('telefono')} />
          <Field label="Email" type="email" value={data.email} onChange={set('email')} />
        </div>
        <Field label="Instagram" value={data.instagram} onChange={set('instagram')} placeholder="@usuario" />
        <Field label="Vienen con" value={data.acompanantes} onChange={set('acompanantes')} placeholder="sola / con amigas / quiero conocer" />
        <Field label="Brunch elegido" value={data.brunch} onChange={set('brunch')} placeholder="ej. Opción 1 · Puravida Pinto" />
        <Field label="Detalle SINPE / comprobante" value={data.comprobante} onChange={set('comprobante')} multiline />
        <Field label="Notas internas" value={data.notas} onChange={set('notas')} multiline />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={data.pagoConfirmado} onChange={set('pagoConfirmado')} className="h-4 w-4 accent-wine" />
          <span>Pago confirmado</span>
        </label>
        {err && <p className="rounded-lg bg-orange/10 p-3 text-sm text-orange">{err}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// -------------------------------
// Section: Gastos
// -------------------------------
const GASTO_CATEGORIAS = [
  'Comida / brunch',
  'Decoración',
  'Fotografía',
  'Espacio',
  'Sorpresitas',
  'Materiales (Bedazzling)',
  'Marketing',
  'Proveedores',
  'Otros',
];

function GastosSection({ data }) {
  const { items, status, error, reload, create, update, remove } = data;
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  const filtered = useMemo(() => {
    if (!filtroCategoria) return items;
    return items.filter((g) => g.categoria === filtroCategoria);
  }, [items, filtroCategoria]);

  const total = filtered.reduce((acc, g) => acc + (Number(g.monto) || 0), 0);
  const totalPagado = filtered
    .filter((g) => g.pagado)
    .reduce((acc, g) => acc + (Number(g.monto) || 0), 0);
  const totalPendiente = total - totalPagado;

  // Aggregate by category
  const porCategoria = useMemo(() => {
    const acc = {};
    items.forEach((g) => {
      const c = g.categoria || 'Otros';
      acc[c] = (acc[c] || 0) + (Number(g.monto) || 0);
    });
    return Object.entries(acc).sort((a, b) => b[1] - a[1]);
  }, [items]);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Gastos</p>
          <h2 className="display text-3xl text-wine">Lo que se paga</h2>
          <p className="mt-2 max-w-2xl text-sm text-charcoal/70">
            Registren cada gasto del evento: comida, fotografía, materiales, etc.
            Marquen "pagado" cuando salgan los SINPE.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={reload} className="btn-secondary text-xs">↻ Refrescar</button>
          <button
            onClick={() => {
              setEditingId(null);
              setShowForm(true);
            }}
            className="btn-primary"
          >
            + Agregar gasto
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard tone="wine" label="Total registrado" value={fmtCRC(total)} hint={`${filtered.length} movimientos`} />
        <StatCard tone="white" label="Ya pagado" value={fmtCRC(totalPagado)} />
        <StatCard tone="white" label="Pendiente" value={fmtCRC(totalPendiente)} />
      </div>

      {porCategoria.length > 0 && (
        <div className="mt-6 rounded-2xl bg-white p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-orange mb-3">
            Por categoría
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltroCategoria('')}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                filtroCategoria === ''
                  ? 'bg-wine text-cream'
                  : 'bg-cream text-charcoal/70 hover:bg-pink/30'
              }`}
            >
              Todas
            </button>
            {porCategoria.map(([cat, sum]) => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  filtroCategoria === cat
                    ? 'bg-wine text-cream'
                    : 'bg-cream text-charcoal/70 hover:bg-pink/30'
                }`}
              >
                {cat} · {fmtCRC(sum)}
              </button>
            ))}
          </div>
        </div>
      )}

      {status === 'loading' && <p className="mt-10 text-center text-sm text-charcoal/60">Cargando…</p>}
      {status === 'error' && (
        <div className="mt-6 rounded-xl bg-orange/10 p-4 text-sm text-orange">{error}</div>
      )}
      {status === 'success' && items.length === 0 && (
        <div className="mt-8 rounded-2xl bg-white p-8 text-center">
          <p className="display text-2xl text-wine">Aún sin gastos registrados</p>
          <p className="mt-2 text-sm text-charcoal/60">
            Apretá "Agregar gasto" para empezar.
          </p>
        </div>
      )}

      {status === 'success' && filtered.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-3xl bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-charcoal/10 bg-cream">
                <tr>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">Descripción</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">Categoría</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">Monto</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">Estado</th>
                  <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-charcoal/60">Fecha</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5">
                {filtered.map((g) => (
                  <tr key={g.id} className="hover:bg-pink/10">
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium text-charcoal">{g.descripcion}</p>
                      {g.proveedor && <p className="text-xs text-charcoal/50">{g.proveedor}</p>}
                      {g.notas && <p className="mt-1 text-xs text-charcoal/50 max-w-md">{g.notas}</p>}
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-charcoal/70">
                      {g.categoria || '—'}
                    </td>
                    <td className="px-4 py-3 align-top font-medium text-wine">
                      {fmtCRC(g.monto)}
                    </td>
                    <td className="px-4 py-3 align-top">
                      <button
                        onClick={() => update(g.id, { pagado: !g.pagado })}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          g.pagado
                            ? 'bg-wine text-cream'
                            : 'bg-cream text-charcoal/70 hover:bg-pink/30'
                        }`}
                      >
                        {g.pagado ? '✓ Pagado' : 'Pendiente'}
                      </button>
                    </td>
                    <td className="px-4 py-3 align-top text-xs text-charcoal/50">
                      {fmtDate(g.fecha || g.createdAt)}
                    </td>
                    <td className="px-4 py-3 align-top text-right">
                      <button
                        onClick={() => {
                          setEditingId(g.id);
                          setShowForm(true);
                        }}
                        className="text-xs text-charcoal/60 hover:text-wine"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar "${g.descripcion}"?`)) remove(g.id);
                        }}
                        className="ml-3 text-xs text-charcoal/40 hover:text-orange"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showForm && (
        <GastoForm
          editing={items.find((x) => x.id === editingId) || null}
          onClose={() => setShowForm(false)}
          onSubmit={async (data) => {
            if (editingId) await update(editingId, data);
            else await create(data);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

function GastoForm({ editing, onClose, onSubmit }) {
  const [data, setData] = useState(() => ({
    descripcion: editing?.descripcion || '',
    monto: editing?.monto || '',
    categoria: editing?.categoria || GASTO_CATEGORIAS[0],
    proveedor: editing?.proveedor || '',
    fecha: editing?.fecha || new Date().toISOString().slice(0, 10),
    pagado: editing?.pagado || false,
    notas: editing?.notas || '',
  }));
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const set = (k) => (e) =>
    setData((d) => ({
      ...d,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr('');
    try {
      await onSubmit({ ...data, monto: Number(data.monto) || 0 });
    } catch (e) {
      setErr(e.message || 'Error guardando.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal onClose={onClose} title={editing ? 'Editar gasto' : 'Nuevo gasto'}>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Descripción *" value={data.descripcion} onChange={set('descripcion')} required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Monto (CRC) *" type="number" value={data.monto} onChange={set('monto')} required />
          <div>
            <label className="label-base">Categoría</label>
            <select value={data.categoria} onChange={set('categoria')} className="input-base">
              {GASTO_CATEGORIAS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
        <Field label="Proveedor (opcional)" value={data.proveedor} onChange={set('proveedor')} />
        <Field label="Fecha" type="date" value={data.fecha} onChange={set('fecha')} />
        <Field label="Notas" value={data.notas} onChange={set('notas')} multiline />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={data.pagado} onChange={set('pagado')} className="h-4 w-4 accent-wine" />
          <span>Ya pagado</span>
        </label>
        {err && <p className="rounded-lg bg-orange/10 p-3 text-sm text-orange">{err}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// -------------------------------
// Section: Proveedores
// -------------------------------
function ProveedoresSection({ data }) {
  const { items, status, error, reload, create, update, remove } = data;
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Proveedores</p>
          <h2 className="display text-3xl text-wine">Contactos del evento</h2>
          <p className="mt-2 max-w-2xl text-sm text-charcoal/70">
            Quién está colaborando: catering, fotógrafa, decoración, espacio.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={reload} className="btn-secondary text-xs">↻ Refrescar</button>
          <button
            onClick={() => {
              setEditingId(null);
              setShowForm(true);
            }}
            className="btn-primary"
          >
            + Agregar proveedor
          </button>
        </div>
      </div>

      {status === 'loading' && <p className="mt-10 text-center text-sm text-charcoal/60">Cargando…</p>}
      {status === 'error' && (
        <div className="mt-6 rounded-xl bg-orange/10 p-4 text-sm text-orange">{error}</div>
      )}
      {status === 'success' && items.length === 0 && (
        <div className="mt-8 rounded-2xl bg-white p-8 text-center">
          <p className="display text-2xl text-wine">Aún sin proveedores</p>
          <p className="mt-2 text-sm text-charcoal/60">
            Empezá agregando a Paloma Studios o tu fotógrafa.
          </p>
        </div>
      )}

      {status === 'success' && items.length > 0 && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((p) => (
            <div key={p.id} className="rounded-2xl bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="display text-lg text-wine">{p.nombre}</p>
                  {p.provee && (
                    <p className="text-xs text-charcoal/60 mt-0.5">{p.provee}</p>
                  )}
                </div>
                <button
                  onClick={() => update(p.id, { contratoConfirmado: !p.contratoConfirmado })}
                  className={`rounded-full px-3 py-1 text-xs font-medium shrink-0 ${
                    p.contratoConfirmado
                      ? 'bg-wine text-cream'
                      : 'bg-cream text-charcoal/70 hover:bg-pink/30'
                  }`}
                >
                  {p.contratoConfirmado ? '✓ Confirmado' : 'Pendiente'}
                </button>
              </div>
              {(p.contacto || p.notas) && (
                <div className="mt-3 space-y-1 border-t border-charcoal/10 pt-3 text-sm text-charcoal/70">
                  {p.contacto && <p>{p.contacto}</p>}
                  {p.notas && <p className="text-xs">{p.notas}</p>}
                </div>
              )}
              <div className="mt-3 flex gap-3 text-xs">
                <button
                  onClick={() => {
                    setEditingId(p.id);
                    setShowForm(true);
                  }}
                  className="text-charcoal/60 hover:text-wine"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar "${p.nombre}"?`)) remove(p.id);
                  }}
                  className="text-charcoal/40 hover:text-orange"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ProveedorForm
          editing={items.find((x) => x.id === editingId) || null}
          onClose={() => setShowForm(false)}
          onSubmit={async (data) => {
            if (editingId) await update(editingId, data);
            else await create(data);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

function ProveedorForm({ editing, onClose, onSubmit }) {
  const [data, setData] = useState(() => ({
    nombre: editing?.nombre || '',
    provee: editing?.provee || '',
    contacto: editing?.contacto || '',
    contratoConfirmado: editing?.contratoConfirmado || false,
    notas: editing?.notas || '',
  }));
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const set = (k) => (e) =>
    setData((d) => ({
      ...d,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr('');
    try {
      await onSubmit(data);
    } catch (e) {
      setErr(e.message || 'Error guardando.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal onClose={onClose} title={editing ? 'Editar proveedor' : 'Nuevo proveedor'}>
      <form onSubmit={submit} className="space-y-4">
        <Field label="Nombre *" value={data.nombre} onChange={set('nombre')} required />
        <Field label="Qué provee" value={data.provee} onChange={set('provee')} placeholder="ej. Catering brunch" />
        <Field label="Contacto" value={data.contacto} onChange={set('contacto')} placeholder="Teléfono / email" />
        <Field label="Notas" value={data.notas} onChange={set('notas')} multiline />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={data.contratoConfirmado} onChange={set('contratoConfirmado')} className="h-4 w-4 accent-wine" />
          <span>Contrato/acuerdo confirmado</span>
        </label>
        {err && <p className="rounded-lg bg-orange/10 p-3 text-sm text-orange">{err}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

// -------------------------------
// Section: Checklist (localStorage por dispositivo)
// -------------------------------
function ChecklistSection() {
  const [items, setItems] = useLocalState(
    STORAGE_KEYS.checklist,
    adminConfig.defaultChecklist.map((text, i) => ({
      id: `seed-${i}`,
      text,
      done: false,
    }))
  );
  const [newItem, setNewItem] = useState('');

  const add = (e) => {
    e.preventDefault();
    const text = newItem.trim();
    if (!text) return;
    setItems((prev) => [...prev, { id: `${Date.now()}`, text, done: false }]);
    setNewItem('');
  };

  const toggle = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );

  const remove = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const reset = () => {
    if (!confirm('¿Reiniciar la checklist a los valores por defecto?')) return;
    setItems(
      adminConfig.defaultChecklist.map((text, i) => ({
        id: `seed-${i}`,
        text,
        done: false,
      }))
    );
  };

  const done = items.filter((i) => i.done).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="eyebrow">Logística</p>
          <h2 className="display text-3xl text-wine">Checklist del evento</h2>
          <p className="mt-2 text-sm text-charcoal/70">
            {done} de {items.length} completadas — se guarda en este dispositivo.
          </p>
        </div>
        <button onClick={reset} className="btn-secondary text-xs">Reiniciar</button>
      </div>

      <form onSubmit={add} className="mt-6 flex gap-3">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="input-base flex-1"
          placeholder="Agregar tarea…"
        />
        <button type="submit" className="btn-primary px-6">+</button>
      </form>

      <ul className="mt-6 space-y-2">
        {items.map((it) => (
          <li key={it.id} className="group flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
            <input
              type="checkbox"
              checked={it.done}
              onChange={() => toggle(it.id)}
              className="h-5 w-5 accent-wine"
            />
            <span className={`flex-1 text-sm ${it.done ? 'text-charcoal/40 line-through' : 'text-charcoal'}`}>
              {it.text}
            </span>
            <button
              onClick={() => remove(it.id)}
              className="text-xs text-charcoal/30 opacity-0 transition-opacity hover:text-orange group-hover:opacity-100"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// -------------------------------
// Section: Referencia
// -------------------------------
function ReferenciaSection() {
  return (
    <div>
      <p className="eyebrow">Referencia rápida</p>
      <h2 className="display text-3xl text-wine">Info del evento</h2>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange">
            Pago de inscripciones
          </p>
          <p className="mt-2 text-lg font-semibold text-wine">{form.payment.method}</p>
          <p className="text-sm text-charcoal">{form.payment.number}</p>
          <p className="text-xs text-charcoal/60">A nombre de {form.payment.name}</p>
          <p className="mt-4 border-t border-charcoal/10 pt-4 text-xs leading-relaxed text-charcoal/70">
            {form.payment.note}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange">
            Agenda del día
          </p>
          <ul className="mt-3 space-y-2">
            {agenda.list.map((a) => (
              <li key={a.time} className="flex gap-3 text-sm">
                <span className="w-24 shrink-0 font-medium text-wine">{a.time}</span>
                <span className="text-charcoal/80">{a.activity}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-charcoal/50">{agenda.note}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-6">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange">
          Opciones de brunch ({form.brunchOptions.length})
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {form.brunchOptions.map((opt) => (
            <div key={opt.value} className="rounded-xl border border-charcoal/10 p-4">
              <p className="text-sm font-semibold text-wine">{opt.title}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-orange">
                {opt.tagline}
              </p>
              <p className="mt-2 text-xs text-charcoal/70">{opt.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------------------------------
// Section: Notas
// -------------------------------
function NotasSection() {
  const [notes, setNotes] = useLocalState(STORAGE_KEYS.notas, '');
  return (
    <div>
      <p className="eyebrow">Notas</p>
      <h2 className="display text-3xl text-wine">Bitácora privada</h2>
      <p className="mt-2 text-sm text-charcoal/70">
        Espacio libre por dispositivo. Para algo compartido entre las 3, usen
        el tab Inscripciones / Gastos / Proveedores que sí se sincronizan.
      </p>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        placeholder="Escribí acá lo que necesites recordar hoy…"
        className="input-base mt-6 min-h-[240px] leading-relaxed"
      />
    </div>
  );
}

// -------------------------------
// Modal + Field shared components
// -------------------------------
function Modal({ title, children, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/40 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-3xl bg-cream p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="display text-2xl text-wine">{title}</h3>
          <button
            onClick={onClose}
            className="text-2xl text-charcoal/40 hover:text-wine"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', required, placeholder, multiline }) {
  return (
    <div>
      <label className="label-base">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={3}
          className="input-base"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="input-base"
        />
      )}
    </div>
  );
}

// -------------------------------
// Layout principal
// -------------------------------
export default function FoundersHub() {
  const [unlocked, setUnlocked] = useState(() => Boolean(getToken()));
  const [active, setActive] = useState('resumen');

  // Estos hooks SIEMPRE corren (las llamadas de red están detrás del auth check
  // gracias a que api.list rechaza si no hay token). Pero solo pedimos data
  // cuando ya estás dentro.
  const inscripcionesData = useResource(apiInscripciones);
  const gastosData = useResource(apiGastos);
  const proveedoresData = useResource(apiProveedores);

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }

  const logout = () => {
    clearToken();
    setUnlocked(false);
  };

  const sections = [
    {
      id: 'resumen',
      label: 'Resumen',
      render: () => (
        <ResumenSection
          inscripcionesData={inscripcionesData}
          gastosData={gastosData}
          proveedoresData={proveedoresData}
        />
      ),
    },
    {
      id: 'inscripciones',
      label: 'Inscripciones',
      render: () => <InscripcionesSection data={inscripcionesData} />,
    },
    {
      id: 'gastos',
      label: 'Gastos',
      render: () => <GastosSection data={gastosData} />,
    },
    {
      id: 'proveedores',
      label: 'Proveedores',
      render: () => <ProveedoresSection data={proveedoresData} />,
    },
    { id: 'checklist', label: 'Checklist', render: () => <ChecklistSection /> },
    { id: 'referencia', label: 'Referencia', render: () => <ReferenciaSection /> },
    { id: 'notas', label: 'Notas', render: () => <NotasSection /> },
  ];

  const activeSection = sections.find((s) => s.id === active) || sections[0];

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-30 border-b border-charcoal/10 bg-cream/95 backdrop-blur">
        <div className="container-site flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img
              src={logos.wineOnCream}
              alt={brand.name}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-orange">
                Hub privado
              </p>
              <p className="display text-sm text-wine">Sculpt Society</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isDev && (
              <span className="rounded-full bg-orange/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-orange">
                Dev mode
              </span>
            )}
            <a href="/" className="text-xs text-charcoal/60 hover:text-wine">
              Sitio público ↗
            </a>
            <button onClick={logout} className="text-xs text-charcoal/60 hover:text-wine">
              Salir
            </button>
          </div>
        </div>
        <nav className="container-site flex gap-1 overflow-x-auto px-6 pb-3">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium tracking-wide transition-colors ${
                active === s.id
                  ? 'bg-wine text-cream'
                  : 'text-charcoal/70 hover:bg-pink/30 hover:text-wine'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="container-site px-6 py-10 md:py-14">
        {activeSection.render()}
      </main>

      <footer className="container-site px-6 pb-12 pt-4 text-center text-xs text-charcoal/40">
        Hub interno — {brand.name} · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
