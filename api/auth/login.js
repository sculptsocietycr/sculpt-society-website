import { handleOptions } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return res.status(500).json({
      error:
        'ADMIN_PASSWORD no configurado en variables de entorno de Vercel.',
    });
  }
  const body = req.body || {};
  const password = typeof body === 'string' ? '' : body.password || '';
  if (password !== expected) {
    return res.status(401).json({ error: 'Contraseña incorrecta.' });
  }
  // El token es el mismo password — la idea es que solo lo conozcan las 3 fundadoras.
  return res.status(200).json({ token: password, ok: true });
}
