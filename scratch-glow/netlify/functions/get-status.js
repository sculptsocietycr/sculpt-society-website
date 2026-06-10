// GET /.netlify/functions/get-status
//
// Endpoint público (sin auth) que devuelve un resumen del juego:
// cuántos slots quedan, cuántos premios quedan, si está full.
// Lo usa la pantalla intro para decidir si mostrar el CTA o el
// mensaje de "ya cerramos".

import { handleOptions, jsonResponse } from './_lib/auth.js';
import { readState } from './_lib/store.js';
import { MAX_PARTICIPANTS, MAX_WINNERS } from './_lib/gameConfig.js';

export default async (req) => {
  const opts = handleOptions(req);
  if (opts) return opts;

  try {
    const { state } = await readState();

    if (!state) {
      return jsonResponse({
        participants: 0,
        capacity: MAX_PARTICIPANTS,
        remaining: MAX_PARTICIPANTS,
        prizesAssigned: 0,
        prizesRemaining: MAX_WINNERS,
        full: false,
      });
    }

    const count = Object.keys(state.participants || {}).length;
    return jsonResponse({
      participants: count,
      capacity: MAX_PARTICIPANTS,
      remaining: Math.max(0, MAX_PARTICIPANTS - count),
      prizesAssigned: state.prizesAssigned?.length || 0,
      prizesRemaining: Math.max(0, MAX_WINNERS - (state.prizesAssigned?.length || 0)),
      full: count >= MAX_PARTICIPANTS,
    });
  } catch (err) {
    console.error('get-status error', err);
    // Degradación: si Blobs falla, no rompemos la app — asumimos abierto.
    return jsonResponse({
      participants: 0,
      capacity: MAX_PARTICIPANTS,
      remaining: MAX_PARTICIPANTS,
      prizesAssigned: 0,
      prizesRemaining: MAX_WINNERS,
      full: false,
      degraded: true,
    });
  }
};

export const config = { path: '/.netlify/functions/get-status' };
