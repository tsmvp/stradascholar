import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const categories = [
  'Engine',
  'Drivetrain',
  'Exhaust',
  'Suspension',
  'Brakes',
  'Wheels & tires',
  'Exterior',
  'Interior',
  'Electrical',
  'Maintenance',
  'Tools',
] as const;

const pair = z.strictObject({ label: z.string(), value: z.string() });

const part = z.object({
  name: z.string(),
  brand: z.string().optional(),
  category: z.enum(categories),
  kind: z.enum(['part', 'tool']).default('part'),
  note: z.string().optional(),
  video: z.string().optional(),
  at: z.number().int().nonnegative().optional(),
  links: z.array(z.object({ store: z.string(), url: z.url() })).default([]),
});

const tutorial = z.object({
  title: z.string(),
  summary: z.string(),
  video: z.string(),
  at: z.number().int().nonnegative(),
  uses: z.array(z.string()).default([]),
});

const cars = defineCollection({
  loader: glob({
    pattern: '*/car.yaml',
    base: '../content/cars',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    name: z.string(),
    year: z.number().int(),
    chassis: z.string(),
    engine: z.string(),
    headline: z.string(),
    hook: z.string(),
    order: z.number().int(),
    overview: z.string(),
    spec: z.array(pair).default([]),
    stats: z.array(pair).default([]),
    setup: z.array(pair).default([]),
    parts: z.array(part).default([]),
    tutorials: z.array(tutorial).default([]),
  }),
});

const videos = defineCollection({
  loader: file('../content/videos.yaml'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    car: z.string().optional(),
  }),
});

export const collections = { cars, videos };
