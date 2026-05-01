// Genera variantes de color del logo a partir del original
// (pink #F4BABB sobre wine #811D16) usando luminance blending.

import sharp from 'sharp';

const SOURCE = 'src/assets/logos/logo-primary.jpeg';

// fg = color de las letras, bg = color de fondo
const variants = [
  { name: 'wine-on-cream',     fg: [129, 29, 22],   bg: [249, 245, 237] },
  { name: 'cream-on-wine',     fg: [249, 245, 237], bg: [129, 29, 22] },
  { name: 'cream-on-charcoal', fg: [249, 245, 237], bg: [55, 51, 48] },
  { name: 'gold-on-wine',      fg: [214, 199, 116], bg: [129, 29, 22] },
  { name: 'wine-on-pink',      fg: [129, 29, 22],   bg: [244, 186, 187] },
  { name: 'wine-on-gold',      fg: [129, 29, 22],   bg: [214, 199, 116] },
  { name: 'cream-on-pink',     fg: [249, 245, 237], bg: [244, 186, 187] },
];

// luminance thresholds for blending (smooth anti-alias)
// Below LO → bg color; above HI → fg color; in between → linear blend
const LO = 60;
const HI = 200;

for (const v of variants) {
  const meta = await sharp(SOURCE).metadata();
  const { data, info } = await sharp(SOURCE).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const buf = Buffer.from(data);
  for (let i = 0; i < buf.length; i += 4) {
    const r = buf[i], g = buf[i + 1], b = buf[i + 2];
    const lum = r * 0.299 + g * 0.587 + b * 0.114;
    const t = Math.max(0, Math.min(1, (lum - LO) / (HI - LO)));
    buf[i]     = Math.round(v.bg[0] * (1 - t) + v.fg[0] * t);
    buf[i + 1] = Math.round(v.bg[1] * (1 - t) + v.fg[1] * t);
    buf[i + 2] = Math.round(v.bg[2] * (1 - t) + v.fg[2] * t);
  }
  await sharp(buf, { raw: { width: info.width, height: info.height, channels: 4 } })
    .jpeg({ quality: 90 })
    .toFile(`src/assets/logos/logo-${v.name}.jpg`);
  console.log('✓ logo-' + v.name + '.jpg');
}
