import { useEffect, useState, useCallback } from 'react';
import {
  adminGetParticipants,
  adminMarkClaimed,
  adminResetGame,
  adminExportCsvUrl,
} from '../utils/api.js';
import { PRIZES_BY_ID } from '../data/prizes.js';

// =====================================================
// AdminPanel — /admin
// =====================================================
//
// Auth con un Bearer token guardado en localStorage. Si no hay token
// (o el server rechaza), muestra una pantalla de login.

const TOKEN_KEY = 'scratch-glow:admin-token';

export default function AdminPanel() {
  const [token, setToken] = useState(() => {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem(TOKEN_KEY) || '';
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const fetchData = useCallback(async (t = token) => {
    if (!t) return;
    setLoading(true);
    setError('');
    try {
      const res = await adminGetParticipants(t);
      setData(res);
      window.localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
    } catch (err) {
      if (err.status === 401) {
        setError('Contraseña incorrecta.');
        setData(null);
      } else {
        setError(err.message || 'Error cargando datos.');
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchData(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return (
      <LoginScreen
        error={error}
        loading={loading}
        onSubmit={(t) => fetchData(t)}
      />
    );
  }

  return (
    <Dashboard
      data={data}
      token={token}
      onRefresh={() => fetchData(token)}
      onLogout={() => {
        window.localStorage.removeItem(TOKEN_KEY);
        setToken('');
        setData(null);
      }}
    />
  );
}

function LoginScreen({ error, loading, onSubmit }) {
  const [value, setValue] = useState('');
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-sm flex-col justify-center px-6">
      <h1 className="display text-3xl text-wine">Panel admin</h1>
      <p className="mt-2 text-sm text-charcoal/70">Scratch & Glow · Hannah vs Miley Edition</p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (value) onSubmit(value);
        }}
      >
        <div>
          <label className="label-base">Contraseña</label>
          <input
            type="password"
            className="input-base"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
        </div>
        {error && <p className="text-sm text-orange">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Verificando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ data, token, onRefresh, onLogout }) {
  const { summary, participants } = data;
  const [busyPhone, setBusyPhone] = useState(null);

  const toggleClaimed = async (p) => {
    setBusyPhone(p.telefono);
    try {
      await adminMarkClaimed(token, { telefono: p.telefono, claimed: !p.claimed });
      await onRefresh();
    } finally {
      setBusyPhone(null);
    }
  };

  const downloadCsv = async () => {
    try {
      const url = await adminExportCsvUrl(token);
      const a = document.createElement('a');
      a.href = url;
      a.download = `scratch-glow-${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('No se pudo descargar el CSV.');
    }
  };

  const resetGame = async () => {
    const confirmed = window.prompt(
      'Esto borra TODOS los participantes y crea un pool nuevo.\n\n' +
      'Escribí "SI" en mayúscula para confirmar.'
    );
    if (confirmed !== 'SI') return;
    try {
      await adminResetGame(token);
      await onRefresh();
      alert('Juego reseteado.');
    } catch (err) {
      alert('No se pudo resetear.');
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 md:px-8">
      <header className="flex items-baseline justify-between border-b border-wine/10 pb-4">
        <div>
          <p className="eyebrow">Scratch & Glow · Admin</p>
          <h1 className="display text-2xl text-wine">Panel</h1>
        </div>
        <button onClick={onLogout} className="text-xs uppercase tracking-wider text-charcoal/60 hover:text-wine">
          Salir
        </button>
      </header>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Participantes" value={`${summary.participants} / ${summary.capacity}`} />
        <Stat label="Ganadoras" value={`${summary.winners} / ${summary.maxWinners}`} />
        <Stat label="Premios reclamados" value={`${summary.claimed} / ${summary.winners}`} />
        <Stat label="Próximo slot" value={`#${summary.cursor + 1}`} />
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button onClick={onRefresh} className="btn-secondary text-xs px-4 py-2">
          ↻ Refrescar
        </button>
        <button onClick={downloadCsv} className="btn-secondary text-xs px-4 py-2">
          ⬇ Descargar CSV
        </button>
        <button
          onClick={resetGame}
          className="btn-secondary text-xs px-4 py-2 border-orange/60 text-orange hover:bg-orange hover:text-white"
        >
          ↺ Reset (cuidado)
        </button>
      </div>

      {/* Prizes available */}
      <PrizesAvailable assigned={summary.prizesAssigned} />

      {/* Participants table */}
      <h2 className="mt-8 mb-2 text-sm font-semibold uppercase tracking-wider text-wine">
        Participantes ({participants.length})
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-wine/10 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-cream text-left text-[10px] font-semibold uppercase tracking-wider text-charcoal/70">
            <tr>
              <th className="px-3 py-3">Nombre</th>
              <th className="px-3 py-3">Teléfono</th>
              <th className="px-3 py-3">IG</th>
              <th className="px-3 py-3">Resultado</th>
              <th className="px-3 py-3">Reclamado</th>
              <th className="px-3 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-wine/5">
            {participants.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-charcoal/60">
                  Aún no hay participantes.
                </td>
              </tr>
            )}
            {participants.map((p) => {
              const prize = p.won ? PRIZES_BY_ID[p.prizeId] : null;
              return (
                <tr key={p.id} className={p.won ? 'bg-gold/10' : ''}>
                  <td className="px-3 py-3 align-top">
                    <div className="font-medium text-charcoal">{p.nombre}</div>
                    <div className="text-[10px] uppercase tracking-wider text-charcoal/50">
                      {p.id}
                    </div>
                  </td>
                  <td className="px-3 py-3 align-top text-charcoal/85">{p.telefono}</td>
                  <td className="px-3 py-3 align-top text-charcoal/85">{p.instagram || '—'}</td>
                  <td className="px-3 py-3 align-top">
                    {p.won ? (
                      <span className="inline-block rounded-full bg-orange/15 px-2 py-0.5 text-xs font-semibold text-orange">
                        ✦ {prize?.sponsor || p.prizeId}
                      </span>
                    ) : (
                      <span className="text-xs text-charcoal/60">—</span>
                    )}
                    {p.won && (
                      <div className="mt-1 text-[10px] text-charcoal/60">{prize?.prize}</div>
                    )}
                  </td>
                  <td className="px-3 py-3 align-top">
                    {p.won ? (
                      <button
                        disabled={busyPhone === p.telefono}
                        onClick={() => toggleClaimed(p)}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                          p.claimed
                            ? 'bg-wine text-cream'
                            : 'bg-cream text-wine hover:bg-pink/50'
                        }`}
                      >
                        {busyPhone === p.telefono
                          ? '…'
                          : p.claimed
                          ? '✓ reclamado'
                          : 'pendiente'}
                      </button>
                    ) : (
                      <span className="text-xs text-charcoal/40">n/a</span>
                    )}
                  </td>
                  <td className="px-3 py-3 align-top text-[11px] text-charcoal/60">
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleString('es-CR', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })
                      : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-pink/20 bg-white p-4 shadow-card">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-charcoal/60">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-semibold text-wine">{value}</p>
    </div>
  );
}

function PrizesAvailable({ assigned = [] }) {
  const all = Object.values(PRIZES_BY_ID);
  return (
    <div className="mt-6">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-wine">
        Premios
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {all.map((p) => {
          const assignedStatus = assigned.includes(p.id);
          return (
            <li
              key={p.id}
              className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                assignedStatus
                  ? 'border-orange/30 bg-orange/5 text-charcoal/60 line-through'
                  : 'border-wine/10 bg-white text-charcoal'
              }`}
            >
              <div>
                <div className="font-semibold">{p.sponsor}</div>
                <div className="text-xs">{p.prize}</div>
              </div>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider ${
                  assignedStatus ? 'text-orange' : 'text-charcoal/60'
                }`}
              >
                {assignedStatus ? 'asignado' : 'disponible'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
