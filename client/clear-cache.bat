@echo off
echo 🧹 Clearing Next.js cache...

REM Remove .next directory
if exist .next rmdir /s /q .next

REM Remove node_modules/.cache
if exist node_modules\.cache rmdir /s /q node_modules\.cache

echo ✅ Cache cleared!
echo 📝 Now run: npm run dev

pause
