#!/bin/bash
# Convert .mov video assets to web-friendly .mp4 and .webm
# Requires ffmpeg. If not installed: brew install ffmpeg (macOS) or apt install ffmpeg (Linux)

set -e

MEDIA_DIR="$(dirname "$0")/../public/media"

if ! command -v ffmpeg &> /dev/null; then
  echo "ffmpeg not found. Install it to convert videos:"
  echo "  macOS:  brew install ffmpeg"
  echo "  Linux:  sudo apt install ffmpeg"
  echo "  Build will not fail — videos are optional."
  exit 0
fi

for mov in "$MEDIA_DIR"/*.mov; do
  [ -f "$mov" ] || continue
  base="${mov%.mov}"
  echo "Converting: $mov"

  if [ ! -f "${base}.mp4" ]; then
    ffmpeg -i "$mov" -c:v libx264 -crf 23 -preset fast -an -movflags +faststart "${base}.mp4"
    echo "  → ${base}.mp4"
  fi

  if [ ! -f "${base}.webm" ]; then
    ffmpeg -i "$mov" -c:v libvpx-vp9 -crf 30 -b:v 0 -an "${base}.webm"
    echo "  → ${base}.webm"
  fi
done

echo "Done."
