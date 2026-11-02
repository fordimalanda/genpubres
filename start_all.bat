@echo off
title GenPubRes - Demarrage global

echo ========================================================
echo Demarrage des services GenPubRes...
echo - Backend  : dotnet watch (http://localhost:5151)
echo - Frontend : npm run dev  (http://localhost:3000)
echo ========================================================

REM Lancement du Backend dans une nouvelle fenetre
start "GenPubRes - Backend (dotnet watch)" cmd /k "cd /d "%~dp0Backend" && dotnet watch"

REM Lancement du Frontend dans une nouvelle fenetre
start "GenPubRes - Frontend (npm run dev)" cmd /k "cd /d "%~dp0Frontend" && npm run dev"

echo Les deux processus ont ete lances dans des fenetres distinctes.

