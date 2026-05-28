import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const abs = (rel) => 'file://' + path.join(root, rel);

// Brand
const C = {
  wine: '#811D16',
  pink: '#F4BABB',
  cream: '#F9F5ED',
  gold: '#D6C774',
  charcoal: '#373330',
  orange: '#E7552C',
};

const W = 1080;
const H = 1350; // IG post optimal 4:5 portrait

const baseCSS = `
:root{--wine:${C.wine};--pink:${C.pink};--cream:${C.cream};--gold:${C.gold};--charcoal:${C.charcoal};--orange:${C.orange};}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${W}px;height:${H}px;overflow:hidden;font-family:'Poppins',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
body{position:relative;display:flex;flex-direction:column}
.serif{font-family:'Poppins',system-ui,sans-serif;font-weight:500}
.blob{position:absolute;border-radius:50%;filter:blur(80px);pointer-events:none}
.spark{position:absolute;color:var(--gold);font-family:serif}
.frame{position:absolute;inset:50px;border:1px solid currentColor;opacity:.18;pointer-events:none;border-radius:8px}
.tag{font-size:13px;letter-spacing:.35em;text-transform:uppercase;font-weight:500}
.huge{font-size:200px;font-weight:500;line-height:.95;letter-spacing:-.04em}
.big{font-size:120px;font-weight:500;line-height:1;letter-spacing:-.03em}
.med{font-size:72px;font-weight:500;line-height:1.05;letter-spacing:-.02em}
.body{font-size:34px;line-height:1.4;font-weight:400}
.italic{font-style:italic}
.center{display:flex;align-items:center;justify-content:center;text-align:center;height:100%;flex-direction:column;padding:120px 100px}
.split{position:absolute;inset:0}
img.bg{width:100%;height:100%;object-fit:cover;position:absolute;inset:0}
.overlay{position:absolute;inset:0;background:linear-gradient(180deg,rgba(129,29,22,.55) 0%,rgba(129,29,22,.78) 45%,rgba(129,29,22,.92) 100%)}
.overlay-soft{position:absolute;inset:0;background:linear-gradient(180deg,rgba(129,29,22,.35) 0%,rgba(129,29,22,.65) 60%,rgba(129,29,22,.88) 100%)}
.footer{position:absolute;bottom:60px;left:0;right:0;text-align:center;font-size:13px;letter-spacing:.3em;text-transform:uppercase;opacity:.65}
.divider{width:80px;height:1px;background:currentColor;opacity:.4;margin:32px auto}
.logo{width:160px;height:160px;border-radius:24px;overflow:hidden;margin:0 auto;box-shadow:0 20px 50px -20px rgba(0,0,0,.3)}
.logo img{width:100%;height:100%;object-fit:cover}
.num-pill{display:inline-flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;border:1px solid currentColor;font-size:22px;font-weight:500;margin-bottom:30px;opacity:.7}
`;

const head = `
<!doctype html><html><head><meta charset="UTF-8"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap" rel="stylesheet"/>
<style>${baseCSS}</style></head>`;

const wrap = (bodyContent, bgColor, color) =>
  `${head}<body style="background:${bgColor};color:${color}">${bodyContent}</body></html>`;

// ======= SLIDE BUILDERS =======

// Type 1: Centered editorial typographic slide
const editorial = ({ bg, color, eyebrow, title, body, footer, sparkles = true, accentColor }) => {
  const acc = accentColor || color;
  return wrap(`
    <div class="frame" style="color:${acc}"></div>
    ${sparkles ? `
      <span class="spark" style="top:140px;left:140px;font-size:32px;color:${acc};opacity:.7">✦</span>
      <span class="spark" style="bottom:160px;right:150px;font-size:26px;color:${acc};opacity:.5">✦</span>
      <span class="spark" style="top:48%;right:130px;font-size:18px;color:${acc};opacity:.4">✦</span>
    ` : ''}
    <div class="center">
      ${eyebrow ? `<p class="tag" style="color:${acc};margin-bottom:40px">${eyebrow}</p>` : ''}
      ${title ? `<div class="serif italic" style="font-size:${title.length > 22 ? 110 : 140}px;font-weight:500;line-height:1;letter-spacing:-.03em">${title}</div>` : ''}
      ${body ? `<div class="divider" style="background:${acc}"></div><p class="body serif" style="max-width:780px;color:${color};opacity:.92">${body}</p>` : ''}
      ${footer ? `<p class="tag" style="color:${acc};margin-top:60px;opacity:.7">${footer}</p>` : ''}
    </div>
  `, bg, color);
};

// Type 2: Split layout — photo top half, solid wine block bottom with text
const photoSlide = ({ img, eyebrow, title, sub, footer }) =>
  wrap(`
    <div style="position:absolute;top:0;left:0;right:0;height:55%;overflow:hidden">
      <img src="${img}" style="width:100%;height:100%;object-fit:cover"/>
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(129,29,22,.18) 0%,rgba(129,29,22,.55) 100%)"></div>
      <span class="spark" style="top:80px;right:100px;font-size:34px;color:var(--gold);opacity:.95">✦</span>
      <span class="spark" style="top:55%;left:100px;font-size:22px;color:var(--gold);opacity:.7">✦</span>
    </div>
    <div style="position:absolute;top:55%;left:0;right:0;bottom:0;background:var(--wine);color:var(--cream);padding:80px 90px 80px;display:flex;flex-direction:column;justify-content:space-between;text-align:center">
      <div>
        ${eyebrow ? `<p class="tag" style="color:var(--gold);margin-bottom:30px">${eyebrow}</p>` : ''}
        ${title ? `<div class="serif italic" style="font-size:120px;font-weight:500;line-height:.95;letter-spacing:-.03em">${title}</div>` : ''}
        ${sub ? `<p class="body serif italic" style="max-width:780px;margin:30px auto 0;opacity:.9;font-size:30px">${sub}</p>` : ''}
      </div>
      ${footer ? `<p class="tag" style="color:var(--gold);opacity:.85">${footer}</p>` : ''}
    </div>
    <div class="frame" style="color:var(--cream);z-index:2"></div>
  `, C.wine, C.cream);

// Type 3: Founder name slide (number pill + name in serif)
const founderSlide = ({ num, name, role }) =>
  wrap(`
    <div class="frame" style="color:var(--wine)"></div>
    <span class="spark" style="top:160px;right:160px;font-size:28px;color:var(--gold);opacity:.8">✦</span>
    <span class="spark" style="bottom:180px;left:160px;font-size:22px;color:var(--gold);opacity:.55">✦</span>
    <div class="center" style="color:var(--wine)">
      <div class="num-pill">${num}</div>
      <div class="serif italic" style="font-size:130px;font-weight:500;line-height:1;letter-spacing:-.03em">${name}</div>
      ${role ? `<p class="tag" style="margin-top:36px;color:var(--gold)">${role}</p>` : ''}
    </div>
  `, C.cream, C.wine);

// Type 4: Logo + headline (cover slide)
const coverSlide = ({ bg, color, accentColor, logo, eyebrow, title, sub }) => {
  const acc = accentColor || color;
  return wrap(`
    <div class="frame" style="color:${acc}"></div>
    <span class="spark" style="top:140px;left:140px;font-size:36px;color:${acc};opacity:.75">✦</span>
    <span class="spark" style="bottom:170px;right:150px;font-size:28px;color:${acc};opacity:.55">✦</span>
    <span class="spark" style="top:42%;right:130px;font-size:18px;color:${acc};opacity:.35">✦</span>
    <div class="center">
      ${logo ? `<div class="logo"><img src="${logo}"/></div>` : ''}
      ${eyebrow ? `<p class="tag" style="color:${acc};margin-top:50px">${eyebrow}</p>` : ''}
      ${title ? `<div class="serif italic" style="font-size:160px;font-weight:500;line-height:1;letter-spacing:-.04em;margin-top:24px">${title}</div>` : ''}
      ${sub ? `<p class="body serif italic" style="margin-top:28px;max-width:720px;opacity:.85">${sub}</p>` : ''}
    </div>
  `, bg, color);
};

// Type 5: List/info slide (component breakdown)
const listSlide = ({ bg, color, accentColor, eyebrow, items, footer }) => {
  const acc = accentColor || color;
  const list = items.map((it, i) => `
    <div style="display:flex;align-items:baseline;gap:30px;padding:22px 0;border-bottom:1px solid ${acc}30">
      <span class="serif italic" style="font-size:42px;color:${acc};min-width:90px">0${i + 1}</span>
      <div style="flex:1">
        <div class="serif" style="font-size:54px;font-weight:500;line-height:1.05">${it.title}</div>
        ${it.sub ? `<p style="font-size:24px;opacity:.7;margin-top:8px;font-style:italic">${it.sub}</p>` : ''}
      </div>
    </div>
  `).join('');
  return wrap(`
    <div class="frame" style="color:${acc}"></div>
    <span class="spark" style="top:120px;right:140px;font-size:30px;color:${acc};opacity:.7">✦</span>
    <div style="padding:140px 100px 100px;display:flex;flex-direction:column;height:100%">
      ${eyebrow ? `<p class="tag" style="color:${acc};margin-bottom:40px">${eyebrow}</p>` : ''}
      <div style="flex:1">${list}</div>
      ${footer ? `<p class="tag serif italic" style="color:${acc};text-align:center;margin-top:auto;opacity:.85;font-style:italic;text-transform:none;letter-spacing:.05em;font-size:24px">${footer}</p>` : ''}
    </div>
  `, bg, color);
};

// ======= POSTS =======

const slides = [
  // ====== POST 1 — MANIFESTO (3 slides)
  {
    id: 'post-01-manifesto-01',
    html: coverSlide({
      bg: C.cream,
      color: C.wine,
      accentColor: C.gold,
      logo: abs('src/assets/logos/logo-instagram.jpg'),
      eyebrow: 'Sculpt Society · Costa Rica',
      title: 'Llegamos.',
      sub: '',
    }),
  },
  {
    id: 'post-01-manifesto-02',
    html: editorial({
      bg: C.pink,
      color: C.wine,
      accentColor: C.wine,
      eyebrow: 'Manifesto ✦',
      title: '"El wellness se disfruta más cuando se comparte."',
      body: '',
      footer: '',
    }),
  },
  {
    id: 'post-01-manifesto-03',
    html: editorial({
      bg: C.wine,
      color: C.cream,
      accentColor: C.gold,
      eyebrow: 'Bienvenida ✦',
      title: 'Sculpt Society',
      body: 'Una comunidad para mujeres que quieren moverse, hacer amigas nuevas y vivir experiencias que se sienten tan bien como se ven.',
      footer: 'sculptsocietycr.com',
    }),
  },

  // ====== POST 2 — FUNDADORAS (4 slides)
  {
    id: 'post-02-fundadoras-01',
    html: editorial({
      bg: C.pink,
      color: C.wine,
      accentColor: C.wine,
      eyebrow: 'Las fundadoras',
      title: '"Las que están detrás de esto."',
      body: 'Tres amigas. Una misma visión. Una mañana para mujeres reales.',
      footer: '',
    }),
  },
  {
    id: 'post-02-fundadoras-02',
    html: founderSlide({ num: '01', name: 'Diana Troper', role: 'Fundadora ✦ Sculpt Society' }),
  },
  {
    id: 'post-02-fundadoras-03',
    html: founderSlide({ num: '02', name: 'Elvira Fernández', role: 'Fundadora ✦ Sculpt Society' }),
  },
  {
    id: 'post-02-fundadoras-04',
    html: founderSlide({ num: '03', name: 'Karina Bogantes', role: 'Fundadora ✦ Sculpt Society' }),
  },

  // ====== POST 4 — QUÉ VAS A VIVIR (6 slides)
  {
    id: 'post-04-experience-01',
    html: editorial({
      bg: C.wine,
      color: C.cream,
      accentColor: C.gold,
      eyebrow: '13 de junio · Paloma Studios',
      title: 'Esto vas a vivir.',
      body: '',
      footer: 'Una mañana, cinco momentos ✦',
    }),
  },
  {
    id: 'post-04-experience-02',
    html: photoSlide({
      img: abs('src/assets/images/about.jpg'),
      eyebrow: '01 ✦ Movimiento',
      title: 'Yoga Sculpt',
      sub: 'Moverte, sudar, soltar.',
      footer: 'Paloma Studios · 10 a.m.',
    }),
  },
  {
    id: 'post-04-experience-03',
    html: editorial({
      bg: C.cream,
      color: C.wine,
      accentColor: C.gold,
      eyebrow: '02 ✦ La mesa',
      title: 'Brunch.',
      body: 'Una mesa puesta con cariño. Sentarse, hablar, conocer.',
      footer: '',
    }),
  },
  {
    id: 'post-04-experience-04',
    html: photoSlide({
      img: abs('src/assets/images/bedazzling-bar.jpg'),
      eyebrow: '03 ✦ Sparkle',
      title: 'Bedazzling Bar',
      sub: 'Tu sparkle moment del día.',
      footer: 'Personalizá · Brillá · Llevátelo',
    }),
  },
  {
    id: 'post-04-experience-05',
    html: editorial({
      bg: C.pink,
      color: C.wine,
      accentColor: C.wine,
      eyebrow: '04 ✦ Detalles',
      title: '"Sorpresitas curadas con cariño."',
      body: 'Porque los detalles son lo que se queda en la memoria.',
      footer: '',
    }),
  },
  {
    id: 'post-04-experience-06',
    html: editorial({
      bg: C.wine,
      color: C.cream,
      accentColor: C.gold,
      eyebrow: '05 ✦ La mejor parte',
      title: 'Comunidad.',
      body: 'Conocer mujeres lindas que llegan solas y se van con amigas nuevas.',
      footer: 'Cupos en bio ✦',
    }),
  },

  // ====== POST 5 — BEDAZZLING BAR (1 slide)
  {
    id: 'post-05-bedazzling',
    html: photoSlide({
      img: abs('src/assets/images/bedazzling-bar.jpg'),
      eyebrow: 'Spoiler ✦',
      title: 'Tu sparkle moment.',
      sub: 'Cristales, brillos, mucho glow. Algo que solo vas a tener si estuviste ahí.',
      footer: 'Bedazzling Bar · Sculpt Society 13.06',
    }),
  },

  // ====== POST 6 — ÚLTIMA LLAMADA (1 slide)
  {
    id: 'post-06-ultima-llamada',
    html: photoSlide({
      img: abs('src/assets/images/about.jpg'),
      eyebrow: 'Última llamada ✦',
      title: '"Quedan pocos cupos."',
      sub: 'Si lo estás pensando, este es el momento. Si vas sola, todavía mejor — vas a salir con amigas nuevas.',
      footer: '13 de junio · 10 a.m. · Paloma Studios',
    }),
  },
];

// ======= RENDER =======

const outDir = path.join(root, 'exports', 'posts');
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: 'new' });

for (const slide of slides) {
  const tmpHtmlPath = path.join(__dirname, `_${slide.id}.html`);
  fs.writeFileSync(tmpHtmlPath, slide.html);

  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  await page.goto('file://' + tmpHtmlPath, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1000));

  const outPath = path.join(outDir, `${slide.id}.png`);
  await page.screenshot({
    path: outPath,
    type: 'png',
    clip: { x: 0, y: 0, width: W, height: H },
  });
  console.log('✓', `exports/posts/${slide.id}.png`);
  await page.close();
  fs.unlinkSync(tmpHtmlPath);
}

await browser.close();
console.log('\nDone — generated', slides.length, 'slides.');
