// Prépare les photos du client (data/restaurants/tariki/photos) : WebP, 1800 px max. Usage : node scripts/photos.mjs
import sharp from 'sharp';
const src = '../../data/restaurants/tariki/photos';
const jobs = [['01-braises.jpg', 'braises', 1800], ['02-feu-de-camp.jpg', 'feu-de-camp', 1024], ['03-arcades.jpg', 'arcades', 1800]];
for (const [f, n, w] of jobs) {
  const i = await sharp(`${src}/${f}`).resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(`public/photos/${n}.webp`);
  console.log(n, i.width, i.height);
}
await sharp(`${src}/04-logo-fond-noir.png`).webp({ quality: 90 }).toFile('public/photos/logo.webp');
