// Endpoint que Formspree llama automáticamente cada vez que se envía
// el formulario público. Configurar en Formspree:
//   Dashboard → Forms → xbdwldbr → Plugins → Add Webhook
//   URL: https://sculptsocietycr.com/api/inscripciones/webhook?secret=<FORMSPREE_WEBHOOK_SECRET>
//
// Si FORMSPREE_WEBHOOK_SECRET no está configurado, el endpoint acepta
// requests sin verificar (no recomendado en producción).

import { handleOptions, requireWebhookSecret } from '../_lib/auth.js';
import { createItem } from '../_lib/store.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }
  if (!requireWebhookSecret(req, res)) return;

  // Formspree manda el cuerpo del form como JSON (si el form lo envió como JSON)
  // o como form-encoded. Vercel parsea ambos automáticamente.
  const body = req.body || {};

  // Normalizamos los campos del formulario público a nuestro modelo.
  const item = {
    source: 'formspree',
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

  try {
    const created = await createItem('inscripciones', item);
    return res.status(201).json({ ok: true, id: created.id });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || 'Error guardando la inscripción.' });
  }
}
