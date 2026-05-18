# Hub privado — guía de setup para producción

Este documento explica los pasos **una vez** para activar el hub privado de fundadoras en producción (Vercel). Después de esto, todo funciona automáticamente: las inscripciones del formulario público entran solas al hub, ustedes editan desde el hub, y los datos viven en una base de datos privada de Sculpt Society.

> **Mientras no hagan estos pasos**: el hub funciona en modo dev (datos en el navegador). En producción el login va a fallar con "ADMIN_PASSWORD no configurado". Estos pasos lo arreglan.

---

## Paso 1 · Activar Upstash Redis en Vercel (~3 min)

Vercel cerró su producto "KV" propio y migró todo a [Upstash Redis](https://upstash.com), que sigue siendo gratis y se enchufa al proyecto desde el panel de Vercel.

1. Entrá al [Vercel Dashboard](https://vercel.com/dashboard).
2. Abrí el proyecto **sculptsocietycr** (o como se llame el de Sculpt Society).
3. Pestaña **Storage** (arriba).
4. Si nunca crearon una base: clic en **"Browse Marketplace"** → buscá **"Upstash"** → **"Serverless Redis"** → **Add Integration**.
5. Aceptá los términos de Upstash (cuenta gratis).
6. Elegí región: **`us-east-1`** o **`sa-east-1`** (la que esté más cerca de Costa Rica).
7. Plan: **Free**.
8. Conectalo al proyecto Sculpt Society.

✅ Esto agrega automáticamente 2 variables de entorno al proyecto Vercel:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

> Si ven nombres tipo `UPSTASH_REDIS_REST_URL` en su lugar, igual funciona — el código del hub acepta ambos nombres.

---

## Paso 2 · Configurar las variables de entorno del hub (~2 min)

En el mismo panel del proyecto en Vercel:

1. Andá a **Settings** → **Environment Variables**.
2. Agregá **2 variables nuevas**:

| Nombre | Valor | Notas |
|---|---|---|
| `ADMIN_PASSWORD` | La contraseña real del hub (ej. `algoQueSoloLasTresSepan2026`) | Cambien esto. **No usen `sparkle2026` en producción.** |
| `FORMSPREE_WEBHOOK_SECRET` | Una cadena larga aleatoria (ej. 30+ caracteres random) | Sirve para que solo Formspree pueda escribir al webhook. Generen una en [random.org](https://www.random.org/strings) o tirando un `openssl rand -hex 16` en la terminal. |

Aplicarlas a los environments: **Production**, **Preview**, **Development** (los 3).

3. Después de guardarlas, **redeploy** el proyecto (en Vercel: Deployments → último deploy → menú "..." → Redeploy). Esto asegura que las env vars queden activas.

---

## Paso 3 · Conectar el webhook de Formspree (~3 min)

Para que cada inscripción del formulario público aparezca automáticamente en el hub:

1. Entrá a [formspree.io](https://formspree.io) y abrí el form **`xbdwldbr`** (Sculpt Society Inscripciones).
2. Pestaña **Plugins** (a la izquierda).
3. Clic en **"Add Plugin"** → **"Webhook"**.
4. Configurar:
   - **URL**: `https://sculptsocietycr.com/api/inscripciones/webhook?secret=PEGAR_EL_VALOR_DE_FORMSPREE_WEBHOOK_SECRET_AQUI`
     - Reemplazá `PEGAR_EL_VALOR_DE_FORMSPREE_WEBHOOK_SECRET_AQUI` por el mismo valor que pusieron en la variable `FORMSPREE_WEBHOOK_SECRET` en Vercel.
   - **Method**: `POST`
   - **Content-Type**: `application/json` (o JSON, según el dropdown)
5. Guardar.
6. Hacer una inscripción de prueba en `sculptsocietycr.com/#inscripcion` para verificar que aparece sola en el hub `/admin`.

> Si Formspree pide upgrade pagado para webhooks, hay una alternativa: usar Zapier (free) — ver sección "Alternativa: Zapier" al final.

---

## Paso 4 · Verificar todo

1. Andá a `sculptsocietycr.com/admin`.
2. Ingresá la nueva contraseña que pusieron en `ADMIN_PASSWORD`.
3. Deberían ver el dashboard con 0 inscritas, 0 gastos, etc.
4. Apretá **"Agregar gasto"** en el tab Gastos para probar que el backend escribe.
5. Hagan una inscripción de prueba en el formulario público y verifiquen que aparece sola en el tab Inscripciones del hub.

---

## Alternativa: Zapier (si Formspree no permite webhooks en free)

Si en el paso 3 Formspree pide plan pagado:

1. Entrá a [zapier.com](https://zapier.com) (cuenta gratis).
2. Crear un Zap:
   - **Trigger**: Formspree → New Submission → form `xbdwldbr`.
   - **Action**: Webhooks by Zapier → POST.
     - URL: `https://sculptsocietycr.com/api/inscripciones/webhook?secret=<FORMSPREE_WEBHOOK_SECRET>`
     - Payload Type: `json`
     - Data: mapear cada campo del formulario (`nombre`, `telefono`, `email`, `instagram`, `acompanantes`, `brunch`, `lesiones`, `comprobante`, `mensaje`) al body del request.
3. Activar el Zap.

---

## Modelo de datos (referencia)

Los datos viven en Upstash Redis bajo las claves:

- `sculpt:inscripciones` — array de inscripciones
- `sculpt:gastos` — array de gastos
- `sculpt:proveedores` — array de proveedores

Cada item tiene `id`, `createdAt`, `updatedAt` + campos propios. El backend está en `/api/` (Vercel serverless functions) y todo el código de las funciones vive en este repo bajo esa carpeta.

---

## Troubleshooting

**El login falla con "ADMIN_PASSWORD no configurado"**
- No agregaron la variable `ADMIN_PASSWORD` en Vercel, o no hicieron redeploy después.

**El login funciona pero Inscripciones/Gastos/Proveedores muestran error rojo**
- Falta activar Upstash Redis (Paso 1) o las variables `KV_REST_API_URL`/`KV_REST_API_TOKEN` no se agregaron.

**Una inscripción del formulario público no aparece en el hub**
- El webhook de Formspree no está configurado o el `secret` del URL no coincide con `FORMSPREE_WEBHOOK_SECRET` en Vercel.
- Verificar en Formspree dashboard → Plugins → el webhook debe mostrar status "successful" en sus últimas ejecuciones.

**Quiero cambiar la contraseña**
- En Vercel → Settings → Environment Variables → editar `ADMIN_PASSWORD` → Redeploy.

**Quiero ver los datos crudos en Upstash**
- Vercel → Storage → la base Redis → "Open in Upstash Console" → "Data Browser".

---

## Costos

Todo este stack es **gratis** para el volumen de Sculpt Society:
- **Vercel Hobby**: gratis hasta 100GB de banda/mes.
- **Upstash Redis Free**: 10,000 comandos/día, 256MB. El hub usa <100 comandos por día normal.
- **Formspree Free**: 50 envíos/mes.

Para una edición del evento (50 inscripciones aprox), los 3 servicios free son suficientes con margen.
