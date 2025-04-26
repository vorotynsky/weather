# Building image
FROM node:23-slim AS build

WORKDIR /app

COPY app/package.json app/package-lock.json ./
RUN npm ci

COPY app/ .
RUN npm run build

# Static files serving image
FROM nginx:1.28.0-alpine-slim

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# /mnt/latest contains current weather.
# this file will be also served as static file.
VOLUME /mnt/latest

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
