import { indexHandler } from '../_lib/crud.js';

function validate(data, { partial } = {}) {
  if (!partial && (!data.nombre || typeof data.nombre !== 'string')) {
    throw new Error('Falta el nombre del proveedor.');
  }
}

export default indexHandler('proveedores', { validate });
