// Auth muy simple para el hub privado.
// El password vive solo en variables de entorno de Vercel, NO en el código fuente.
// Las requests del hub mandan: Authorization: Bearer <password>
// El webhook de Formspree manda: x-webhook-secret: <FORMSPREE_WEBHOOK_SECRET>

export function requireAuth(req, res) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    res.status(500).json({
      error:
        'ADMIN_PASSWORD no está configurado en las variables de entorno de Vercel.',
    });
    return false;
  }
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (token !== expected) {
    res.status(401).json({ error: 'No autorizado.' });
    return false;
  }
  return true;
}

export function requireWebhookSecret(req, res) {
  const expected = process.env.FORMSPREE_WEBHOOK_SECRET;
  if (!expected) {
    // Si no hay secret configurado, permitimos el paso (con un warning).
    // Mejor configurarlo para evitar webhook spoofing.
    console.warn(
      'FORMSPREE_WEBHOOK_SECRET no configurado — webhook acepta requests sin verificar.'
    );
    return true;
  }
  const received =
    req.headers['x-webhook-secret'] ||
    req.headers['x-formspree-secret'] ||
    new URL(req.url, 'http://x').searchParams.get('secret');
  if (received !== expected) {
    res.status(401).json({ error: 'Webhook secret inválido.' });
    return false;
  }
  return true;
}

export function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-webhook-secret'
  );
}

export function handleOptions(req, res) {
  if (req.method === 'OPTIONS') {
    cors(res);
    res.status(204).end();
    return true;
  }
  cors(res);
  return false;
}
