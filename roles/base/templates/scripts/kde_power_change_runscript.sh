#!/bin/bash

if [[ $1 == "ac" ]]; then
	kscreen-doctor output.1.mode.1
	rfkill unblock bluetooth
	brightnessctl s 50
elif [[ $1 == "bat" ]]; then
	kscreen-doctor output.1.mode.2
	rfkill block bluetooth
	brightnessctl s 30
	brightnessctl -d 'asus::kbd_backlight' s 0
fi
