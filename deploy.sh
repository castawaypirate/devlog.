#!/usr/bin/env sh

dir="/var/www/devlog"

if [ -d "$dir" ]; then
    sudo rm -rf "$dir"/*
else
    sudo mkdir "$dir"
fi

for filename in *; do
    if [ ! "${filename##*.}" = "sh" ]; then
        sudo cp "$filename" "$dir"/"$filename"
    fi
done
