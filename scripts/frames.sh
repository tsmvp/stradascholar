#!/usr/bin/env bash
# Download a YouTube video at its best quality and extract candidate stills:
# one frame per scene change plus one every 5 seconds.
# Usage: scripts/frames.sh <videoId> <outdir>
set -euo pipefail
id=$1
out=$2
mkdir -p "$out/frames"
[ -f "$out/$id.mp4" ] || yt-dlp -f "bv*[ext=mp4]/bv*" -o "$out/$id.mp4" "https://www.youtube.com/watch?v=$id"
ffmpeg -loglevel error -i "$out/$id.mp4" -vf "select='gt(scene,0.3)+not(mod(n\,150))',scale=-2:min(ih\,2160)" \
  -fps_mode vfr -q:v 2 "$out/frames/$id-%04d.jpg"
ls "$out/frames" | grep -c "^$id-"
