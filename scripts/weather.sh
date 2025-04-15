#!/bin/sh

# readonly set API_KEY=""
# readonly set LAT=""
# readonly set LON=""
# readonly set STORAGE=""

if [ -z ${STORAGE+x} ]; then
        echo "STORAGE is unset"
        exit
fi

mkdir -p $STORAGE

curl -s -N "https://api.openweathermap.org/data/2.5/weather?lat=$LAT&lon=$LON&appid=$API_KEY&units=metric" -w "\n" | tee "$STORAGE/latest" >> "$STORAGE/history"
