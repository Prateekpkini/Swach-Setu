// Server/server.js

import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import fetch from "node-fetch";

// Resolve __dirname equivalent in ESM
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from Server/.env
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Backend API URL - adjust port if your backend runs on different port
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5001';

console.log('Frontend Server Config:');
console.log('BACKEND_API_URL:', BACKEND_API_URL);
console.log('PORT:', process.env.PORT || 3001);

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

app.get("/api/households", async (req, res) => {
  try {
    console.log(`Attempting to fetch households from: ${BACKEND_API_URL}/api/households`);
    
    const response = await fetch(`${BACKEND_API_URL}/api/households`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000 // 10 second timeout
    });
    
    console.log(`Backend response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend API error: ${response.status} - ${errorText}`);
      throw new Error(`Backend API error: ${response.status}`);
    }
    
    const households = await response.json();
    console.log(`Successfully fetched ${households.length} households`);
    res.json(households);
  } catch (error) {
    console.error('Error fetching households from backend:', error.message);
    
    // Check if backend is running
    if (error.code === 'ECONNREFUSED') {
      res.status(503).json({ 
        error: 'Backend server is not running. Please start the backend server on port 5000.',
        details: error.message 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to fetch households from backend',
        details: error.message 
      });
    }
  }
});

// NEW: Collection logs endpoint
app.get("/api/collection-logs", async (req, res) => {
  try {
    console.log(`Attempting to fetch collection logs from: ${BACKEND_API_URL}/api/collection-logs`);
    
    const response = await fetch(`${BACKEND_API_URL}/api/collection-logs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000
    });
    
    console.log(`Backend logs response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend API error for logs: ${response.status} - ${errorText}`);
      // Return empty array instead of error for logs
      res.json([]);
      return;
    }
    
    const logs = await response.json();
    console.log(`Successfully fetched ${logs.length} collection logs`);
    res.json(logs);
  } catch (error) {
    console.error('Error fetching collection logs from backend:', error.message);
    // Return empty array for logs instead of error
    res.json([]);
  }
});

// NEW: Today's collections endpoint
app.get("/api/today-collections", async (req, res) => {
  try {
    console.log(`Attempting to fetch today's collections from: ${BACKEND_API_URL}/api/today-collections`);
    
    const response = await fetch(`${BACKEND_API_URL}/api/today-collections`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000
    });
    
    console.log(`Backend today's collections response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend API error for today's collections: ${response.status} - ${errorText}`);
      // Return empty array instead of error
      res.json([]);
      return;
    }
    
    const todayCollections = await response.json();
    console.log(`Successfully fetched ${todayCollections.length} today's collections`);
    res.json(todayCollections);
  } catch (error) {
    console.error('Error fetching today\'s collections from backend:', error.message);
    // Return empty array instead of error
    res.json([]);
  }
});

// NEW: Manual payment update endpoint
app.post('/api/update-payment', async (req, res) => {
  try {
    const { householdId, status } = req.body;
    console.log(`Attempting to update payment for ${householdId} to ${status}`);
    
    const response = await fetch(`${BACKEND_API_URL}/api/update-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ householdId, status }),
      timeout: 10000
    });
    
    console.log(`Backend payment update response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend API error for payment update: ${response.status} - ${errorText}`);
      throw new Error(`Backend API error: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`Successfully updated payment: ${result.message}`);
    res.json(result);
  } catch (error) {
    console.error('Error updating payment:', error.message);
    res.status(500).json({ 
      error: 'Failed to update payment',
      details: error.message 
    });
  }
});

// NEW: Sync payments endpoint
app.post('/api/sync-payments', async (req, res) => {
  try {
    console.log(`Attempting to sync payments at: ${BACKEND_API_URL}/api/sync-payments`);
    
    const response = await fetch(`${BACKEND_API_URL}/api/sync-payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000
    });
    
    console.log(`Backend sync response status: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend API error for sync: ${response.status} - ${errorText}`);
      throw new Error(`Backend API error: ${response.status}`);
    }
    
    const result = await response.json();
    console.log(`Successfully synced payments: ${result.message}`);
    res.json(result);
  } catch (error) {
    console.error('Error syncing payments:', error.message);
    res.status(500).json({ 
      error: 'Failed to sync payments',
      details: error.message 
    });
  }
});

// NEW: Chatbot Endpoint - Proxy to Backend
app.post('/api/chatbot', async (req, res) => {
  try {
    const { query } = req.body;
    console.log('🤖 Proxying chatbot query to backend:', query);
    
    const response = await fetch(`${BACKEND_API_URL}/api/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      timeout: 30000 // 30 second timeout for AI responses
    });
    
    console.log(`Backend chatbot response status: ${response.status}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Backend chatbot error: ${response.status}`, errorData);
      return res.status(response.status).json(errorData);
    }
    
    const result = await response.json();
    console.log('✅ Chatbot response received from backend');
    res.json(result);
  } catch (error) {
    console.error('Error proxying chatbot request:', error.message);
    res.status(500).json({ 
      error: 'Failed to connect to chatbot service. Please ensure the backend server is running.',
      details: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Frontend API Server running on port ${PORT}`);
  console.log(`🔗 Connecting to backend at: ${BACKEND_API_URL}`);
  console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);
});