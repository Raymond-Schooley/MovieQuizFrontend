# Production image: builds the static React app, then serves it (and
# reverse-proxies /api to the backend) from nginx. This one image is the
# entire public entry point in production - see ../docker-compose.yml.

FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
