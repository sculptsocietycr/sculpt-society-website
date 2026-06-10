// GET /.netlify/functions/export-csv   (admin)
//
// Descarga la lista de participantes como CSV.
// Columnas: id, nombre, telefono, instagram, createdAt, won, prizeId,
//           winningCellIndex, claimed, userAgent

import { handleOptions, requireAuth, corsHeaders } from './_lib/auth.js';
import { readState } from './_lib/store.js';

const COLUMNS = [
  'id',
  'nombre',
  'telefono',
  'instagram',
  'createdAt',
  'won',
  'prizeId',
  'winningCellIndex',
  'claimed',
  'userAgent',
];

export default async (req) => {
  const opts = handleOptions(req);
  if (opts) return opts;

  const auth = requireAuth(req);
  if (!auth.ok) {
    return new Response(auth.body, { status: auth.status, headers: corsHeaders() });
  }

  try {
    const { state } = await readState();
    const list = state ? Object.values(state.participants || {}) : [];
    list.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));

    const rows = [COLUMNS.join(',')];
    for (const p of list) {
      rows.push(COLUMNS.map((c) => csvCell(p[c])).join(','));
    }
    const csv = rows.join('\n') + '\n';
    const filename = `scratch-glow-${new Date().toISOString().slice(0, 10)}.csv`;

    return new Response(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        ...corsHeaders(),
      },
    });
  } catch (err) {
    console.error('export-csv error', err);
    return new Response('internal_error', { status: 500, headers: corsHeaders() });
  }
};

function csvCell(value) {
  if (value === null || value === undefined) return '';
  const s = String(value);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export const config = { path: '/.netlify/functions/export-csv' };
