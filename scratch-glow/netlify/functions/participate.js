// POST /.netlify/functions/participate
//
// Body: { nombre, telefono, instagram? }
//
// Respuestas:
//   200 { kind: 'already', participant }       ← ya participaste
//   201 { kind: 'new', participant }           ← nuevo, recién creado
//   400 { error: 'invalid_input' }
//   409 { kind: 'full' }                       ← se llenó el juego
//   500 { error }
//
// `participant` incluye las 6 casillas (con memeIds o prizeId) y la
// posición ganadora si aplica. El frontend resuelve los assets desde
// data/memes.js y data/prizes.js usando esos IDs.

import { handleOptions, jsonResponse } from './_lib/auth.js';
import { transact } from './_lib/store.js';
import {
  buildInitialState,
  applyParticipation,
  newParticipantId,
} from './_lib/gameState.js';
import { MAX_PARTICIPANTS } from './_lib/gameConfig.js';

export default async (req) => {
  const opts = handleOptions(req);
  if (opts) return opts;

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  const nombre = (body.nombre || '').trim();
  const telefono = normalizePhone(body.telefono || '');
  const instagram = (body.instagram || '').trim();

  if (!nombre || nombre.length < 2) {
    return jsonResponse({ error: 'invalid_input', field: 'nombre' }, 400);
  }
  if (telefono.length < 8) {
    return jsonResponse({ error: 'invalid_input', field: 'telefono' }, 400);
  }

  const userAgent = req.headers.get?.('user-agent') || '';

  try {
    const result = await transact(async (state) => {
      // Estado vacío → inicializamos.
      if (!state) state = buildInitialState();

      // Ya participaste con este teléfono.
      if (state.participants[telefono]) {
        return {
          // No mutamos. transact() responderá sin escribir.
          newState: null,
          response: {
            status: 200,
            body: { kind: 'already', participant: state.participants[telefono] },
          },
        };
      }

      // Capacidad llena.
      if (Object.keys(state.participants).length >= MAX_PARTICIPANTS) {
        return {
          newState: null,
          response: { status: 409, body: { kind: 'full' } },
        };
      }

      const id = newParticipantId();
      const { state: nextState, participant } = applyParticipation(state, {
        id,
        nombre,
        telefono,
        instagram,
        userAgent,
      });

      return {
        newState: nextState,
        response: { status: 201, body: { kind: 'new', participant } },
      };
    });

    return jsonResponse(result.body, result.status);
  } catch (err) {
    if (err.code === 'GAME_FULL') {
      return jsonResponse({ kind: 'full' }, 409);
    }
    console.error('participate error', err);
    return jsonResponse({ error: 'internal_error' }, 500);
  }
};

function normalizePhone(input) {
  return String(input).replace(/[^\d]/g, '');
}

export const config = { path: '/.netlify/functions/participate' };
