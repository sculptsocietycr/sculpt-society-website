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

## Paso 2 · Configurar la contraseña del hub (~1 min)

En el mismo panel del proyecto en Vercel:

1. Andá a **Settings** → **Environment Variables**.
2. Agregá UNA variable:

| Key | Value |
|---|---|
| `ADMIN_PASSWORD` | La contraseña real del hub (ej. `algoQueSoloLasTresSepan2026`). **Cambien `sparkle2026` por algo único.** |

3. Aplicarla a: **Production**, **Preview**, **Development**.
4. Guardar → **Redeploy** desde Deployments → último deploy → "..." → Redeploy.

---

## Paso 3 · Conectar Formspree → hub (¡automático! ya está hecho en el código)

**No necesitan hacer nada acá.** El formulario público (`/#inscripcion`) ya postea en paralelo a Formspree (para el email a `sculptsocietycr@gmail.com`) Y al hub privado (para que aparezca solo en `/admin`).

> **¿Por qué este enfoque?** Formspree pide plan pagado ($10/mes) para activar webhooks. Como no necesitábamos pagar, en su lugar el form mismo hace doble POST. Resultado idéntico: cada inscripción genera (a) email de Formspree (b) fila en el hub.

Para probar que funciona, hagan una inscripción de prueba en `sculptsocietycr.com/#inscripcion` y verifiquen que:
- Llega el email de Formspree a `sculptsocietycr@gmail.com`
- Aparece en el tab **Inscripciones** del hub `/admin`

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
