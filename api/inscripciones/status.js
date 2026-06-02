// Endpoint público de status del cupo.
// GET /api/inscripciones/status → { count, capacity, soldOut, remaining }
//
// No requiere auth porque lo consume el formulario público del sitio.
// Lee la lista de Redis y cuenta entradas. Si Redis no está configurado,
// degrada graciosamente devolviendo capacity=24, count=0 (mejor abrir
// que cerrar inscripciones por un error de infra).

import { handleOptions } from '../_lib/auth.js';
import { getList } from '../_lib/store.js';
import { getCapacity } from '../_lib/capacity.js';

export default async function handler(req, res) {
  if (handleOptions(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido.' });
  }

  const capacity = getCapacity();

  // Cache corto (15s) para no martillar Redis si la landing tiene
  // múltiples renders. El form también revalida al hacer submit.
  res.setHeader('Cache-Control', 's-maxage=15, stale-while-revalidate=60');

  let count = 0;
  let degraded = false;

  try {
    const list = await getList('inscripciones');
    count = Array.isArray(list) ? list.length : 0;
  } catch (err) {
    // Si Redis falla por alguna razón, no rompemos el sitio —
    // mostramos cupos disponibles (mejor abrir que cerrar por error).
    degraded = true;
    count = 0;
  }

  const remaining = Math.max(0, capacity - count);
  const soldOut = count >= capacity;

  return res.status(200).json({
    count,
    capacity,
    remaining,
    soldOut,
    degraded,
  });
}
