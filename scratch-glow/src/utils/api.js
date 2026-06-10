// =====================================================
// Cliente HTTP del juego
// =====================================================
//
// Los endpoints viven en /.netlify/functions/* en producción y en dev.
// Si Netlify está corriendo (netlify dev → puerto 8888), los serves
// automáticamente. Si corrés `vite` solo, las funciones NO existen
// y los fetches fallan (eso es esperado).

const BASE = '/.netlify/functions';

async function jsonFetch(path, opts = {}) {
  const res = await fetch(BASE + path, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data?.error || `HTTP ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

// ------- Público (sin auth) -------

export async function getStatus() {
  return jsonFetch('/get-status');
}

export async function participate({ nombre, telefono, instagram }) {
  return jsonFetch('/participate', {
    method: 'POST',
    body: JSON.stringify({ nombre, telefono, instagram }),
  });
}

// ------- Admin (Bearer auth) -------

function adminHeaders(password) {
  return password ? { Authorization: `Bearer ${password}` } : {};
}

export async function adminGetParticipants(password) {
  return jsonFetch('/get-participants', { headers: adminHeaders(password) });
}

export async function adminMarkClaimed(password, { telefono, claimed }) {
  return jsonFetch('/mark-claimed', {
    method: 'POST',
    headers: adminHeaders(password),
    body: JSON.stringify({ telefono, claimed }),
  });
}

export async function adminResetGame(password) {
  return jsonFetch('/reset-game', {
    method: 'POST',
    headers: adminHeaders(password),
  });
}

export function adminExportCsvUrl(password) {
  // El export es un GET con auth en header. Devolvemos un blob URL.
  return fetch(BASE + '/export-csv', { headers: adminHeaders(password) })
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    });
}
