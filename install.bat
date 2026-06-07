@echo off
echo 🚀 ToolSphere Installation Script
echo ==================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

node -v
echo.

REM Install server dependencies
echo 📦 Installing server dependencies...
cd server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install server dependencies
    exit /b 1
)
echo ✅ Server dependencies installed successfully
cd ..
echo.

REM Install client dependencies
echo 📦 Installing client dependencies...
cd client
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Failed to install client dependencies
    exit /b 1
)
echo ✅ Client dependencies installed successfully
cd ..
echo.

echo ✅ Installation complete!
echo.
echo 📝 Next steps:
echo 1. Start the backend:  cd server ^&^& npm run dev
echo 2. Start the frontend: cd client ^&^& npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.
echo 📖 For more details, see SETUP.md

pause
