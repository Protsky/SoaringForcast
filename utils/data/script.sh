#!/bin/bash

while read url; do
    filename=$(basename "$url")
    echo "Downloading $filename from $url"
    curl -OJL "$url"
done < url.txt

