@echo off
cd /d "%~dp0"
title Study Egg - Build
set PY=py
where py >nul 2>nul || set PY=python
echo Packing src into index.html...
%PY% tools\build.py || goto fail
echo.
echo Checking for mistakes...
%PY% tools\check.py || goto fail
where node >nul 2>nul && node tests\app.test.js
echo.
echo Done. Commit and push to GitHub to publish.
pause
exit /b 0
:fail
echo.
echo Something needs fixing. Read the message above, fix it in src, then run BUILD again.
pause
exit /b 1
