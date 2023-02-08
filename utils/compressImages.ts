import { Image } from 'types/generated/contentful';
const sharp = require('sharp');

export const compressImages = async (images: Image[]) => {
  await Promise.all(images.map(async (img) => {
    await sharp(img.src)
      .webp({ quality: 20 })
      .toFile(`public/img/offers/compress/${img.fileName}.webp`);

    img.src = `${process.env.DOMAIN}public/img/offers/compress/${img.fileName}.webp`;
    img.dimensions.type = 'webp';
    return img;
  }));

  return images;
};