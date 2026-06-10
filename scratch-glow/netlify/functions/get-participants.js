// GET /.netlify/functions/get-participants  (admin)
//
// Devuelve la lista completa de participantes para el panel admin,
// junto con un resumen agregado.

import { handleOptions, jsonResponse, requireAuth } from './_lib/auth.js';
import { readState } from './_lib/store.js';
import { MAX_PARTICIPANTS, MAX_WINNERS } from './_lib/gameConfig.js';

export default async (req) => {
  const opts = handleOptions(req);
  if (opts) return opts;

  const auth = requireAuth(req);
  if (!auth.ok) return jsonResponse({ error: auth.body }, auth.status);

  try {
    const { state } = await readState();
    const list = state ? Object.values(state.participants || {}) : [];
    // Más reciente primero.
    list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

    return jsonResponse({
      summary: {
        participants: list.length,
        capacity: MAX_PARTICIPANTS,
        winners: list.filter((p) => p.won).length,
        maxWinners: MAX_WINNERS,
        claimed: list.filter((p) => p.won && p.claimed).length,
        prizesAssigned: state?.prizesAssigned || [],
        cursor: state?.cursor || 0,
        createdAt: state?.createdAt || null,
      },
      participants: list,
    });
  } catch (err) {
    console.error('get-participants error', err);
    return jsonResponse({ error: 'internal_error' }, 500);
  }
};

export const config = { path: '/.netlify/functions/get-participants' };
