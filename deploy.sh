#!/usr/bin/env bash
# Copy the repo to the Proxmox VM and rebuild the site container.
set -euo pipefail
cd "$(dirname "$0")"
HOST=deploy@192.168.98.118
rsync -az --delete --exclude .git --exclude node_modules --exclude dist --exclude .astro --exclude .superpowers \
  ./ "$HOST:stradascholar/"
ssh "$HOST" 'cd stradascholar && docker compose -f compose.yaml -f compose.proxmox.yaml up -d --build'
