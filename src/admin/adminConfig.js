// =====================================================
// SCULPT SOCIETY — CONFIG DEL HUB DE FUNDADORAS
// =====================================================
// El hub privado vive en /admin. Toda la data (inscripciones,
// gastos, proveedores) se guarda en Upstash Redis (Vercel KV),
// configurado desde el panel de Vercel.
//
// La CONTRASEÑA del hub NO vive acá — vive en una variable de
// entorno de Vercel llamada ADMIN_PASSWORD. Ver HUB_SETUP.md.
//
// Lo único que pueden tocar acá es la lista por defecto del
// checklist de logística (cada dispositivo guarda su propia
// versión, esta es solo el punto de partida).
// =====================================================

export const adminConfig = {
  // -------------------------------
  // CHECKLIST DE LOGÍSTICA POR DEFECTO
  // -------------------------------
  // Tareas iniciales que aparecen en el tab Checklist del hub
  // cuando entran por primera vez. Después cada fundadora puede
  // marcar, agregar o borrar (se guarda en su dispositivo).
  defaultChecklist: [
    'Confirmar lista de inscritas con Paloma Studios',
    'Confirmar menú de brunch (cantidades por opción)',
    'Comprar cristales y materiales del Bedazzling Bar',
    'Preparar bolsas de regalo / sorpresitas',
    'Confirmar fotógrafa y horario',
    'Imprimir nametags / lista de check-in',
    'Verificar todos los pagos SINPE recibidos',
    'Enviar recordatorio por WhatsApp 24 h antes',
    'Compartir ubicación exacta a las inscritas',
    'Llegar 1 h antes para setup',
  ],
};
