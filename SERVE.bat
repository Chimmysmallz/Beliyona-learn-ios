@echo off
cd /d "%~dp0"
title Study Egg - Test on phone
set PY=py
where py >nul 2>nul || set PY=python
%PY% tools\serve.py
pause
