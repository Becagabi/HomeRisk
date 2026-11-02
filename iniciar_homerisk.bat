@echo off
cd /d "%~dp0"
py homerisk.py iniciar
if errorlevel 1 pause
