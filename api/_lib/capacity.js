// Configuración del cupo para la edición actual.
// Se lee desde EVENT_CAPACITY (env de Vercel) si está definido, sino 24.
//
// Esto vive en api/_lib porque el server lo necesita para enforcement.
// El frontend lo recibe vía /api/inscripciones/status — NUNCA confía
// en una constante del cliente para el cap real.

export const DEFAULT_CAPACITY = 26;

export function getCapacity() {
  const raw = process.env.EVENT_CAPACITY;
  const n = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : DEFAULT_CAPACITY;
}
