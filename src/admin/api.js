// Cliente HTTP del hub.
//
// En PRODUCCIÓN: llama a las rutas /api/* serverless de Vercel.
//   Los datos viven en Upstash Redis (configurado vía Vercel KV).
//
// En DESARROLLO LOCAL (npm run dev): las rutas /api/* no existen
//   (Vite no las sirve). En vez de fallar, este cliente usa localStorage
//   como fake backend, así pueden ver y probar el hub localmente.
//   Cuando empujen a Vercel, automáticamente usa el backend real.

const TOKEN_KEY = 'ss_admin_token_v1';
const DEV = typeof import.meta !== 'undefined' && import.meta.env?.DEV;
const DEV_PASSWORD = 'sparkle2026'; // solo en dev. En prod, password vive en env var de Vercel.

// -------------------------------
// Token helpers
// -------------------------------
export function getToken() {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(TOKEN_KEY) || '';
}

export function setToken(token) {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export function clearToken() {
  setToken('');
}

// -------------------------------
// Dev fake backend (localStorage)
// -------------------------------
const DEV_KEY = (name) => `ss_admin_dev_${name}_v1`;

function devRead(name) {
  try {
    const raw = window.localStorage.getItem(DEV_KEY(name));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function devWrite(name, list) {
  window.localStorage.setItem(DEV_KEY(name), JSON.stringify(list));
}
function devNewId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const devApi = {
  async login(password) {
    if (password !== DEV_PASSWORD) {
      throw new Error('Contraseña incorrecta.');
    }
    return password;
  },
  async list(name) {
    return devRead(name);
  },
  async create(name, data) {
    const item = {
      id: devNewId(),
      createdAt: new Date().toISOString(),
      ...data,
    };
    const list = devRead(name);
    list.unshift(item);
    devWrite(name, list);
    return item;
  },
  async update(name, id, patch) {
    const list = devRead(name);
    const idx = list.findIndex((x) => x.id === id);
    if (idx === -1) throw new Error('No encontrado.');
    list[idx] = {
      ...list[idx],
      ...patch,
      id: list[idx].id,
      updatedAt: new Date().toISOString(),
    };
    devWrite(name, list);
    return list[idx];
  },
  async remove(name, id) {
    const list = devRead(name);
    const next = list.filter((x) => x.id !== id);
    if (next.length === list.length) throw new Error('No encontrado.');
    devWrite(name, next);
    return true;
  },
};

// -------------------------------
// Real API (production)
// -------------------------------
async function request(path, { method = 'GET', body } = {}) {
  const token = getToken();
  const res = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    clearToken();
    throw new Error('No autorizado. Volvé a entrar al hub.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Error ${res.status}`);
  }
  return data;
}

const prodApi = {
  async login(password) {
    const data = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).then((r) => r.json().then((d) => ({ status: r.status, data: d })));
    if (data.status !== 200) {
      throw new Error(data.data.error || 'Contraseña incorrecta.');
    }
    return data.data.token;
  },
  async list(name) {
    const data = await request(`/api/${name}`);
    return data.items || [];
  },
  async create(name, body) {
    const data = await request(`/api/${name}`, { method: 'POST', body });
    return data.item;
  },
  async update(name, id, body) {
    const data = await request(`/api/${name}/${id}`, {
      method: 'PATCH',
      body,
    });
    return data.item;
  },
  async remove(name, id) {
    await request(`/api/${name}/${id}`, { method: 'DELETE' });
    return true;
  },
};

const impl = DEV ? devApi : prodApi;

// -------------------------------
// Public API
// -------------------------------
export async function login(password) {
  const token = await impl.login(password);
  setToken(token);
  return token;
}

export const isDev = DEV;

export const inscripciones = {
  list: () => impl.list('inscripciones'),
  create: (data) => impl.create('inscripciones', data),
  update: (id, patch) => impl.update('inscripciones', id, patch),
  remove: (id) => impl.remove('inscripciones', id),
};

export const gastos = {
  list: () => impl.list('gastos'),
  create: (data) => impl.create('gastos', data),
  update: (id, patch) => impl.update('gastos', id, patch),
  remove: (id) => impl.remove('gastos', id),
};

export const proveedores = {
  list: () => impl.list('proveedores'),
  create: (data) => impl.create('proveedores', data),
  update: (id, patch) => impl.update('proveedores', id, patch),
  remove: (id) => impl.remove('proveedores', id),
};
