// =====================================================
// SCULPT SOCIETY — CONTENIDO CENTRAL
// EDITA AQUÍ todo el contenido visible del sitio.
// Cada vez que modifiques este archivo, hacé commit y push
// para que Vercel publique los cambios automáticamente.
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

// Única foto personal usada en el sitio (sección Sobre nosotras, espejada)
import aboutImg from '../assets/images/about.jpg';
// Imagen del Bedazzling Bar (cepillos personalizados con cristales)
import bedazzlingBarImg from '../assets/images/bedazzling-bar.jpg';

// -------------------------------
// MARCA
// -------------------------------
export const brand = {
  name: 'Sculpt Society',
  tagline: 'Comunidad wellness para mujeres',
  instagram: '@sculptsocietycr',
  instagramUrl: 'https://instagram.com/sculptsocietycr',
  domain: 'sculptsocietycr.com',
  email: 'sculptsocietycr@gmail.com',
  whatsapp: '+506 6257 5319',
  whatsappRaw: '50662575319',
  sinpeNumber: '+506 6257 5319',
  sinpeOwner: 'Elvira Fernández',
};

export const logos = {
  primary: logoPrimary,           // pink letters / wine bg (oficial)
  vector: logoVector,             // versión vector
  wineOnCream: logoWineOnCream,   // letras vino / fondo crema (header sobre cream)
  creamOnWine: logoCreamOnWine,   // letras crema / fondo vino (hero secundario)
  creamOnCharcoal: logoCreamOnCharcoal, // letras crema / fondo carbón (footer dark)
  goldOnWine: logoGoldOnWine,     // letras dorado / fondo vino (premium accent)
  creamOnPink: logoCreamOnPink,   // letras crema / fondo rosado (bedazzling bar)
  wineOnPink: logoWineOnPink,     // letras vino / fondo rosado (community accent)
  wineOnGold: logoWineOnGold,     // letras vino / fondo dorado (gold accent)
};

export const images = {
  about: aboutImg, // se renderiza espejada vía CSS
  bedazzlingBar: bedazzlingBarImg,
};

export const colors = {
  orange: '#E7552C',
  wine: '#811D16',
  pink: '#F4BABB',
  cream: '#F9F5ED',
  charcoal: '#373330',
  gold: '#D6C774',
};

// -------------------------------
// NAVEGACIÓN
// -------------------------------
export const nav = {
  links: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Sobre nosotras', href: '#sobre' },
    { label: 'Comunidad', href: '#comunidad' },
    { label: 'Eventos', href: '#eventos' },
    { label: 'Próximo evento', href: '#proximo-evento' },
    { label: 'FAQ', href: '#faq' },
  ],
  cta: { label: 'Inscribirme', href: '#inscripcion' },
};

// -------------------------------
// HERO
// -------------------------------
export const hero = {
  eyebrow: 'Comunidad wellness · Costa Rica',
  title: 'Una comunidad creada para moverte, conectar y brillar.',
  subtitle:
    'Sculpt Society es una comunidad wellness para mujeres que quieren cuidarse, hacer amigas nuevas y vivir experiencias que se sienten tan bien como se ven.',
  ctaPrimary: { label: 'Inscribirme al próximo evento', href: '#proximo-evento' },
  ctaSecondary: { label: 'Conocer Sculpt Society', href: '#sobre' },
  // Palabras editoriales para la composición tipográfica del hero
  manifestoWords: ['Wellness', 'Movimiento', 'Amistad', 'Brillar'],
};

// -------------------------------
// SOBRE SCULPT SOCIETY (única sección con foto)
// -------------------------------
export const about = {
  eyebrow: 'Sobre nosotras',
  title: 'Wellness que se disfruta más cuando se comparte.',
  body: [
    'Sculpt Society nació de una amistad y de una idea simple: el wellness se disfruta más cuando se comparte. Somos tres amigas unidas por la pasión por el movimiento, el bienestar y las experiencias bonitas.',
    'Creamos espacios para mujeres que quieren moverse, conocer personas nuevas, disfrutar momentos lindos y sentirse parte de una comunidad con alegría, intención y mucho glow.',
  ],
};

// -------------------------------
// FUNDADORAS
// -------------------------------
export const founders = {
  eyebrow: 'Las fundadoras',
  title: 'Tres amigas, una misma visión.',
  description:
    'Tres amigas unidas por la pasión por el wellness, las experiencias bonitas y la felicidad compartida.',
  list: [
    { name: 'Diana Troper', initial: 'D', image: null },
    { name: 'Elvira Fernández', initial: 'E', image: null },
    { name: 'Karina Bogantes', initial: 'K', image: null },
  ],
};

// -------------------------------
// PILARES
// -------------------------------
export const beliefs = {
  eyebrow: 'Lo que creemos',
  title: 'Los pilares que nos mueven.',
  list: [
    { title: 'Movimiento', description: 'El cuerpo se siente mejor cuando se mueve con intención y alegría.' },
    { title: 'Amistad', description: 'Las mejores conversaciones nacen entre clases y mimosas.' },
    { title: 'Felicidad', description: 'Salir de cada experiencia con una energía más bonita.' },
    { title: 'Wellness', description: 'Cuidarnos sin presión, sin culpa y con mucha calma.' },
    { title: 'Comunidad', description: 'Un espacio seguro para encontrarnos, aunque vengas sola.' },
    { title: 'Experiencias bonitas', description: 'Detalles curados con cariño que se sienten y se recuerdan.' },
  ],
};

// -------------------------------
// COMUNIDAD
// -------------------------------
export const community = {
  eyebrow: 'Nuestra comunidad',
  title: 'Para mujeres que quieren más.',
  bullets: [
    'Hacer amigas nuevas',
    'Moverse de forma feliz',
    'Ir a eventos lindos aunque vayan solas',
    'Compartir un buen brunch',
    'Vivir experiencias curadas con cariño',
    'Sentirse parte de algo especial',
  ],
  cta: { label: 'Quiero ser parte', href: '#inscripcion' },
};

// -------------------------------
// PRÓXIMO EVENTO
// -------------------------------
export const nextEvent = {
  eyebrow: 'Próximo evento',
  title: 'Sculpt Society — Hannah Montana Edition',
  description:
    'Nuestra próxima edición mezcla movimiento, brunch, comunidad, sorpresas y una vibra divertida con guiños a los 2000s. Una mañana para moverte, conectar, brillar y vivir lo mejor de ambos mundos.',
  date: '13 de junio',
  time: '10:00 a.m.',
  location: 'Paloma Studios, Escazú, Costa Rica',
  price: '₡20.000',
  spots: 'Cupos limitados',
  imagePlaceholderText: 'Foto próximamente',
  ctaPrimary: { label: 'Inscribirme ahora', href: '#inscripcion' },
  includes: [
    { title: 'Yoga Sculpt Class', description: 'Clase guiada para moverte, sudar y soltar — sin presión.' },
    { title: 'Brunch', description: 'Una mesa puesta con cariño para compartir entre amigas.' },
    { title: 'Bedazzling Bar', description: 'Personalizá un detalle único y llevátelo de recuerdo.' },
    { title: 'Sorpresitas', description: 'Detalles curados que hacen la mañana inolvidable.' },
    { title: 'Comunidad', description: 'Conocé mujeres lindas en un espacio seguro y cálido.' },
  ],
};

export const agenda = {
  eyebrow: 'Agenda tentativa',
  title: 'Cómo se vive la mañana.',
  note: 'La agenda puede ajustarse el día del evento.',
  list: [
    { time: '10:00 a.m.', activity: 'Bienvenida y check-in' },
    { time: '10:15 a.m.', activity: 'Clase de Yoga Sculpt' },
    { time: '11:15 a.m.', activity: 'Brunch' },
    { time: '11:45 a.m.', activity: 'Bedazzling Bar + sorpresitas' },
    { time: '12:30 p.m.', activity: 'Cierre y fotos' },
  ],
};

export const bedazzlingBar = {
  eyebrow: 'Bedazzling Bar',
  title: 'Tu sparkle moment.',
  description: 'Un espacio para personalizar, brillar y llevarte un detalle único de esta edición.',
  body: 'Una activación pensada para que crees algo tuyo: cristales, brillos y detalles que reflejan tu vibra. Fotogénico, divertido y con mucho glow.',
};

// -------------------------------
// EVENTOS FUTUROS — sin fotos, treatment gráfico (símbolo + color)
// -------------------------------
export const futureEvents = {
  eyebrow: 'Eventos Sculpt Society',
  title: 'Esto es solo el comienzo.',
  description:
    'Sculpt Society es una comunidad continua. Estamos curando experiencias para todo el año.',
  list: [
    { title: 'Yoga Sculpt', description: 'Clases temáticas para moverte feliz.', symbol: '◇', tone: 'pink' },
    { title: 'Brunch experiences', description: 'Mesas largas para compartir entre amigas.', symbol: '✿', tone: 'gold' },
    { title: 'Bedazzling Bar', description: 'Activaciones creativas y fotogénicas.', symbol: '✦', tone: 'wine' },
    { title: 'Activaciones con marcas', description: 'Colaboraciones con marcas wellness.', symbol: '◯', tone: 'pink' },
    { title: 'Wellness mornings', description: 'Mañanas de movimiento, comida y calma.', symbol: '☼', tone: 'gold' },
    { title: 'Experiencias temáticas', description: 'Ediciones especiales con vibra única.', symbol: '❋', tone: 'wine' },
  ],
};

// -------------------------------
// FORMULARIO DE INSCRIPCIÓN
// -------------------------------
export const form = {
  eyebrow: 'Reservá tu lugar',
  title: 'Inscribite a la Hannah Montana Edition.',
  subtitle:
    'Completá el formulario y te confirmamos tu cupo por WhatsApp en menos de 24 horas.',
  endpoint: 'https://formspree.io/f/xbdwldbr',
  payment: {
    method: 'SINPE Móvil',
    number: '+506 6257 5319',
    name: 'Elvira Fernández',
    note: 'Realizá el SINPE por ₡20.000 a nombre de Elvira Fernández y adjuntá el detalle del comprobante en el formulario. Tu cupo se confirma una vez verificamos el pago.',
  },
  whatsappFallback: {
    label: 'Prefiero inscribirme por WhatsApp',
    href: 'https://wa.me/50662575319?text=Hola%2C%20quiero%20inscribirme%20a%20Sculpt%20Society%20%E2%80%94%20Hannah%20Montana%20Edition',
  },
  successMessage:
    '¡Recibimos tu inscripción! Te contactamos por WhatsApp en menos de 24 horas para confirmar tu cupo.',
  errorMessage:
    'Hubo un problema enviando el formulario. Probá de nuevo o escribinos directo por WhatsApp.',
};

// -------------------------------
// FAQ
// -------------------------------
export const faq = {
  eyebrow: 'Preguntas frecuentes',
  title: 'Lo que necesitás saber.',
  list: [
    { q: '¿Necesito experiencia previa?', a: 'Para nada. La clase de Yoga Sculpt está diseñada para todos los niveles. Solo traé ganas de moverte y disfrutar.' },
    { q: '¿Puedo ir sola?', a: '¡Claro que sí! De hecho, la mayoría de nuestras asistentes vienen solas. Es un espacio seguro y cálido pensado para conocer mujeres lindas.' },
    { q: '¿Qué incluye el precio?', a: 'Tu cupo incluye la clase de Yoga Sculpt, el brunch, acceso al Bedazzling Bar, sorpresitas curadas y la experiencia completa de comunidad.' },
    { q: '¿Cómo reservo mi espacio?', a: 'Completá el formulario de inscripción en esta misma página. También podés escribirnos por WhatsApp si preferís coordinar por ahí.' },
    { q: '¿Cómo pago?', a: 'El pago se realiza por SINPE Móvil al +506 6257 5319 a nombre de Elvira Fernández. Adjuntá el detalle del comprobante en el formulario.' },
    { q: '¿Dónde es el evento?', a: 'En Paloma Studios, Escazú, Costa Rica. Te enviamos la ubicación exacta por WhatsApp al confirmar tu cupo.' },
    { q: '¿Hay cupos limitados?', a: 'Sí. Los cupos son muy limitados para mantener la experiencia íntima y bien curada. Te recomendamos reservar con tiempo.' },
    { q: '¿Qué debo llevar?', a: 'Ropa cómoda para moverte, mat de yoga si tenés (también hay disponibles), una botella de agua y muchas ganas de pasarla bien.' },
    { q: '¿Qué es el Bedazzling Bar?', a: 'Una activación creativa donde podés personalizar un detalle con cristales y brillos para llevarte un recuerdo único de la edición.' },
    { q: '¿Se tomarán fotos y videos?', a: 'Sí, tendremos fotógrafa cubriendo la experiencia. Si preferís no aparecer, decinos al llegar y respetamos tu espacio.' },
  ],
};

// -------------------------------
// MOODBOARD — 6 vibe tiles tipográficas (sin fotos)
// -------------------------------
export const gallery = {
  eyebrow: 'Moodboard',
  title: 'La vibra Sculpt Society.',
  note: 'Las palabras que nos mueven.',
  items: [
    { word: 'glow',        tone: 'pink',  symbol: '✦' },
    { word: 'movimiento',  tone: 'wine',  symbol: '☼' },
    { word: 'amistad',     tone: 'gold',  symbol: '✿' },
    { word: 'ritual',      tone: 'cream', symbol: '◇' },
    { word: 'sparkle',     tone: 'pink',  symbol: '✦' },
    { word: 'comunidad',   tone: 'wine',  symbol: '◯' },
  ],
};

// -------------------------------
// FOOTER
// -------------------------------
export const footer = {
  tagline: 'Comunidad wellness para mujeres en Costa Rica.',
  copyright: `© ${new Date().getFullYear()} Sculpt Society. Todos los derechos reservados.`,
};
