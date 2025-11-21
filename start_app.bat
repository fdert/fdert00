@echo off
echo Checking for Node.js...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in your PATH.
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b
)

echo Node.js is installed.
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo Starting development server...
call npm run dev
