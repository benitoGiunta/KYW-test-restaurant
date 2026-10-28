#!/bin/sh
# Chromium préinstallé lancé sans sandbox (root) : utilisé par les scripts hallmark via CHROME_PATH.
exec /opt/pw-browsers/chromium --no-sandbox --disable-gpu --disable-dev-shm-usage "$@"
