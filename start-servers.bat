@echo off
echo Starting SwatchaSetu Servers...
echo.

echo Starting Backend Server (Port 5001)...
start "Backend Server" cmd /k "cd Backend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend Server (Port 3002)...
start "Frontend Server" cmd /k "cd Frontend && npm start"

timeout /t 3 /nobreak >nul

echo Starting Frontend API Server (Port 3001)...
start "Frontend API Server" cmd /k "cd Frontend && npm run server"

echo.
echo All servers are starting...
echo Backend: http://localhost:5001
echo Frontend: http://localhost:3002
echo Frontend API: http://localhost:3001
echo QR Scanner: http://localhost:5001/scanner
echo.
echo For mobile access:
echo 1. Run: ngrok http 5001
echo 2. Use the ngrok URL for mobile scanner access
echo.
pause