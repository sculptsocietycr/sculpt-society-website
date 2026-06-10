// POST /.netlify/functions/reset-game   (admin)
//
// Borra TODO el estado del juego y crea un pool fresco.
// Pensado para usar entre eventos o si necesitás tirar todo y empezar
// de cero. Usá con cuidado — no es reversible.
//
// Para evitar accidentes, requiere body { confirm: 'SI' }.

import { handleOptions, jsonResponse, requireAuth } from './_lib/auth.js';
import { forceWriteState } from './_lib/store.js';
import { buildInitialState } from './_lib/gameState.js';

export default async (req) => {
  const opts = handleOptions(req);
  if (opts) return opts;

  const auth = requireAuth(req);
  if (!auth.ok) return jsonResponse({ error: auth.body }, auth.status);

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  let body = {};
  try { body = await req.json(); } catch { /* ok */ }
  if (body.confirm !== 'SI') {
    return jsonResponse(
      { error: 'confirm_required', hint: 'Mandá { "confirm": "SI" }.' },
      400
    );
  }

  try {
    const fresh = buildInitialState();
    await forceWriteState(fresh);
    return jsonResponse({ ok: true, resetAt: new Date().toISOString() });
  } catch (err) {
    console.error('reset-game error', err);
    return jsonResponse({ error: 'internal_error' }, 500);
  }
};

export const config = { path: '/.netlify/functions/reset-game' };
