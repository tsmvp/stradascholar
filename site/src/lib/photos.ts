import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../../../content/cars/*/photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
});

/** Photos in content/cars/<slug>/photos: hero.* is the header image, the rest the gallery in filename order. */
export function carPhotos(slug: string): { hero?: ImageMetadata; gallery: ImageMetadata[] } {
  const prefix = `../../../content/cars/${slug}/photos/`;
  const mine = Object.keys(files)
    .filter((path) => path.startsWith(prefix))
    .sort();
  const heroPath = mine.find((path) => /\/hero\.[a-z]+$/i.test(path));
  return {
    hero: heroPath ? files[heroPath].default : undefined,
    gallery: mine.filter((path) => path !== heroPath).map((path) => files[path].default),
  };
}
