#!/bin/bash

echo "Starting SwatchaSetu Servers..."
echo ""

echo "Starting Backend Server (Port 5001)..."
gnome-terminal --title="Backend Server" -- bash -c "cd Backend && npm start; exec bash" &

sleep 3

echo "Starting Frontend Server (Port 3002)..."
gnome-terminal --title="Frontend Server" -- bash -c "cd Frontend && npm start; exec bash" &

sleep 3

echo "Starting Frontend API Server (Port 3001)..."
gnome-terminal --title="Frontend API Server" -- bash -c "cd Frontend && npm run server; exec bash" &

echo ""
echo "All servers are starting..."
echo "Backend: http://localhost:5001"
echo "Frontend: http://localhost:3002"
echo "Frontend API: http://localhost:3001"
echo "QR Scanner: http://localhost:5001/scanner"
echo ""
echo "For mobile access:"
echo "1. Run: ngrok http 5001"
echo "2. Use the ngrok URL for mobile scanner access"
echo ""
echo "Press any key to continue..."
read -n 1