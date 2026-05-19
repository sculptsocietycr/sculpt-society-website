// Endpoint público que recibe inscripciones del formulario del sitio.
//
// Flujo en producción:
//   - El formulario del sitio público postea EN PARALELO a Formspree (para
//     notificación por email a las fundadoras) Y acá.
//   - Acá se guarda en Redis para que aparezca en el hub /admin.
//
// El endpoint NO requiere auth (es público para que el form pueda postear),
// pero opcionalmente valida un secret si está configurado.

import { handleOptions } from '../_lib/auth.js';
import { createItem } from '../_lib/store.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  // Validación opcional de origen / secret. Si no está configurado se
  // acepta cualquier POST (riesgo: spam manual al endpoint).
  const expectedSecret = process.env.PUBLIC_FORM_SECRET;
  if (expectedSecret) {
    const got =
      req.headers['x-form-secret'] ||
      new URL(req.url || '', 'http://x').searchParams.get('secret');
    if (got !== expectedSecret) {
      return res.status(401).json({ error: 'Secret inválido.' });
    }
  }

  const body = req.body || {};

  const item = {
    source: 'formulario-publico',
    nombre: body.nombre || '',
    telefono: body.telefono || '',
    email: body.email || '',
    instagram: body.instagram || '',
    acompanantes: body.acompanantes || '',
    brunch: body.brunch || '',
    lesiones: body.lesiones || '',
    comprobante: body.comprobante || '',
    mensaje: body.mensaje || '',
    pagoConfirmado: false,
    notas: '',
  };

  // Validación mínima: que tenga un nombre.
  if (!item.nombre.trim()) {
    return res.status(400).json({ error: 'Falta el nombre.' });
  }

  try {
    const created = await createItem('inscripciones', item);
    return res.status(201).json({ ok: true, id: created.id });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || 'Error guardando la inscripción.' });
  }
}
