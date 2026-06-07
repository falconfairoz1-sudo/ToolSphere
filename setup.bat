@echo off
REM ToolSphere Setup Script for Windows
REM This script sets up both client and server

echo ================================
echo   ToolSphere Setup Script
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org
    pause
    exit /b 1
)

echo [OK] Node.js detected
node -v
echo.

REM Setup Client
echo ================================
echo   Setting up Client (Frontend)
echo ================================
cd client

if not exist ".env.local" (
    echo Creating .env.local from example...
    copy .env.local.example .env.local
    echo [OK] Created .env.local
)

echo Installing client dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install client dependencies
    pause
    exit /b 1
)

echo [OK] Client dependencies installed
cd ..
echo.

REM Setup Server
echo ================================
echo   Setting up Server (Backend)
echo ================================
cd server

if not exist ".env" (
    echo Creating .env from example...
    copy .env.example .env
    echo [OK] Created .env
)

echo Installing server dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install server dependencies
    pause
    exit /b 1
)

echo [OK] Server dependencies installed
cd ..
echo.

REM Success message
echo ================================
echo   Setup Complete!
echo ================================
echo.
echo Next Steps:
echo.
echo 1. Start the backend:
echo    cd server
echo    npm run dev
echo.
echo 2. In a new terminal, start the frontend:
echo    cd client
echo    npm run dev
echo.
echo 3. Open your browser:
echo    http://localhost:3000
echo.
echo Documentation:
echo    - QUICKSTART.md - Getting started guide
echo    - IMPLEMENTATION_GUIDE.md - How to add tools
echo    - DEPLOYMENT.md - Deploy to production
echo.
echo Happy coding!
echo.
pause
