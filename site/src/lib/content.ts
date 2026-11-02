import { getCollection, type CollectionEntry } from 'astro:content';

export type Car = CollectionEntry<'cars'>;
export type Video = CollectionEntry<'videos'>;
export type Part = Car['data']['parts'][number];

/** Cars in display order. */
export async function getCars(): Promise<Car[]> {
  return (await getCollection('cars')).sort((a, b) => a.data.order - b.data.order);
}

/** Videos newest first, optionally only those tagged with a car. */
export async function getVideos(car?: string): Promise<Video[]> {
  const all = (await getCollection('videos')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return car ? all.filter((v) => v.data.car === car) : all;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
