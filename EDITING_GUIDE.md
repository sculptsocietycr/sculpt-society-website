# Guía de edición — Sculpt Society

Esta guía explica cómo modificar el contenido del sitio sin tocar código complicado. **Casi todo lo que se ve en la página vive en un solo archivo:** [`src/data/content.js`](./src/data/content.js).

---

## 1. Editar textos del sitio

Abrí el archivo `src/data/content.js`. Vas a ver bloques organizados por sección, marcados con comentarios. Cada vez que veas `// EDITA AQUÍ`, ese es un punto de edición común.

### Ejemplo: cambiar el título del Hero

```js
export const hero = {
  eyebrow: 'Comunidad wellness · Costa Rica',
  title: 'Una comunidad creada para moverte, conectar y brillar.', // ← cambiá este texto
  subtitle: '...',
  ...
};
```

Guardás el archivo y, si tenés `npm run dev` corriendo, los cambios se reflejan al instante.

---

## 2. Cambiar la información del próximo evento

En `content.js` buscá el bloque `nextEvent`:

```js
export const nextEvent = {
  title: 'Sculpt Society — Hannah Montana Edition',
  date: '13 de junio',
  time: '10:00 a.m.',
  location: 'Paloma Studios, Escazú, Costa Rica',
  price: '₡20.000',
  spots: 'Cupos limitados',
  ...
};
```

Para una nueva edición, simplemente actualizá los valores. Si querés cambiar la lista de "Qué incluye", editá el array `includes`.

---

## 3. Editar la agenda

Buscá `agenda.list`:

```js
export const agenda = {
  list: [
    { time: '10:00 a.m.', activity: 'Bienvenida y check-in' },
    { time: '10:15 a.m.', activity: 'Clase de Yoga Sculpt' },
    ...
  ],
};
```

Podés agregar, eliminar o reordenar items libremente.

---

## 4. Agregar fotos de las fundadoras

1. Guardá la foto en `src/assets/images/` (por ejemplo `diana.jpg`).
2. Abrí `content.js` y arriba del archivo importá la imagen:
   ```js
   import dianaPhoto from '../assets/images/diana.jpg';
   ```
3. En el bloque `founders.list`, reemplazá `image: null` por `image: dianaPhoto`:
   ```js
   list: [
     { name: 'Diana Troper', initial: 'D', image: dianaPhoto },
     ...
   ],
   ```

Si no hay foto, se muestra un placeholder elegante con la inicial del nombre.

---

## 5. Agregar fotos a la galería

Mismo proceso que con las fundadoras:

1. Guardá las fotos en `src/assets/images/` (ej. `gallery-01.jpg`, `gallery-02.jpg`...).
2. Importalas arriba de `content.js`:
   ```js
   import gallery01 from '../assets/images/gallery-01.jpg';
   ```
3. En `gallery.items`, reemplazá `image: null` por `image: gallery01`.

Mientras `image: null`, se muestra un cuadro con el texto "Próximamente".

---

## 6. Conectar Formspree (recibir inscripciones por email)

El formulario está listo para Formspree, pero necesita un ID real para funcionar. Sin esto, los formularios **no llegan a tu correo**.

### Paso a paso:

1. Andá a **[https://formspree.io/](https://formspree.io/)** y creá una cuenta usando `sculptsocietycr@gmail.com`.
2. Verificá tu email haciendo clic en el link de confirmación que te llegue.
3. En el dashboard, hacé clic en **"+ New Form"**.
4. Ponele de nombre algo como `Sculpt Society — Inscripciones`.
5. Asegurate de que el email destinatario sea `sculptsocietycr@gmail.com`.
6. Formspree te va a dar un endpoint que se ve así:
   ```
   https://formspree.io/f/abcd1234
   ```
   Ese código `abcd1234` es tu **FORM_ID**.
7. Abrí `src/data/content.js` y buscá la línea:
   ```js
   endpoint: 'https://formspree.io/f/FORM_ID_AQUI',
   ```
8. Reemplazá `FORM_ID_AQUI` por el código real:
   ```js
   endpoint: 'https://formspree.io/f/abcd1234',
   ```
9. Guardá, hacé `git push` y Vercel publica los cambios automáticamente.
10. Probá el formulario en el sitio publicado y verificá que el correo llegue a `sculptsocietycr@gmail.com`.

### Plan gratuito de Formspree

El plan gratuito permite **50 envíos por mes**, suficiente para empezar. Si necesitás más, podés actualizar a un plan pago dentro de Formspree.

---

## 7. Conectar Google Analytics

1. Andá a **[https://analytics.google.com/](https://analytics.google.com/)**.
2. Creá una propiedad nueva para `sculptsocietycr.com`.
3. En el setup, vas a obtener un **Measurement ID** que se ve así: `G-ABC1234XYZ`.
4. Abrí el archivo [`index.html`](./index.html) en la raíz del proyecto.
5. Buscá las dos veces que aparece `G-XXXXXXXXXX` y reemplazalas por tu ID real.
6. Hacé `git push` y listo.

Vas a empezar a ver datos en Google Analytics dentro de 24-48 horas.

---

## 8. Cambiar colores (no recomendado)

La paleta oficial está definida en `tailwind.config.js`. **No cambiar sin alineación de marca**. Si necesitás un nuevo color de acento puntual, agregalo ahí en lugar de modificar los oficiales.

---

## 9. Subir cambios a producción

Si el sitio está en Vercel y conectado a GitHub, el flujo es:

```bash
git add .
git commit -m "Actualiza información del próximo evento"
git push
```

Vercel detecta el push y publica los cambios en 1-2 minutos automáticamente.

---

## 10. Cosas que NO se deben editar sin avisar

- Los archivos en `src/components/` (lógica de la página).
- Los colores oficiales en `tailwind.config.js`.
- El logo en `src/assets/logos/`.
- La estructura de `content.js` (los nombres de las claves como `hero`, `nextEvent`, etc.).

---

## ¿Dudas?

Cualquier cambio mayor (rediseño, nuevas secciones, estructura), pedirlo al equipo de desarrollo. Esta guía cubre el 95% de las ediciones del día a día.
