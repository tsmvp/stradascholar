import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buyUrl, formatTime, thumbUrl, watchUrl } from '../src/lib/links.ts';

test('formatTime shows m:ss under an hour', () => {
  assert.equal(formatTime(149), '2:29');
  assert.equal(formatTime(5), '0:05');
});

test('formatTime shows h:mm:ss from an hour', () => {
  assert.equal(formatTime(3725), '1:02:05');
});

test('watchUrl jumps to the second', () => {
  assert.equal(watchUrl('abc', 149), 'https://www.youtube.com/watch?v=abc&t=149s');
});

test('watchUrl without seconds has no t parameter', () => {
  assert.equal(watchUrl('abc'), 'https://www.youtube.com/watch?v=abc');
});

test('thumbUrl uses the max resolution thumbnail', () => {
  assert.equal(thumbUrl('abc'), 'https://i.ytimg.com/vi/abc/maxresdefault.jpg');
});

test('buyUrl leaves the link alone when the store has no affiliate id', () => {
  assert.equal(buyUrl('amazon', 'https://www.amazon.com/dp/X', {}), 'https://www.amazon.com/dp/X');
});

test('buyUrl appends the affiliate parameter', () => {
  assert.equal(buyUrl('amazon', 'https://www.amazon.com/dp/X', { amazon: 'tag=foo-20' }), 'https://www.amazon.com/dp/X?tag=foo-20');
});

test('buyUrl keeps existing query parameters', () => {
  assert.equal(
    buyUrl('amazon', 'https://www.amazon.com/dp/X?th=1', { amazon: 'tag=foo-20' }),
    'https://www.amazon.com/dp/X?th=1&tag=foo-20',
  );
});
