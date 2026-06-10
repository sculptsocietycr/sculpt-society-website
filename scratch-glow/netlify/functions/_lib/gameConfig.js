// Constantes del juego — fuente única de verdad.

export const MAX_PARTICIPANTS = parseInt(process.env.MAX_PARTICIPANTS || '25', 10);
export const MAX_WINNERS = 5;            // 5 ganadoras totales
export const CELLS_PER_GAME = 6;         // 6 casillas rascables
export const GAME_STATE_KEY = 'game-state';

// IDs de premios — DEBEN matchear src/data/prizes.js.
// Si agregás o sacás premios, actualizar ambas listas.
// MAX_WINNERS también debe igualar el largo de esta lista.
export const PRIZE_IDS = [
  'bloom-blusa',
  'ondalina-medias-1',
  'ondalina-medias-2',
  'dental-clinique-limpieza',
  'flk-peeling',
];

// IDs de memes — espejo de src/data/memes.js.
// El backend escoge IDs, el frontend resuelve la src vía MEMES_BY_ID.
// Hay que tener >= CELLS_PER_GAME memes para el modo no-ganador.
export const MEME_IDS = [
  'meme-01',
  'meme-02',
  'meme-03',
  'meme-04',
  'meme-05',
  'meme-06',
];
