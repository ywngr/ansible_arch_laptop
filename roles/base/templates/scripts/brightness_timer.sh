#!/bin/bash

HOUR=$(date +%H)

if [ "$HOUR" -ge 5 ] && [ "$HOUR" -lt 21 ]; then
	brightnessctl s 45
	brightnessctl -d 'asus::kbd_backlight' s 0
else
	brightnessctl s 30
#	brightnessctl -d 'asus::kbd_backlight' s 1
fi
