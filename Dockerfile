# stradascholar.com: build the static site from site/ + content/, serve it with nginx.
FROM node:24-slim AS build
WORKDIR /repo/site
COPY site/package.json site/package-lock.json ./
RUN npm ci
COPY content /repo/content
COPY site ./
RUN npm run build

FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/site/dist /usr/share/nginx/html
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --start-interval=1s CMD wget -qO- http://127.0.0.1/ > /dev/null || exit 1
