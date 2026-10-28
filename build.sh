#!/bin/sh
# Mac / Linux: build, check and test
cd "$(dirname "$0")"
python3 tools/build.py && python3 tools/check.py && { command -v node >/dev/null && node tests/app.test.js || true; }
