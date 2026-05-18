// Datos iniciales del evento Hannah Montana Edition (13 jun 2026).
// Importados desde:
//   - "Sculpt Society Gastos #1.xlsx" → seedGastos
//   - "Ingresos Sculpt Society.xlsx"  → seedInscripciones
//
// Se cargan UNA SOLA VEZ desde el botón "Importar datos iniciales"
// del hub (visible en el tab Resumen cuando todo está vacío).

export const seedGastos = [
  {
    descripcion: 'Dominio sculptsocietycr.com',
    monto: 7500,
    categoria: 'Marketing',
    cantidad: 1,
    pagado: true,
    notas: 'Dominio del sitio web',
  },
  {
    descripcion: 'Venue (Paloma Studios) — crédito',
    monto: 50000,
    categoria: 'Espacio',
    cantidad: 1,
    pagado: false,
    notas: 'Pago a Paloma Studios. Crédito 50000.',
  },
  {
    descripcion: 'Tote Bags',
    monto: 22289,
    categoria: 'Sorpresitas',
    cantidad: 25,
    pagado: true,
    notas: '25 unidades × ₡812.43 + IVA',
  },
  {
    descripcion: 'Espejitos',
    monto: 18822,
    categoria: 'Sorpresitas',
    cantidad: 60,
    pagado: true,
    notas: '60 unidades × ₡285.86 + IVA',
  },
  {
    descripcion: 'Bedazzle shit #1',
    monto: 14859,
    categoria: 'Materiales (Bedazzling)',
    cantidad: 1,
    pagado: true,
    notas: 'Cristales / brillos compra 1',
  },
  {
    descripcion: 'Bedazzle shit #2',
    monto: 11655,
    categoria: 'Materiales (Bedazzling)',
    cantidad: 1,
    pagado: true,
    notas: 'Cristales / brillos compra 2',
  },
  {
    descripcion: 'Trays / Pickers',
    monto: 4953,
    categoria: 'Materiales (Bedazzling)',
    cantidad: 90,
    pagado: true,
    notas: '90 unidades × ₡50.15 + IVA',
  },
  {
    descripcion: 'Goma',
    monto: 4210,
    categoria: 'Materiales (Bedazzling)',
    cantidad: 15,
    pagado: true,
    notas: '15 unidades × ₡255.77 + IVA',
  },
  {
    descripcion: 'Maleta',
    monto: 15797,
    categoria: 'Materiales (Bedazzling)',
    cantidad: 1,
    pagado: true,
    notas: 'Para transportar materiales',
  },
  {
    descripcion: 'Pauta (Instagram)',
    monto: 30000,
    categoria: 'Marketing',
    cantidad: 1,
    pagado: false,
    notas: 'Pauta publicitaria',
  },
  {
    descripcion: 'Bordado (Tote bags)',
    monto: 20000,
    categoria: 'Sorpresitas',
    cantidad: 25,
    pagado: false,
    notas: '25 unidades × ₡800',
  },
];

export const seedInscripciones = [
  {
    nombre: 'Noelia',
    telefono: '506 7017 2244',
    brunch: 'Opción 1 · Puravida Pinto',
    comprobante: '966430523',
    pagoConfirmado: true,
    notas: 'AMIGA · CONFIRMADA',
    source: 'manual',
  },
  {
    nombre: 'Gloriana Drossos',
    pagoConfirmado: false,
    notas: 'AMIGA · SEGUIMIENTO',
    source: 'manual',
  },
  {
    nombre: 'Camille Hasson',
    brunch: 'Opción 2 · Omelette',
    comprobante: '406427057',
    pagoConfirmado: true,
    notas: 'AMIGA · CONFIRMADA',
    source: 'manual',
  },
  {
    nombre: 'Leah Filloy',
    brunch: 'Opción 1 · Puravida Pinto',
    comprobante: '5376036',
    pagoConfirmado: true,
    notas: 'AMIGA · CONFIRMADA',
    source: 'manual',
  },
  {
    nombre: 'Maria Valentina',
    brunch: 'Opción 2 · Omelette',
    comprobante: '406419902',
    pagoConfirmado: true,
    notas: 'AMIGA · CONFIRMADA',
    source: 'manual',
  },
  {
    nombre: 'Aryagna',
    brunch: 'Opción 1 · Puravida Pinto',
    comprobante: '406419902',
    pagoConfirmado: true,
    notas: 'AMIGA · CONFIRMADA',
    source: 'manual',
  },
  {
    nombre: 'Stephie',
    brunch: 'Opción 1 · Puravida Pinto',
    comprobante: '966566109',
    pagoConfirmado: true,
    notas: 'AMIGA · CONFIRMADA',
    source: 'manual',
  },
  {
    nombre: 'Auxi Morera',
    pagoConfirmado: false,
    notas: 'AMIGA · PENDIENTE DE PAGO',
    source: 'manual',
  },
  {
    nombre: 'Nico Ramírez',
    pagoConfirmado: false,
    notas: 'AMIGA · PENDIENTE DE PAGO',
    source: 'manual',
  },
  {
    nombre: 'Dayana',
    pagoConfirmado: false,
    notas: 'AMIGA · SEGUIMIENTO',
    source: 'manual',
  },
  {
    nombre: 'Hilda Aguilar',
    pagoConfirmado: false,
    notas: 'AMIGA · SEGUIMIENTO',
    source: 'manual',
  },
  {
    nombre: 'Florencia',
    pagoConfirmado: false,
    notas: 'AMIGA · SEGUIMIENTO',
    source: 'manual',
  },
  {
    nombre: 'Jimena Robles',
    pagoConfirmado: false,
    notas: 'REFERIDO · SEGUIMIENTO',
    source: 'manual',
  },
  {
    nombre: 'Virginia Chinchilla',
    pagoConfirmado: false,
    notas: 'RRSS · SEGUIMIENTO',
    source: 'manual',
  },
  {
    nombre: 'Natiuska',
    pagoConfirmado: false,
    notas: 'AMIGA · SEGUIMIENTO',
    source: 'manual',
  },
  {
    nombre: 'Isa Odio',
    pagoConfirmado: false,
    notas: 'AMIGA · SEGUIMIENTO',
    source: 'manual',
  },
];

export const seedProveedores = [
  {
    nombre: 'Paloma Studios',
    provee: 'Espacio y catering del brunch',
    contacto: 'Escazú · Costa Rica',
    contratoConfirmado: true,
    notas: 'Venue del evento. Crédito de ₡50.000 pendiente.',
  },
];
