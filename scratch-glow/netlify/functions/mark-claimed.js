// POST /.netlify/functions/mark-claimed   (admin)
//
// Body: { telefono, claimed: boolean }
//
// Cambia el estado del flag `claimed` de una participante ganadora.
// Útil para llevar control desde el panel cuando se entrega el premio.

import { handleOptions, jsonResponse, requireAuth } from './_lib/auth.js';
import { transact } from './_lib/store.js';

export default async (req) => {
  const opts = handleOptions(req);
  if (opts) return opts;

  const auth = requireAuth(req);
  if (!auth.ok) return jsonResponse({ error: auth.body }, auth.status);

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  const telefono = String(body.telefono || '').replace(/[^\d]/g, '');
  const claimed = Boolean(body.claimed);
  if (!telefono) return jsonResponse({ error: 'invalid_input' }, 400);

  try {
    const result = await transact(async (state) => {
      if (!state || !state.participants?.[telefono]) {
        return {
          newState: null,
          response: { status: 404, body: { error: 'not_found' } },
        };
      }
      const next = {
        ...state,
        participants: {
          ...state.participants,
          [telefono]: { ...state.participants[telefono], claimed },
        },
      };
      return {
        newState: next,
        response: { status: 200, body: { ok: true, participant: next.participants[telefono] } },
      };
    });
    return jsonResponse(result.body, result.status);
  } catch (err) {
    console.error('mark-claimed error', err);
    return jsonResponse({ error: 'internal_error' }, 500);
  }
};

export const config = { path: '/.netlify/functions/mark-claimed' };
