# Memes

Dropeá las imágenes de Hannah / Miley en esta carpeta. La app las consume
como `/memes/<archivo>`.

## Archivos esperados (mínimo 6, recomendado 8-12)

Por defecto la app espera estos nombres (ver `src/data/memes.js`):

```
meme-01.jpg
meme-02.jpg
meme-03.jpg
meme-04.jpg
meme-05.jpg
meme-06.jpg
meme-07.jpg
meme-08.jpg
```

## Reglas

- **Mínimo 6 memes** (para llenar las 6 casillas de una no-ganadora).
- Recomendado: 8–12 memes para que cada participante vea una selección distinta.
- Formato: JPG o PNG, recomendado **800×800 px** o similar (cuadrado).
- Si necesitás nombres distintos o más memes, editá la lista `MEMES` en
  `src/data/memes.js` Y la lista `MEME_IDS` en
  `netlify/functions/_lib/gameConfig.js`. Las dos tienen que coincidir.

## Reglas de contenido

- No editar caras, cuerpos, ropa ni expresiones de los memes.
- Solo se pueden recortar o encuadrar dentro de la tarjeta si es necesario,
  sin alterar el contenido.

## Si un meme falta

La casilla muestra un placeholder tipográfico ("no premio · meme-XX") en lugar
de romperse. Igual deberías subir todos antes del evento.
