import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const targets = [
  { file: '_invite-square.html', out: 'exports/invite-square.png', w: 1080, h: 1080 },
  { file: '_invite-story.html',  out: 'exports/invite-story.png',  w: 1080, h: 1920 },
];

import fs from 'fs';
const root = path.resolve(__dirname, '..');
const browser = await puppeteer.launch({ headless: 'new' });
for (const t of targets) {
  // Read HTML and rewrite relative img src to absolute file:// URLs
  const htmlSrc = path.join(__dirname, t.file);
  let html = fs.readFileSync(htmlSrc, 'utf8');
  html = html.replace(/src="src\//g, `src="file://${root}/src/`);
  const tmpPath = path.join(__dirname, `__tmp-${t.file}`);
  fs.writeFileSync(tmpPath, html);

  const page = await browser.newPage();
  await page.setViewport({ width: t.w, height: t.h, deviceScaleFactor: 1 });
  const url = 'file://' + tmpPath;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  // Give fonts a moment
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(__dirname, '..', t.out),
    type: 'png',
    clip: { x: 0, y: 0, width: t.w, height: t.h },
  });
  console.log('✓', t.out);
  await page.close();
  fs.unlinkSync(tmpPath);
}
await browser.close();
