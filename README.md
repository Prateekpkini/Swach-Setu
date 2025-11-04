# SwatchaSetu - Rural Waste Management System

A comprehensive waste management system with QR code scanning, real-time tracking, and AI-powered analytics.

## Project Structure

```
SwatchaSetu/
├── Backend/                 # Express.js + Supabase backend
│   ├── server.js           # Main server file
│   ├── generate_qr.py      # QR code generation script
│   ├── views/scanner.ejs   # QR scanner web interface
│   └── .env               # Supabase configuration
├── Frontend/               # React.js frontend
│   ├── src/               # React components
│   ├── Server/            # Frontend API server
│   └── .env              # Frontend configuration
└── start-servers.bat      # Windows startup script
```

## Features

- **QR Code Scanning**: Web-based scanner for waste collection tracking
- **Real-time Dashboard**: Visual analytics and collection statistics
- **Household Management**: Complete household data management
- **Interactive Map**: Geographic visualization of households
- **Payment Tracking**: Monitor fee payment status
- **AI Chatbot**: Gemini-powered assistant for data insights
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- Python 3.x (for QR generation)
- Supabase account and database

### 1. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file in Backend folder:
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
PORT=5000
```

### 2. Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env` file in Frontend folder:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_BACKEND_URL=http://localhost:5000
```

Create `.env` file in Frontend/Server folder:
```
BACKEND_API_URL=http://localhost:5000
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

### 3. Database Setup

Your Supabase database should have these tables:

**Households Table:**
- HouseholdID (text, primary key)
- HeadOfHousehold (text)
- Latitude (decimal)
- Longitude (decimal)
- WasteTypePreference (text)
- FeeStatus (text)
- CollectionFrequency (text)

**CollectionLogs Table:**
- LogID (auto-increment, primary key)
- HouseholdID (text, foreign key)
- Status (text: 'pending' or 'collected')
- CollectorName (text)
- CollectedOn (timestamp)

## Running the Application

### Option 1: Use the startup script (Windows)
```bash
start-servers.bat
```

### Option 2: Manual startup

1. Start Backend Server:
```bash
cd Backend
npm start
```

2. Start Frontend React App:
```bash
cd Frontend
npm start
```

3. Start Frontend API Server:
```bash
cd Frontend
npm run server
```

## Access Points

- **Frontend Dashboard**: http://localhost:3002
- **QR Scanner**: http://localhost:5001/scanner
- **Backend API**: http://localhost:5001/api
- **Frontend API**: http://localhost:3001/api

## QR Code Generation

Generate QR codes for households H001-H100:
```bash
cd Backend
python generate_qr.py
```

## API Endpoints

### Backend Endpoints
- `GET /api/households` - Get all households
- `GET /api/collection-logs` - Get all collection logs
- `GET /api/today-collections` - Get today's collection status
- `GET /collect?houseid=H001` - Update collection status

### Frontend API Endpoints
- `GET /api/households` - Proxy to backend
- `GET /api/collection-logs` - Proxy to backend
- `GET /api/today-collections` - Proxy to backend
- `POST /api/chatbot` - AI chatbot queries

## Usage

1. **Generate QR Codes**: Run the Python script to create QR codes for all households
2. **Scan QR Codes**: Use the web scanner at `/scanner` to mark collections as complete
3. **Monitor Dashboard**: View real-time statistics and analytics
4. **Manage Households**: View and manage household information
5. **Track Payments**: Monitor fee payment status
6. **Use AI Assistant**: Ask questions about collection data

## Troubleshooting

- Ensure all servers are running on correct ports
- Check Supabase connection and credentials
- Verify that household data exists in the database
- Make sure QR codes are generated before scanning

## Technologies Used

- **Backend**: Node.js, Express.js, Supabase
- **Frontend**: React.js, Leaflet Maps, Chart.js
- **AI**: Google Gemini API
- **Database**: PostgreSQL (via Supabase)
- **QR Codes**: Python qrcode library