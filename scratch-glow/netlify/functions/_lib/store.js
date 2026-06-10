// =====================================================
// Store: Netlify Blobs + compare-and-swap retry loop
// =====================================================
//
// Usamos UN solo blob para todo el estado del juego: pool, cursor,
// participantes y premios asignados. Esto simplifica la transacción —
// cada participación es un read-modify-write con `onlyIfMatch` (ETag).
//
// Si dos requests intentan escribir al mismo tiempo, una gana y la otra
// hace retry leyendo la versión nueva. Para 25 participantes en un evento
// de unas horas, las colisiones son raras y los retries baratos.

import { getStore } from '@netlify/blobs';
import { GAME_STATE_KEY } from './gameConfig.js';

const STORE_NAME = 'scratch-glow';

function store() {
  // Netlify Blobs se autoconfigura cuando corre dentro de Netlify
  // (funciones, build, dev). No requiere creds explícitas.
  return getStore({ name: STORE_NAME, consistency: 'strong' });
}

export async function readState() {
  const s = store();
  const { data, etag } = await s.getWithMetadata(GAME_STATE_KEY, {
    type: 'json',
  });
  return { state: data, etag };
}

export async function writeState(state, etag) {
  const s = store();
  await s.setJSON(GAME_STATE_KEY, state, {
    onlyIfMatch: etag,
  });
}

export async function initState(state) {
  const s = store();
  // onlyIfNew: si ya existe, no escribe — devuelve { modified: false }
  await s.setJSON(GAME_STATE_KEY, state, { onlyIfNew: true });
}

export async function forceWriteState(state) {
  // Usado solo por reset-game (admin) — escritura sin CAS.
  const s = store();
  await s.setJSON(GAME_STATE_KEY, state);
}

/**
 * Ejecuta un read-modify-write con retry exponencial.
 * `mutator(state)` debe retornar { newState, response } o lanzar.
 * Si lanza un error con .conflict === true, se reintenta.
 */
export async function transact(mutator, { maxAttempts = 8 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    let stateWithMeta;
    try {
      stateWithMeta = await readState();
    } catch (err) {
      lastErr = err;
      await sleep(50 * 2 ** attempt);
      continue;
    }

    const { state, etag } = stateWithMeta;
    if (!state) {
      // Estado no inicializado. El mutator decide cómo iniciar
      // (típicamente initializeGameState).
    }

    let result;
    try {
      result = await mutator(state);
    } catch (err) {
      // Errores de lógica de negocio: no reintentar.
      throw err;
    }

    if (!result || !result.newState) {
      // El mutator decidió no escribir (ej: respuesta de solo-lectura).
      return result?.response;
    }

    try {
      if (state === null && !etag) {
        // Caso primera escritura: crear con onlyIfNew para evitar
        // sobrescribir si otra request inicializó en paralelo.
        await initState(result.newState);
      } else {
        await writeState(result.newState, etag);
      }
      return result.response;
    } catch (err) {
      // Conflict de CAS / blob existe → retry con estado fresco.
      lastErr = err;
      await sleep(50 * 2 ** attempt);
    }
  }
  const err = new Error('No se pudo persistir el cambio tras varios intentos.');
  err.cause = lastErr;
  throw err;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
