/** Seconds as m:ss, or h:mm:ss from one hour. */
export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, '0');
  return h ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

/** YouTube link, optionally starting at a given second. */
export function watchUrl(videoId: string, seconds?: number): string {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  return seconds === undefined ? url : `${url}&t=${seconds}s`;
}

/** Largest YouTube thumbnail for a video. */
export function thumbUrl(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

/** Store link with the store's affiliate parameter appended, when one is configured. */
export function buyUrl(store: string, url: string, ids: Record<string, string>): string {
  const param = ids[store];
  if (!param) return url;
  return url + (url.includes('?') ? '&' : '?') + param;
}
