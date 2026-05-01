# Sculpt Society — Website oficial

Comunidad wellness para mujeres en Costa Rica. Esta es la landing page de marca y plataforma de inscripción a eventos.

🌐 Dominio: [sculptsocietycr.com](https://sculptsocietycr.com)
📷 Instagram: [@sculptsocietycr](https://instagram.com/sculptsocietycr)
✉️ Email: sculptsocietycr@gmail.com

---

## Stack

- **React 18** + **Vite** (build rápido y moderno)
- **Tailwind CSS** (utilidades de diseño)
- **Framer Motion** (animaciones suaves)
- **Formspree** (formulario sin backend)
- **Vercel** (hosting recomendado)

## Correr el proyecto localmente

Necesitás Node.js 18+ instalado.

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build

# 4. Previsualizar el build de producción
npm run preview
```

El servidor de desarrollo corre en `http://localhost:5173` por defecto.

## Estructura del proyecto

```
/
├── index.html               ← HTML base + Google Analytics + Google Fonts
├── package.json             ← Dependencias y scripts
├── tailwind.config.js       ← Colores y tipografía oficiales
├── vite.config.js
├── postcss.config.js
└── src/
    ├── main.jsx             ← Punto de entrada React
    ├── App.jsx              ← Composición de secciones
    ├── index.css            ← Estilos globales y componentes Tailwind
    ├── assets/
    │   ├── logos/           ← Logos oficiales (NO redibujar)
    │   └── images/          ← Fotos del sitio (placeholders por ahora)
    ├── components/          ← Un componente por sección
    └── data/
        └── content.js       ← ⭐ TODO el contenido editable vive acá
```

## Documentación adicional

- **[EDITING_GUIDE.md](./EDITING_GUIDE.md)** — Cómo editar textos, fotos, eventos y conectar Formspree.
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** — Cómo subir el sitio a Vercel y conectar el dominio.

## Filosofía de diseño

El sitio está construido para sentirse:

- Minimalista
- Premium y editorial
- Femenino y alegre (sin caer en infantil)
- Mobile-first
- Con copy en español natural de Costa Rica

**No usar:** estética de gimnasio intenso, lenguaje de pérdida de peso, neón, look corporativo.

## Próximos pasos antes de lanzar

- [ ] Crear cuenta de Formspree y reemplazar `FORM_ID_AQUI` en [src/data/content.js](./src/data/content.js)
- [ ] Reemplazar `G-XXXXXXXXXX` en [index.html](./index.html) con el ID de Google Analytics
- [ ] Agregar fotos reales de las fundadoras en `src/data/content.js` (campo `image`)
- [ ] Reemplazar fotos de galería cuando estén disponibles
- [ ] Hacer deploy en Vercel y conectar el dominio `sculptsocietycr.com`

---

Hecho con cariño desde Costa Rica.
