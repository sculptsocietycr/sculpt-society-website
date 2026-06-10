# Logos

Dropeá los logos oficiales en esta carpeta con estos nombres exactos.
La app los consume como `/logos/<archivo>`.

## Archivos esperados

| Archivo | Sponsor | Usado en |
|---|---|---|
| `sculpt-society.png` | Sculpt Society CR | Intro screen + Admin |
| `bloom.png` | Bloom | Casilla premio + modal ganadora |
| `ondalina.png` | Ondalina (los dos premios usan el mismo logo) | Casilla premio + modal ganadora |
| `dental-clinique.png` | Dental Clinique | Casilla premio + modal ganadora |
| `flk.png` | FLK / Flikier Centro de Medicina Estética | Casilla premio + modal ganadora |

## Reglas

- Formato preferido: **PNG con fondo transparente** (mejor para casillas y modal).
  También funciona JPG/WEBP/SVG — basta con que el archivo se llame igual.
- No recrear logos. Usá la versión oficial que te pasa cada marca.
- Si querés cambiar el path o el nombre, actualizá `src/data/prizes.js` (campo `logo`).

## Si un logo falta

La app no se rompe — la imagen falla silenciosamente (se oculta) y la casilla
sigue mostrando el sponsor + el premio. Pero el resultado se ve mejor con el logo.
