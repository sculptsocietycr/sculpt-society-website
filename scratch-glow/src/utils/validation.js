// =====================================================
// Validación + normalización de inputs del formulario
// =====================================================
//
// Teléfono se normaliza a sólo dígitos (acepta + y espacios al pegar).
// Es la KEY para evitar doble participación, así que dos formatos
// distintos del mismo número deben dar la misma key normalizada.

export function normalizePhone(input = '') {
  return String(input).replace(/[^\d]/g, '');
}

export function isPhoneValid(input = '') {
  const digits = normalizePhone(input);
  // CR: 8 dígitos. Con prefijo país (506): 11. Aceptamos rango razonable.
  return digits.length >= 8 && digits.length <= 15;
}

export function normalizeInstagram(input = '') {
  if (!input) return '';
  return '@' + String(input).trim().replace(/^@+/, '').replace(/\s+/g, '');
}

export function isNameValid(input = '') {
  return String(input).trim().length >= 2;
}

export function validateParticipantForm({ nombre, telefono }) {
  const errors = {};
  if (!isNameValid(nombre)) errors.nombre = 'Tu nombre completo, por favor.';
  if (!isPhoneValid(telefono)) errors.telefono = 'Teléfono no válido — al menos 8 dígitos.';
  return { ok: Object.keys(errors).length === 0, errors };
}
