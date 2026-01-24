@echo off
echo ================================================
echo   AURA OS - AUTOMATED DEPLOYMENT PROTOCOL
echo ================================================
echo.
echo [1/3] Staging changes...
git add .

echo [2/3] Committing fixes (Dashboard Layout & Hydration)...
git commit -m "fix(dashboard): resolve layout overlap and hydration mismatch"

echo [3/3] Pushing to live server...
git push origin main

echo.
echo ================================================
echo   DEPLOYMENT TRIGGERED! 🚀
echo   Please wait 2-3 minutes for Vercel to build.
echo   Check: https://asistan-orcin.vercel.app/dashboard
echo ================================================
pause
