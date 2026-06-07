@echo off
echo 🔄 Restarting ToolSphere Development Servers...
echo.

echo 🛑 Stopping existing servers...

REM Kill process on port 3000 (Frontend)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000" ^| find "LISTENING"') do taskkill /F /PID %%a 2>nul

REM Kill process on port 5000 (Backend)
for /f "tokens=5" %%a in ('netstat -aon ^| find ":5000" ^| find "LISTENING"') do taskkill /F /PID %%a 2>nul

echo ✅ Servers stopped
echo.
echo 📝 To start the servers again:
echo Terminal 1: cd server ^&^& npm run dev
echo Terminal 2: cd client ^&^& npm run dev
echo.
pause
