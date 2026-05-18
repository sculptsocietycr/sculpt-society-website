import { indexHandler } from '../_lib/crud.js';

function validate(data) {
  if (!data.nombre || typeof data.nombre !== 'string') {
    throw new Error('Falta el nombre.');
  }
}

export default indexHandler('inscripciones', { validate });
