// =====================================================
// MEMES de Hannah / Miley
// =====================================================
//
// Lista de imágenes que se muestran en las casillas que NO son premio.
// El backend elige 5 (cuando hay premio) o 6 (cuando no) sin repetir
// dentro de la misma participación.
//
// Para agregar más memes:
//   1. Dropear el archivo en src/assets/memes/ con un nombre legible
//      (ej: hannah-laugh.jpg, miley-tongue.jpg).
//   2. Agregarlo a esta lista.
//
// Recomendación: 10–15 memes para que cada participante vea una mezcla
// distinta. Con menos de 6 NO funciona el modo no-ganador.

export const MEMES = [
  { id: 'meme-01', src: '/memes/meme-01.jpg', alt: 'Hannah / Miley meme 1' },
  { id: 'meme-02', src: '/memes/meme-02.jpg', alt: 'Hannah / Miley meme 2' },
  { id: 'meme-03', src: '/memes/meme-03.jpg', alt: 'Hannah / Miley meme 3' },
  { id: 'meme-04', src: '/memes/meme-04.jpg', alt: 'Hannah / Miley meme 4' },
  { id: 'meme-05', src: '/memes/meme-05.jpg', alt: 'Hannah / Miley meme 5' },
  { id: 'meme-06', src: '/memes/meme-06.jpg', alt: 'Hannah / Miley meme 6' },
];

export const MEMES_BY_ID = Object.fromEntries(MEMES.map((m) => [m.id, m]));
