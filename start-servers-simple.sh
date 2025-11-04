#!/bin/bash

echo "Starting SwatchaSetu Servers..."
echo ""

echo "Starting Backend Server (Port 5001)..."
cd Backend && npm start &
BACKEND_PID=$!

sleep 3
cd ..

echo "Starting Frontend API Server (Port 3001)..."
cd Frontend && npm run server &
API_PID=$!

sleep 3

echo "Starting Frontend Server (Port 3002)..."
npm start &
FRONTEND_PID=$!

cd ..

echo ""
echo "All servers are starting..."
echo "Backend: http://localhost:5001 (PID: $BACKEND_PID)"
echo "Frontend: http://localhost:3002 (PID: $FRONTEND_PID)"
echo "Frontend API: http://localhost:3001 (PID: $API_PID)"
echo "QR Scanner: http://localhost:5001/scanner"
echo ""
echo "To stop all servers, run:"
echo "kill $BACKEND_PID $API_PID $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop this script (servers will continue running)"

# Keep script running
wait