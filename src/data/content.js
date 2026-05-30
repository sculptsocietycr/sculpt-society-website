// =====================================================
// SCULPT SOCIETY — HANNAH VS MILEY EDITION
// Todo el copy visible del sitio vive acá.
// =====================================================

import logoPrimary from '../assets/logos/logo-primary.jpeg';
import logoVector from '../assets/logos/logo-vector.png';
import logoWineOnCream from '../assets/logos/logo-wine-on-cream.jpg';
import logoCreamOnWine from '../assets/logos/logo-cream-on-wine.jpg';
import logoCreamOnCharcoal from '../assets/logos/logo-cream-on-charcoal.jpg';
import logoGoldOnWine from '../assets/logos/logo-gold-on-wine.jpg';
import logoCreamOnPink from '../assets/logos/logo-cream-on-pink.jpg';
import logoWineOnPink from '../assets/logos/logo-wine-on-pink.jpg';
import logoWineOnGold from '../assets/logos/logo-wine-on-gold.jpg';

import aboutImg from '../assets/images/about.jpg';
import bedazzlingBarImg from '../assets/images/bedazzling-bar.jpg';

// -------------------------------
// MARCA
// -------------------------------
export const brand = {
  name: 'Sculpt Society',
  edition: 'Hannah vs Miley Edition',
  tagline: 'Pop star morning · 13 de junio',
  instagram: '@sculptsocietycr',
  instagramUrl: 'https://instagram.com/sculptsocietycr',
  domain: 'sculptsocietycr.com',
  email: 'sculptsocietycr@gmail.com',
  whatsapp: '+506 7010 1783',
  whatsappRaw: '50670101783',
  sinpeNumber: '+506 7010 1783',
  sinpeOwner: 'Diana Troper',
};

export const logos = {
  primary: logoPrimary,
  vector: logoVector,
  wineOnCream: logoWineOnCream,
  creamOnWine: logoCreamOnWine,
  creamOnCharcoal: logoCreamOnCharcoal,
  goldOnWine: logoGoldOnWine,
  creamOnPink: logoCreamOnPink,
  wineOnPink: logoWineOnPink,
  wineOnGold: logoWineOnGold,
};

export const images = {
  about: aboutImg,
  bedazzlingBar: bedazzlingBarImg,
};

// -------------------------------
// NAVEGACIÓN — enfocada en el evento
// -------------------------------
export const nav = {
  links: [
    { label: 'El evento', href: '#evento' },
    { label: 'Hannah vs Miley', href: '#concepto' },
    { label: 'Qué incluye', href: '#experiencia' },
    { label: 'Dress code', href: '#dresscode' },
    { label: 'Detalles', href: '#detalles' },
    { label: 'Fundadoras', href: '#fundadoras' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: { label: 'Reservar mi spot', href: '#inscripcion' },
};

// -------------------------------
// HERO
// -------------------------------
export const hero = {
  eyebrow: '✦ Sculpt Society presenta',
  edition: 'Hannah vs Miley Edition',
  titleLines: ['Tu pop star morning', 'empieza acá.'],
  subtitle:
    'Una mañana para moverte, brillar y conectar — con la nostalgia Y2K de los 2000s, brunch, brillos y la energía pop star que más vibre con vos ese día.',
  date: '13 de junio · 2026',
  time: '10:00 a.m.',
  location: 'Paloma Studios · Escazú',
  price: '₡20.000',
  ctaPrimary: { label: 'Reservar mi spot', href: '#inscripcion' },
  ctaSecondary: { label: 'Quiero ver más', href: '#concepto' },
  marquee: [
    'Yoga Sculpt',
    'Brunch',
    'Bedazzling Bar',
    'Pop star morning',
    'Y2K nostalgia',
    'Glow energy',
    'Hannah ✦ Miley',
  ],
};

// -------------------------------
// CONCEPTO — Hannah vs Miley
// -------------------------------
export const concept = {
  eyebrow: 'El concepto',
  title: 'Dos energías. Una misma mañana.',
  intro:
    'Esto no es cosplay. Es jugar con la dualidad: lo dulce y lo bold, lo girly y lo libre, lo nostálgico y lo presente. Vení con la energía que querás — o con las dos.',
  sides: [
    {
      key: 'hannah',
      name: 'Hannah',
      tagline: 'Sweet girl energy',
      vibe: 'Rosa, brillos, butterfly clips, lip gloss, baby tee, denim mini, pop star de Disney Channel.',
      words: ['Dulce', 'Nostálgica', 'Girly', 'Playful', 'Pop star'],
    },
    {
      key: 'miley',
      name: 'Miley',
      tagline: 'Bold girl energy',
      vibe: 'Lila, plateado, sunglasses, denim oversize, main character, free spirit, era “Party in the USA”.',
      words: ['Bold', 'Libre', 'Cool', 'Segura', 'Main character'],
    },
  ],
  vs: 'vs',
  closing:
    'El evento invita a venir como te haga sentir más vos: Hannah, Miley o la mezcla perfecta de las dos.',
};

// -------------------------------
// FUNDADORAS — quiénes están detrás del evento
// Las imágenes viven en /public/founders/ así basta con
// arrastrar los archivos jpg para que aparezcan.
// -------------------------------
export const founders = {
  eyebrow: 'Las fundadoras',
  title: 'Tres amigas detrás de esta edición.',
  intro:
    'Sculpt Society nace de una amistad. Esta es la primera edición temática que armamos las tres — pensada con cariño, mucha nostalgia y ganas de hacer un sábado distinto.',
  list: [
    {
      key: 'diana',
      name: 'Diana',
      role: 'Logística · Instructora de Yoga Sculpt',
      bio: 'El cerebro detrás de que todo fluya — agenda, espacios, brunch, sorpresas — y además te guía la clase. Energía cálida, secuencias para todos los niveles.',
      image: '/founders/diana.jpg',
      vibe: 'hannah',
      sticker: '✦',
    },
    {
      key: 'karina',
      name: 'Karina',
      role: 'Patrocinios · Alianzas',
      bio: 'La que hace que las marcas que amamos sean parte del evento. Si ves un detalle bonito de una marca aliada, fue ella.',
      image: '/founders/karina.jpg',
      vibe: 'miley',
      sticker: '♡',
    },
    {
      key: 'elvira',
      name: 'Elvira',
      role: 'Dirección creativa',
      bio: 'La mente del concepto, el mood y el dress code. Esta edición Hannah vs Miley salió de muchas tardes hablando de Disney Channel.',
      image: '/founders/elvira.jpg',
      vibe: 'hannah',
      sticker: '✧',
    },
  ],
};

// -------------------------------
// EXPERIENCIA — Qué vas a vivir
// -------------------------------
export const experience = {
  eyebrow: 'Qué vas a vivir',
  title: 'Una mañana pop star, paso a paso.',
  description:
    'Tres horas curadas para moverte, comer rico, brillar y salir con caras nuevas en tu cámara digital.',
  items: [
    {
      icon: '✦',
      title: 'Yoga Sculpt',
      description: 'Una clase guiada para activar tu energía, soltar y moverte sin presión. Apta para todos los niveles.',
    },
    {
      icon: '✿',
      title: 'Brunch',
      description: 'Una mesa puesta con cariño para compartir, conectar y elegir el plato que más te llame ese día.',
    },
    {
      icon: '✧',
      title: 'Bedazzling Bar',
      description: 'Personalizá un detalle con cristales, brillos y charms para llevarte un recuerdo único de esta edición.',
    },
    {
      icon: '♡',
      title: 'Sorpresas temáticas',
      description: 'Detalles curados al estilo Y2K — pensados para hacerte sonreír y para tu feed.',
    },
    {
      icon: '☼',
      title: 'Música y mood',
      description: 'Playlist Y2K nostalgia: Hannah, Miley y los pop hits de los 2000s que sabés cantar de memoria.',
    },
    {
      icon: '✦',
      title: 'Comunidad',
      description: 'Un espacio para venir sola, con amigas o conocer mujeres nuevas. Sin presión, sin grupitos.',
    },
  ],
};

export const agenda = {
  eyebrow: 'Tu mañana',
  title: 'Cómo se vive el sábado.',
  note: 'La agenda puede ajustarse el día del evento.',
  list: [
    { time: '10:00 a.m.', activity: 'Bienvenida + check-in pop star' },
    { time: '10:15 a.m.', activity: 'Yoga Sculpt class' },
    { time: '11:15 a.m.', activity: 'Brunch y mingle' },
    { time: '11:45 a.m.', activity: 'Bedazzling Bar + sorpresitas' },
    { time: '12:30 p.m.', activity: 'Foto grupal + cierre' },
  ],
};

// -------------------------------
// PARA QUIÉN ES — objeciones
// -------------------------------
export const forWho = {
  eyebrow: 'Para quién es',
  title: 'Es para vos si…',
  intro:
    'No importa si nunca has hecho yoga, si no conocés a nadie o si llegás con tu mejor amiga. Este espacio se diseñó para que llegues como sos y la pases bien.',
  bullets: [
    {
      icon: '♡',
      title: 'Podés venir sola',
      description: 'La mayoría llega sola. Es un espacio cálido pensado para conocer mujeres nuevas sin awkwardness.',
    },
    {
      icon: '✦',
      title: 'No necesitás experiencia',
      description: 'La clase de Yoga Sculpt está pensada para todos los niveles. Cero presión, cero competencia.',
    },
    {
      icon: '✿',
      title: 'No tenés que estar “fit”',
      description: 'Tu cuerpo está perfecto para venir. Venimos a movernos rico, no a performar.',
    },
    {
      icon: '✧',
      title: 'No tenés que conocer a nadie',
      description: 'Hacemos rompehielos suaves y la mesa de brunch está pensada para mezclarse natural.',
    },
    {
      icon: '☼',
      title: 'Podés jugar con el dress code',
      description: 'Brillos, denim, rosa, lila, butterfly clips… o tu outfit favorito. Lo que te haga sentir cute.',
    },
    {
      icon: '★',
      title: 'Solo querés algo lindo un sábado',
      description: 'Si querés salir de la rutina y vivir una mañana diferente en Costa Rica, este es tu plan.',
    },
  ],
};

// -------------------------------
// DRESS CODE / VIBE
// -------------------------------
export const dressCode = {
  eyebrow: 'Dress code',
  title: 'El mood: pop star off-duty.',
  intro:
    'El dress code es opcional pero recomendado. Si querés jugar con el concepto, esta es la guía para tu outfit.',
  pills: [
    'Y2K pop star',
    'Brillos',
    'Denim',
    'Baby tees',
    'Rosa · lila · plateado',
    'Butterfly clips',
    'Mini accesorios',
    'Lip gloss energy',
    'Charms',
    'Cámara digital',
  ],
  cards: [
    {
      key: 'hannah',
      title: 'Si elegís Hannah',
      list: [
        'Rosa, candy pink, lavanda',
        'Baby tee + denim mini',
        'Butterfly clips · scrunchies',
        'Brillos, charms, hearts',
        'Lip gloss + blush rosa',
      ],
    },
    {
      key: 'miley',
      title: 'Si elegís Miley',
      list: [
        'Lila, plateado, blanco',
        'Denim oversize + crop',
        'Sunglasses Y2K · chunky belt',
        'Plateado, chrome, rhinestones',
        'Bold lip + cat eye',
      ],
    },
  ],
  note:
    'Si no querés tematizar, llegá como te haga sentir bien. Lo importante es que llegués cómoda para moverte.',
};

// -------------------------------
// PRÓXIMO EVENTO — datos clave
// -------------------------------
export const nextEvent = {
  eyebrow: 'El evento',
  edition: 'Hannah vs Miley Edition',
  title: 'Sculpt Society: Hannah vs Miley Edition',
  shortTitle: 'Hannah vs Miley Edition',
  description:
    'La primera gran experiencia temática de Sculpt Society. Una mañana inspirada en la nostalgia Y2K, los 2000s pop, la amistad y el glow-up.',
  date: '13 de junio, 2026',
  dateShort: '13.06.26',
  day: 'Sábado',
  time: '10:00 a.m. – 12:30 p.m.',
  location: 'Paloma Studios, Escazú, Costa Rica',
  price: '₡20.000',
  spots: 'Cupos limitados',
  ctaPrimary: { label: 'Reservar mi spot', href: '#inscripcion' },
};

// -------------------------------
// DETALLES — qué llevar / cómo reservar
// -------------------------------
export const details = {
  eyebrow: 'Detalles',
  title: 'Todo lo que necesitás saber.',
  rows: [
    { label: 'Fecha', value: 'Sábado 13 de junio, 2026' },
    { label: 'Hora', value: '10:00 a.m. – 12:30 p.m.' },
    { label: 'Lugar', value: 'Paloma Studios, Escazú' },
    { label: 'Inversión', value: '₡20.000' },
    { label: 'Cupos', value: 'Limitados — confirmá pronto' },
  ],
  includes: {
    title: 'Qué incluye tu cupo',
    items: [
      'Clase de Yoga Sculpt',
      'Brunch (vos elegís el plato)',
      'Acceso al Bedazzling Bar',
      'Sorpresas temáticas Y2K',
      'Playlist y mood pop star',
      'La experiencia completa de comunidad',
    ],
  },
  bring: {
    title: 'Qué llevar',
    items: [
      'Ropa cómoda para moverte (con brillos welcome)',
      'Mat de yoga si tenés (hay disponibles)',
      'Botella de agua',
      'Cámara digital o film camera (opcional pero ✨)',
      'Tu mejor energía Hannah o Miley',
    ],
  },
  reserve: {
    title: 'Cómo reservar',
    steps: [
      'Completá el formulario abajo o escribinos por WhatsApp.',
      'Hacé el SINPE de ₡20.000 al +506 7010 1783 a nombre de Diana Troper.',
      'Adjuntá el comprobante en el formulario y listo.',
      'Te confirmamos tu cupo por WhatsApp en menos de 24 horas.',
    ],
  },
};

// -------------------------------
// BEDAZZLING BAR — destacado
// -------------------------------
export const bedazzlingBar = {
  eyebrow: 'Bedazzling Bar',
  title: 'Tu sparkle moment.',
  description: 'Un espacio para crear algo brillante, fotogénico y muy tuyo.',
  body: 'Cristales, charms, rhinestones, perlas y mucho glow para que personalices un detalle que te llevás de recuerdo. Hannah-coded, Miley-coded o las dos.',
};

// -------------------------------
// FORMULARIO DE INSCRIPCIÓN
// -------------------------------
export const form = {
  eyebrow: 'Reservá tu spot',
  title: 'Apartá tu cupo en la Hannah vs Miley Edition.',
  subtitle:
    'Completá el formulario y te confirmamos por WhatsApp en menos de 24 horas. Cupos limitados — no te quedés afuera del rewind.',
  endpoint: 'https://formspree.io/f/xbdwldbr',
  payment: {
    method: 'SINPE Móvil',
    number: '+506 7010 1783',
    name: 'Diana Troper',
    note: 'Hacé el SINPE por ₡20.000 a nombre de Diana Troper y adjuntá el detalle del comprobante en el formulario. Tu cupo se confirma una vez verificamos el pago.',
  },
  brunchIntro:
    'Elegí 1 opción de brunch. Todo con ingredientes frescos y de alta calidad, en alianza con Paloma Studios.',
  brunchOptions: [
    {
      value: 'puravida-pinto',
      title: 'Opción 1 · Puravida Pinto',
      tagline: 'Energía balanceada',
      description: 'Pinto, aguacate, pico de gallo, queso fresco y huevos revueltos. Servido en bowl o en wrap.',
    },
    {
      value: 'omelette',
      title: 'Opción 2 · Omelette',
      tagline: 'Nutritivo',
      description: 'Dos huevos con hongos, cebolla caramelizada y tomate cherry. Acompañado de ensalada verde.',
    },
    {
      value: 'wrap-pollo',
      title: 'Opción 3 · Wrap de Pollo',
      tagline: 'Boost de proteína',
      description: 'Pollo, huevo duro, kale y aderezo de hierbas, envuelto en tortilla de harina. Acompañado con chips de kale.',
    },
    {
      value: 'matcha-french-toast',
      title: 'Opción 4 · Matcha French Toast',
      tagline: 'Sweet & good vibes',
      description: 'Pan brioche, frutas de temporada, crema de matcha y miel de abeja.',
    },
    {
      value: 'smoothie-bowl',
      title: 'Opción 5 · Smoothie Bowl',
      tagline: 'Pretty & good for you',
      description: 'Smoothie aura de frutos rojos, proteína, miel y yogurt, terminado con frutas de temporada, granola y mantequilla de maní.',
    },
  ],
  energy: {
    label: '¿Con qué energía venís?',
    intro: 'Solo para saber el mood de la mañana — no te obliga a nada.',
    options: [
      { value: 'hannah', label: 'Hannah · sweet girl' },
      { value: 'miley', label: 'Miley · bold girl' },
      { value: 'mix', label: 'Mix · las dos' },
      { value: 'undecided', label: 'Decido el día' },
    ],
  },
  whatsappFallback: {
    label: 'Prefiero inscribirme por WhatsApp',
    href: 'https://wa.me/50670101783?text=Hola%2C%20quiero%20reservar%20mi%20spot%20en%20Sculpt%20Society%20%E2%80%94%20Hannah%20vs%20Miley%20Edition',
  },
  successMessage:
    '¡Recibimos tu inscripción! Te escribimos por WhatsApp en menos de 24 horas para confirmar tu spot. Get ready para el 13 de junio ✦',
  errorMessage:
    'Hubo un problema enviando el formulario. Probá de nuevo o escribinos directo por WhatsApp.',
};

// -------------------------------
// FAQ
// -------------------------------
export const faq = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que probablemente te estás preguntando.',
  list: [
    {
      q: '¿Puedo ir sola?',
      a: 'Sí, y de hecho la mayoría llega sola. El evento está diseñado para que conozcas mujeres nuevas sin sentirte fuera de lugar — hacemos rompehielos suaves y la mesa de brunch se mezcla natural.',
    },
    {
      q: '¿Necesito experiencia en yoga o sculpt?',
      a: 'Para nada. La clase es para todos los niveles y la instructora va guiando opciones según cómo te sientas. Solo traé ganas de moverte.',
    },
    {
      q: '¿Qué debo llevar?',
      a: 'Ropa cómoda para moverte (con brillos welcome), botella de agua, y mat de yoga si tenés (hay disponibles en el estudio). Opcional pero divertido: tu cámara digital o film camera.',
    },
    {
      q: '¿Hay dress code?',
      a: 'Es opcional pero recomendado. La idea es jugar con el concepto Y2K / Hannah / Miley — brillos, denim, rosa, lila, plateado, baby tees, butterfly clips. Si no querés tematizar, llegá como te haga sentir bien.',
    },
    {
      q: '¿Cómo reservo mi cupo?',
      a: 'Completá el formulario en esta página o escribinos por WhatsApp. Hacé el SINPE de ₡20.000 al +506 7010 1783 a nombre de Diana Troper, adjuntá el comprobante en el formulario y te confirmamos en menos de 24 horas.',
    },
    {
      q: '¿El cupo es transferible?',
      a: 'Sí. Si por algo no podés venir, podés pasar tu cupo a una amiga. Solo avisanos por WhatsApp con su nombre, teléfono y elección de brunch.',
    },
    {
      q: '¿Qué pasa si no conozco a nadie?',
      a: 'Estás en el lugar correcto. Más de la mitad de las que vienen llegan solas. La energía del espacio es cálida, no hay grupitos cerrados y todas estamos ahí para conectar.',
    },
    {
      q: '¿Dónde queda Paloma Studios?',
      a: 'En Escazú, Costa Rica. Te enviamos la ubicación exacta por WhatsApp al confirmar tu cupo, junto con tips de parqueo.',
    },
    {
      q: '¿Qué incluye el precio?',
      a: 'Los ₡20.000 incluyen la clase de Yoga Sculpt, el brunch (vos elegís el plato), acceso al Bedazzling Bar, sorpresitas temáticas y la experiencia completa de comunidad.',
    },
    {
      q: '¿Se tomarán fotos y videos?',
      a: 'Sí, tendremos fotógrafa cubriendo la experiencia para el feed. Si preferís no aparecer, decinos al llegar y respetamos tu espacio sin problema.',
    },
  ],
};

// -------------------------------
// CIERRE EMOCIONAL
// -------------------------------
export const closing = {
  eyebrow: 'Nos vemos en el mat',
  bigText: 'Una mañana para moverte,',
  bigTextItalic: 'brillar y conectar.',
  subtitle: 'Tu pop star morning empieza el 13 de junio.',
  cta: { label: 'Reservar mi spot', href: '#inscripcion' },
  micro: '✦ Cupos limitados · Paloma Studios · ₡20.000',
};

// -------------------------------
// FOOTER
// -------------------------------
export const footer = {
  tagline: 'Sculpt Society — Comunidad wellness para mujeres en Costa Rica. Esta edición: Hannah vs Miley.',
  copyright: `© ${new Date().getFullYear()} Sculpt Society. Made with glow desde Costa Rica.`,
};
