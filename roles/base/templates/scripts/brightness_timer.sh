#!/bin/bash

HOUR=$(date +%H)

if [ "$HOUR" -ge 8 ] && [ "$HOUR" -lt 19 ]; then
	brightnessctl s 75
	brightnessctl -d 'asus::kbd_backlight' s 0
else
	brightnessctl s 55
	brightnessctl -d 'asus::kbd_backlight' s 1
fi
