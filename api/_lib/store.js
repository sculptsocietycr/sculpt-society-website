import { Redis } from '@upstash/redis';

let _redis = null;

export function getRedis() {
  if (_redis) return _redis;
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error(
      'Redis no está configurado. Esperaba KV_REST_API_URL / KV_REST_API_TOKEN en las variables de entorno de Vercel.'
    );
  }
  _redis = new Redis({ url, token });
  return _redis;
}

const KEY_PREFIX = 'sculpt:';

export async function getList(collection) {
  const redis = getRedis();
  const data = await redis.get(KEY_PREFIX + collection);
  if (!data) return [];
  // Upstash auto-parses JSON. Defensive in case it returns a string.
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return Array.isArray(data) ? data : [];
}

export async function setList(collection, list) {
  const redis = getRedis();
  await redis.set(KEY_PREFIX + collection, JSON.stringify(list));
}

export function newId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
  );
}

export async function createItem(collection, data) {
  const list = await getList(collection);
  const item = {
    id: newId(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  list.unshift(item);
  await setList(collection, list);
  return item;
}

export async function updateItem(collection, id, patch) {
  const list = await getList(collection);
  const idx = list.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  list[idx] = {
    ...list[idx],
    ...patch,
    id: list[idx].id,
    updatedAt: new Date().toISOString(),
  };
  await setList(collection, list);
  return list[idx];
}

export async function deleteItem(collection, id) {
  const list = await getList(collection);
  const next = list.filter((x) => x.id !== id);
  if (next.length === list.length) return false;
  await setList(collection, next);
  return true;
}
