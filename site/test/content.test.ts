import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { parse } from 'yaml';

const root = new URL('../../content/', import.meta.url);
const videos: { id: string; car?: string }[] = parse(readFileSync(new URL('videos.yaml', root), 'utf8'));
const slugs = readdirSync(new URL('cars/', root));
const cars = slugs.map((slug) => ({ slug, ...parse(readFileSync(new URL(`cars/${slug}/car.yaml`, root), 'utf8')) }));
const videoIds = new Set(videos.map((v) => v.id));

test('every video belongs to an existing car or none', () => {
  for (const v of videos) if (v.car) assert.ok(slugs.includes(v.car), `${v.id} -> unknown car ${v.car}`);
});

test('every part video is a known video', () => {
  for (const car of cars)
    for (const p of car.parts ?? []) if (p.video) assert.ok(videoIds.has(p.video), `${car.slug}: ${p.name} -> ${p.video}`);
});

test('every tutorial uses parts listed on its car', () => {
  for (const car of cars) {
    const names = new Set((car.parts ?? []).map((p: { name: string }) => p.name));
    for (const t of car.tutorials ?? []) {
      assert.ok(videoIds.has(t.video), `${car.slug}: ${t.title} -> ${t.video}`);
      for (const u of t.uses) assert.ok(names.has(u), `${car.slug}: ${t.title} uses unknown "${u}"`);
    }
  }
});

test('spec, stats and setup entries hold only a label and a value', () => {
  for (const car of cars)
    for (const key of ['spec', 'stats', 'setup'])
      for (const pair of car[key] ?? [])
        assert.deepEqual(Object.keys(pair).sort(), ['label', 'value'], `${car.slug} ${key}: ${JSON.stringify(pair)} (quote values with commas)`);
});

test('part names are unique per car', () => {
  for (const car of cars) {
    const names = (car.parts ?? []).map((p: { name: string }) => p.name);
    assert.equal(new Set(names).size, names.length, `${car.slug} has duplicate part names`);
  }
});
