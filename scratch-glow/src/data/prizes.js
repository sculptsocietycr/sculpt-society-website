// =====================================================
// PREMIOS — Hannah vs Miley Edition
// =====================================================
//
// Este archivo se importa tanto en el frontend (para mostrar logos,
// nombres y mensajes) como en las Netlify Functions (para asignar
// premios desde el server). Mantener la misma lista en ambos lados.
//
// Cada premio se entrega UNA SOLA VEZ. Ondalina tiene dos premios
// separados con id distinto.
//
// Las imágenes viven en /assets/logos/<slug>.png (o jpg/webp/svg)
// — dropealas en src/assets/logos/ con esos nombres.

export const PRIZES = [
  {
    id: 'bloom-blusa',
    sponsor: 'Bloom',
    logo: '/logos/bloom.jpg',
    prize: 'Ganaste una blusa deportiva',
    message: 'Bloom te tiene lista para sudar con outfit cute',
  },
  {
    id: 'ondalina-medias-1',
    sponsor: 'Ondalina',
    logo: '/logos/ondalina.jpg',
    prize: 'Ganaste 2 medias',
    message: 'Ondalina said: pilates girlie mode ON',
  },
  {
    id: 'ondalina-medias-2',
    sponsor: 'Ondalina',
    logo: '/logos/ondalina.jpg',
    prize: 'Ganaste 2 medias',
    message: 'Ondalina said: pilates girlie mode ON',
  },
  {
    id: 'dental-clinique-limpieza',
    sponsor: 'Dental Clinique',
    logo: '/logos/dental-clinique.jpg',
    prize: 'Ganaste limpieza + blanqueamiento',
    message: 'sonrisa lista para brillar',
  },
  {
    id: 'flk-peeling',
    sponsor: 'FLK · Flikier Centro de Medicina Estética',
    logo: '/logos/flk.jpg',
    prize: 'Ganaste un peeling químico',
    message: 'glow incoming',
  },
];

// Total de premios = 5. Si se modifica esta lista, también actualizar
// MAX_WINNERS en netlify/functions/_lib/gameConfig.js.

export const PRIZES_BY_ID = Object.fromEntries(PRIZES.map((p) => [p.id, p]));
