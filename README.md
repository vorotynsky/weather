# 🌤️ Weather App

A simple single-page application that displays the current weather for a defined location. Built for home servers.

Features:
- Display current weather from `/latest` endpoint in OpenWeather format.
- Simple and minimalistic weather page.
- Lightweight and fast.

## Instalation

0. Clone the repo.
1. Configure cron to execute `./script/weather.sh` (ex. by copying it to `/etc/cron.hourly`) and set environment variables.
2. Build a react app in `./app`.
3. Serve the built app and `$STORAGE/latest` as static files.
