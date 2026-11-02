# stradascholar

Build archive for Lucas Rodrigues' BMWs ([YouTube @stradascholar](https://www.youtube.com/@stradascholar)), live at https://stradascholar.com.

- `content/`: car data (`cars/<slug>/car.yaml`), photos (`cars/<slug>/photos/`, `hero.*` is the header image) and `videos.yaml`.
- `site/`: Astro static site that renders `content/`.
- `docs/superpowers/`: design and plans.

## Run locally

```sh
cd site
npm install
npm run dev      # http://localhost:4321
npm test
```

## Deploy

```sh
./deploy.sh      # rsync to the Proxmox VM, rebuild the container behind Traefik
```

Traefik (from the GLPI stack on 192.168.98.118) gets the certificate through the IONOS DNS challenge. `www` redirects to the apex.
