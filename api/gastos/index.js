import { indexHandler } from '../_lib/crud.js';

function validate(data, { partial } = {}) {
  if (!partial) {
    if (!data.descripcion || typeof data.descripcion !== 'string') {
      throw new Error('Falta la descripción del gasto.');
    }
    if (data.monto === undefined || data.monto === null) {
      throw new Error('Falta el monto.');
    }
  }
  if (data.monto !== undefined && Number.isNaN(Number(data.monto))) {
    throw new Error('El monto debe ser un número.');
  }
}

export default indexHandler('gastos', { validate });
