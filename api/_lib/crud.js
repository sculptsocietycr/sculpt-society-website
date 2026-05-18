// Handler genérico CRUD reutilizado por inscripciones, gastos, proveedores.
// Tipos de rutas:
//   /api/{collection}          → GET (list) + POST (create)
//   /api/{collection}/[id].js  → GET (one) + PATCH (update) + DELETE
//
// validate(data) opcional: lanza Error con mensaje legible si los datos
// no son válidos. Si pasa, los datos se guardan tal cual.

import { requireAuth, handleOptions } from './auth.js';
import {
  getList,
  createItem,
  updateItem,
  deleteItem,
} from './store.js';

export function indexHandler(collection, { validate } = {}) {
  return async function handler(req, res) {
    if (handleOptions(req, res)) return;
    if (!requireAuth(req, res)) return;

    try {
      if (req.method === 'GET') {
        const items = await getList(collection);
        return res.status(200).json({ items });
      }
      if (req.method === 'POST') {
        const data = req.body || {};
        if (validate) validate(data);
        const item = await createItem(collection, data);
        return res.status(201).json({ item });
      }
      return res.status(405).json({ error: 'Método no permitido.' });
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.message || 'Error inesperado.' });
    }
  };
}

export function itemHandler(collection, { validate } = {}) {
  return async function handler(req, res) {
    if (handleOptions(req, res)) return;
    if (!requireAuth(req, res)) return;

    const { id } = req.query || {};
    if (!id) {
      return res.status(400).json({ error: 'Falta id.' });
    }

    try {
      if (req.method === 'PATCH') {
        const patch = req.body || {};
        if (validate) validate(patch, { partial: true });
        const item = await updateItem(collection, id, patch);
        if (!item) return res.status(404).json({ error: 'No encontrado.' });
        return res.status(200).json({ item });
      }
      if (req.method === 'DELETE') {
        const ok = await deleteItem(collection, id);
        if (!ok) return res.status(404).json({ error: 'No encontrado.' });
        return res.status(200).json({ ok: true });
      }
      return res.status(405).json({ error: 'Método no permitido.' });
    } catch (err) {
      return res
        .status(400)
        .json({ error: err.message || 'Error inesperado.' });
    }
  };
}
