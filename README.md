# 🌤️ Weather App

A simple single-page application that displays the current weather for a defined location. Built for home servers.

Features:
- Display current weather from `/latest` endpoint in OpenWeather format.
- Simple and minimalistic weather page.
- Lightweight and fast.

## Instalation

0. Clone the repo.
1. Configure cron to execute `./script/weather.sh` (ex. by copying it to `/etc/cron.hourly`) and set environment variables.
2. Build a docker container.
3. Run docker container with mounted folder.
```sh
docker run -d -p 80:80 -v $STORAGE/latest:/mnt/latest weather
```
