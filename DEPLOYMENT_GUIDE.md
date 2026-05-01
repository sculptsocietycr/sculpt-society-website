# Guía de despliegue — Sculpt Society

Esta guía te lleva paso a paso desde el código local hasta tener el sitio en vivo en `sculptsocietycr.com`.

**Stack de despliegue recomendado:** GitHub + Vercel.

---

## Parte 1 — Subir el proyecto a GitHub

### Si todavía no tenés el proyecto en GitHub

1. Creá una cuenta en [https://github.com/](https://github.com/) si no tenés una.
2. En la esquina superior derecha hacé clic en **+ → New repository**.
3. Nombre sugerido: `sculpt-society-website`.
4. Marcalo como **Private** (recomendado) o Public.
5. **No** inicialices con README, .gitignore ni licencia (ya los tenemos).
6. Hacé clic en **Create repository**.

### Subir el código

Desde la terminal, parado en la carpeta del proyecto:

```bash
# Inicializar git (si aún no está)
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit — Sculpt Society website"

# Conectar con el repo remoto (reemplazá USUARIO/REPO con tu info)
git remote add origin https://github.com/USUARIO/sculpt-society-website.git

# Subir
git branch -M main
git push -u origin main
```

---

## Parte 2 — Desplegar en Vercel

1. Andá a **[https://vercel.com/](https://vercel.com/)** y creá una cuenta (recomendado: con tu cuenta de GitHub para que se conecten solas).
2. En el dashboard, hacé clic en **+ Add New → Project**.
3. Vercel te muestra tus repos de GitHub. Elegí `sculpt-society-website`.
4. En la pantalla de configuración:
   - **Framework Preset:** Vite (debería detectarse solo).
   - **Build Command:** `npm run build` (default).
   - **Output Directory:** `dist` (default).
   - **Install Command:** `npm install` (default).
5. Hacé clic en **Deploy**.
6. En 1-2 minutos vas a tener el sitio publicado en una URL temporal del tipo:
   ```
   https://sculpt-society-website-abc123.vercel.app
   ```

---

## Parte 3 — Conectar el dominio sculptsocietycr.com

### En Vercel:

1. Entrá al proyecto en Vercel → pestaña **Settings → Domains**.
2. Escribí `sculptsocietycr.com` y hacé clic en **Add**.
3. Repetí con `www.sculptsocietycr.com` (también añadirlo).
4. Vercel te va a mostrar los **DNS records** que necesitás configurar en tu proveedor de dominio.

### Configuración DNS típica:

Andá a tu proveedor de dominio (donde compraste `sculptsocietycr.com` — puede ser Namecheap, GoDaddy, Google Domains, etc.) y configurá:

**Registro A** (para el dominio raíz):
| Tipo | Nombre | Valor |
|------|--------|-------|
| A | @ | `76.76.21.21` |

**Registro CNAME** (para www):
| Tipo | Nombre | Valor |
|------|--------|-------|
| CNAME | www | `cname.vercel-dns.com` |

> **Importante:** los valores exactos se los va a pasar Vercel en la pantalla de Domains. Usá los que te muestre Vercel, no los de esta guía si difieren.

5. Guardá los cambios DNS en tu proveedor. La propagación puede tomar entre 10 minutos y 24 horas.
6. Cuando Vercel detecte la configuración, vas a ver un check verde al lado del dominio.
7. Vercel emite el certificado SSL gratuito automáticamente — el sitio queda en `https://`.

---

## Parte 4 — Flujo de actualización continua

Una vez que el sitio está en vivo, este es el flujo para hacer cambios:

```bash
# 1. Hacé tus cambios en src/data/content.js (u otros archivos)

# 2. Commit
git add .
git commit -m "Actualiza datos del evento de junio"

# 3. Push
git push
```

Vercel detecta el push automáticamente y publica los cambios en 1-2 minutos. Sin reinicios manuales, sin uploads por FTP.

---

## Parte 5 — Variables de entorno (opcional)

Si en algún momento necesitás secretos (API keys, etc.), no los pongas en el código. Usá variables de entorno de Vercel:

1. En Vercel → **Settings → Environment Variables**.
2. Agregá la variable (ej. `VITE_API_KEY`).
3. Redeploy el proyecto para que tome los nuevos valores.

Por ahora, el sitio no requiere variables de entorno (Formspree y Google Analytics se configuran directo en el código).

---

## Parte 6 — Checklist antes de anunciar el sitio

- [ ] Formspree conectado y probado (ver [EDITING_GUIDE.md](./EDITING_GUIDE.md))
- [ ] Google Analytics con ID real reemplazado en `index.html`
- [ ] Dominio `sculptsocietycr.com` apuntando a Vercel
- [ ] SSL activo (https con candado verde)
- [ ] Probado en mobile (iPhone y Android)
- [ ] Probado el formulario de inscripción de punta a punta
- [ ] Probado el botón de WhatsApp flotante
- [ ] Información del próximo evento revisada (fecha, hora, precio correctos)
- [ ] Logo se ve nítido en mobile y desktop
- [ ] Compartir el link en Instagram stories como prueba final

---

## Troubleshooting

**El dominio no resuelve después de 24 horas:**
Verificá los DNS records con [https://www.whatsmydns.net/](https://www.whatsmydns.net/). Si no propagaron, contactá a tu proveedor de dominio.

**Vercel da error en el build:**
Mirá los logs en Vercel → Deployments → click en el deployment fallido. Casi siempre es un error de sintaxis en `content.js`. Corregí localmente, hacé `npm run build` para verificar, y volvé a pushear.

**El formulario no envía:**
Revisá que el `FORM_ID` de Formspree esté reemplazado correctamente en `content.js`.

---

## Soporte

Para temas de hosting/dominio: contactar al equipo de desarrollo o al soporte de Vercel ([https://vercel.com/help](https://vercel.com/help)).
