# Scratch & Glow

Experiencia digital tipo *rasca y gana* para **Sculpt Society CR · Hannah vs Miley Edition** (13 de junio · Paloma Studios).

Mobile-first, scrapbook editorial Y2K, 6 casillas rascables por participante,
5 premios entre 25 participantes, control total desde el backend.

---

## TL;DR

```bash
# 1. Instalar
cd scratch-glow
npm install

# 2. Configurar
cp .env.example .env
# Editá .env y poné un ADMIN_PASSWORD largo.

# 3. Correr local (con backend de Netlify Functions)
npm run dev
# → http://localhost:8888

# 4. Subir a Netlify
# Crear un nuevo site en netlify.com apuntando a este repo,
# Base directory: scratch-glow
# Ver sección "Deploy" abajo para los detalles.
```

---

## Stack

- **React + Vite** — frontend SPA
- **Tailwind CSS** — estilos brand-aligned
- **Framer Motion** — transiciones suaves
- **Canvas** — efecto scratch real (pointer + touch)
- **canvas-confetti** — celebración brand
- **Netlify Functions** — serverless API
- **[Netlify Blobs](https://docs.netlify.com/blobs/overview/)** — storage atómico (CAS)

---

## Cómo funciona el juego

### Reglas del juego

- Máximo **25 participantes**.
- De esos 25, **5 son ganadoras** (1 por premio).
- Las **5 ganadoras se distribuyen aleatoriamente** entre las 25 posiciones del pool.
- Cada participante ve **6 casillas rascables**.
  - Si NO ganó: las 6 casillas tienen memes diferentes de Hannah/Miley.
  - Si SÍ ganó: 5 casillas con memes + 1 casilla con el logo del sponsor y su premio (posición aleatoria entre las 6).
- Cada premio se entrega **una sola vez**. Cuando ya fue asignado no puede volver a salir.
- Identificación por **teléfono** (normalizado a solo dígitos). Doble respaldo con localStorage.
- Si volvés a entrar con el mismo teléfono ves **exactamente el mismo resultado**.

### El pool

Al recibir la primera participación, el backend crea un **pool de 25 slots** barajado al azar:
5 slots `winning` + 20 slots `losing`. Cada nueva participante toma el siguiente slot disponible. Si su slot es `winning`, recibe el siguiente premio en la lista de premios disponibles.

Todo se persiste en un único blob de Netlify (`game-state`) y se actualiza con **compare-and-swap** (ETag), así que dos participaciones simultáneas no rompen el conteo.

### Premios

Configurados en `src/data/prizes.js`:

| Sponsor | Premio |
|---|---|
| Bloom | 1 blusa deportiva |
| Ondalina | 2 medias (premio 1) |
| Ondalina | 2 medias (premio 2) |
| Dental Clinique | 1 limpieza + blanqueamiento |
| FLK / Flikier Centro de Medicina Estética | 1 peeling químico |

**Si modificás esta lista** también tenés que actualizar `PRIZE_IDS` en
`netlify/functions/_lib/gameConfig.js`. Las dos listas tienen que tener los mismos IDs.

---

## Correr local

### Opción A · Frontend + backend (recomendado)

Requiere `netlify-cli`:

```bash
npm install
npm run dev
# Servidor: http://localhost:8888
# - Frontend de Vite + Hot Reload
# - Netlify Functions corren en /.netlify/functions/*
# - Netlify Blobs corre en memoria (no persiste entre reinicios de `netlify dev`)
```

Si nunca usaste Netlify CLI antes:

```bash
npm install -g netlify-cli   # opcional, ya está en devDependencies
netlify login
netlify link                  # vinculá el folder con un site (después de crearlo en netlify.com)
```

### Opción B · Solo frontend (más rápido, sin backend)

```bash
npm run dev:frontend
# → http://localhost:5174
# Sin /api funcionando — solo sirve para revisar estilos y animaciones.
```

---

## Variables de entorno

| Variable | Default | Descripción |
|---|---|---|
| `ADMIN_PASSWORD` | — (**obligatorio**) | Contraseña del panel admin. Bearer token para los endpoints `/get-participants`, `/mark-claimed`, `/reset-game`, `/export-csv`. Usá una contraseña larga. |
| `MAX_PARTICIPANTS` | `25` | Override del cap de participantes. Cambialo solo si extendés el evento. |

En **producción** se configuran en Netlify → Site settings → Build & deploy → Environment variables.

En **local** copiá `.env.example` a `.env`.

> **Netlify Blobs no requiere creds.** Se autoconfigura cuando corrés `netlify dev` o desplegás en Netlify.

---

## Deploy en Netlify

Como `scratch-glow` vive como subcarpeta del repo principal de Sculpt Society, hay que decirle a Netlify dónde está la base del proyecto.

### Setup inicial

1. Subí los cambios al repo de GitHub (ya está conectado a `sculptsocietycr/sculpt-society-website`).
2. En [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import existing project**.
3. Elegí el repo `sculptsocietycr/sculpt-society-website`.
4. **Site settings** → **Build & deploy** → **Build settings**:
   - **Base directory:** `scratch-glow`
   - **Build command:** `npm run build`
   - **Publish directory:** `scratch-glow/dist`
   - **Functions directory:** `scratch-glow/netlify/functions`

   *(Estos cuatro valores también están en `netlify.toml` — Netlify los toma de ahí si el Base directory está bien.)*
5. En **Environment variables** agregá:
   - `ADMIN_PASSWORD` = (lo que vos elijas)
6. **Deploy site** → Netlify clona el repo, builda y publica.

### Dominio personalizado

En Netlify → Domain management podés apuntar `scratch.sculptsocietycr.com` (o el subdominio que prefieras) al site. Si querés usar un subdominio del dominio principal, agregá un registro CNAME desde tu DNS provider apuntando a la URL de Netlify.

### Habilitar Netlify Blobs

Netlify Blobs viene activado por default en cualquier site. No hace falta configurar nada.

---

## Subir los assets reales

### Logos

Dropealos en `public/logos/` con estos nombres exactos:

```
sculpt-society.png   (ya está — copiado del proyecto principal)
bloom.png
ondalina.png
dental-clinique.png
flk.png
```

Formato: **PNG con fondo transparente** ideal. JPG/SVG también funcionan.

Si querés cambiar nombre o path, editá el campo `logo` en `src/data/prizes.js`.

### Memes

Dropealos en `public/memes/`:

```
meme-01.jpg
meme-02.jpg
…
meme-08.jpg
```

Mínimo 6, recomendado 8–12. Formato JPG/PNG, cuadrados (~800×800 px) se ven mejor.

Para agregar más memes, editá las DOS listas:

- `src/data/memes.js` → array `MEMES` (con `id` + `src` + `alt`)
- `netlify/functions/_lib/gameConfig.js` → array `MEME_IDS`

Las dos tienen que tener los mismos IDs.

---

## Panel admin

Accedé en `https://<tu-sitio>.netlify.app/admin` con la contraseña que pusiste en `ADMIN_PASSWORD`.

El panel muestra:

- **Stats**: participantes / cap, ganadoras / max, premios reclamados.
- **Premios**: cuáles ya fueron asignados y cuáles quedan.
- **Tabla**: cada participante con nombre, teléfono, IG, resultado, claim status, fecha.
- **Acciones**:
  - `↻ Refrescar` → recarga datos.
  - `⬇ Descargar CSV` → exporta todo a CSV.
  - `↺ Reset (cuidado)` → borra TODO y crea un pool nuevo. Te pide confirmación.
  - Para cada ganadora, podés marcar el premio como `✓ reclamado` con un click.

---

## Resetear el juego

### Desde el panel admin

`/admin` → botón **`↺ Reset (cuidado)`** → escribí `SI` cuando te pregunte.

### Desde la línea de comando

```bash
curl -X POST https://<tu-sitio>.netlify.app/.netlify/functions/reset-game \
  -H "Authorization: Bearer $ADMIN_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"confirm":"SI"}'
```

**Esto borra todos los participantes y todos los premios asignados.** Usalo solo entre eventos.

---

## Exportar lista de participantes

### Desde el panel admin

Botón **`⬇ Descargar CSV`**.

### Desde la línea de comando

```bash
curl -H "Authorization: Bearer $ADMIN_PASSWORD" \
  https://<tu-sitio>.netlify.app/.netlify/functions/export-csv \
  > participantes.csv
```

Columnas: `id, nombre, telefono, instagram, createdAt, won, prizeId, winningCellIndex, claimed, userAgent`.

---

## Doble participación

El backend de-duplica por **teléfono normalizado a dígitos** (espacios, `+`, `-` ignorados). Si una persona intenta participar de nuevo:

- Con el mismo teléfono → el server responde `200 { kind: 'already', participant }` con su resultado original.
- Con un teléfono distinto → es una nueva participación, ocupa otro slot del pool.

Además guardamos en `localStorage` el participant para que al recargar la página, la persona vuelva directo a su resultado.

**Limitación:** la persona puede:
1. Limpiar el caché del navegador.
2. Usar otro celular.
3. Inventar un teléfono distinto.

Para 25 personas en un evento controlado esto NO debería ser un problema, pero si lo es, podés tomar la lista de inscripciones del evento y validar contra esa lista en el handler `participate.js` (agregando una whitelist).

---

## Control de premios — checklist técnico

Verificá que estos invariantes se mantienen:

- [x] **Frontend NO decide quién gana.** El cliente solo envía `{ nombre, telefono, instagram? }` y recibe un resultado precalculado.
- [x] **Server enforced**: el handler `participate.js` valida cap, doble participación y asignación de premios.
- [x] **CAS retry**: dos participaciones simultáneas no causan oversell. Si dos requests leen el mismo estado y escriben, una falla con ETag mismatch y se reintenta con estado fresco.
- [x] **Cada premio solo se asigna una vez**: `state.prizesAssigned` se inspecciona antes de cada `applyParticipation`.
- [x] **Ondalina tiene dos premios separados**: IDs distintos (`ondalina-medias-1`, `ondalina-medias-2`).
- [x] **Cuando se llena el cap**: respuesta `409 { kind: 'full' }` y la UI muestra "Ya cerramos el scratch, bestie".

---

## Probar antes del evento

1. **Asegurate de tener todos los assets**: los 5 logos en `public/logos/` y 8+ memes en `public/memes/`.
2. **Cambiá `ADMIN_PASSWORD` a algo único y largo** en Netlify.
3. **Hacé una prueba en producción**:
   - Andá al sitio, completá el formulario con datos de prueba.
   - Rascá tarjetas, verificá que el flow funciona.
   - Verificá en el `/admin` que la participación aparece.
4. **Reseteá el juego** desde `/admin` para limpiar las pruebas.
5. **Backup de seguridad**: descargá el CSV inicial vacío como confirmación.
6. **Día del evento**: monitoreá el panel desde el celular. Si llegás a 25 participantes, la UI muestra automáticamente "ya cerramos el scratch".

---

## Estructura del proyecto

```
scratch-glow/
├── index.html               · Entry HTML + fuentes Google
├── netlify.toml             · Config de build + dev + redirects
├── package.json
├── tailwind.config.js       · Paleta brand Sculpt Society
├── vite.config.js
├── postcss.config.js
├── .env.example
├── public/
│   ├── favicon.png
│   ├── logos/               · Logos sponsors (dropealos acá)
│   │   ├── README.md
│   │   └── sculpt-society.png
│   └── memes/               · Memes Hannah/Miley (dropealos acá)
│       └── README.md
├── netlify/
│   └── functions/
│       ├── _lib/
│       │   ├── auth.js
│       │   ├── gameConfig.js   · Constantes (PRIZE_IDS, MEME_IDS)
│       │   ├── gameState.js    · Lógica pura del juego
│       │   └── store.js        · Netlify Blobs + CAS retry
│       ├── participate.js      · POST público
│       ├── get-status.js       · GET público
│       ├── get-participants.js · GET admin
│       ├── mark-claimed.js     · POST admin
│       ├── reset-game.js       · POST admin
│       └── export-csv.js       · GET admin
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles/
    │   └── globals.css
    ├── data/
    │   ├── copy.js          · Todos los textos visibles
    │   ├── prizes.js        · Config de premios
    │   └── memes.js         · Config de memes
    ├── utils/
    │   ├── api.js           · Cliente HTTP
    │   ├── storage.js       · localStorage helpers
    │   └── validation.js    · Validación + normalización
    └── components/
        ├── IntroScreen.jsx
        ├── ParticipantForm.jsx
        ├── ScratchGrid.jsx
        ├── ScratchCard.jsx       · Canvas effect
        ├── ResultModal.jsx
        ├── AdminPanel.jsx
        └── ScrapbookDecor.jsx
```

---

## Limitaciones conocidas

- **localStorage no persiste entre dispositivos**. La protección real es el backend (por teléfono).
- **Netlify Blobs en dev local** corre en memoria — se borra cuando reiniciás `netlify dev`. En producción persiste.
- **Si el navegador bloquea localStorage** (modo incognito agresivo, Safari con ITP) la app sigue funcionando, solo pierde la "memoria" entre recargas.
- **No hay rate limiting explícito**. Si te preocupa spam al endpoint público, agregá un challenge / hCaptcha en el form.
- **El reset no notifica a las participantes**. Si alguien tenía localStorage con un resultado viejo y reseteás el juego, va a ver su resultado viejo hasta que limpie el caché o entre de nuevo (la app no chequea contra el server después del primer fetch).

---

## Tono / copy

Todos los textos visibles viven en `src/data/copy.js`. Editá ahí si querés cambiar:

- Títulos / subtítulos / labels
- Mensajes de ganadora / no ganadora
- Mensaje cuando ya hay 25 participantes
- CTAs de botones

Los mensajes específicos de cada premio viven en `src/data/prizes.js`.

---

## Hecho con cariño desde Costa Rica ✦

Para Sculpt Society CR · Hannah vs Miley Edition · 13 de junio.
