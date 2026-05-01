import sharp from 'sharp';
await sharp('src/assets/images/about.jpg')
  .rotate(-90)
  .withMetadata({orientation: 1})
  .jpeg({quality: 88})
  .toFile('src/assets/images/about-fixed.jpg');
console.log('done');
