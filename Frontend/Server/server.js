// Server/server.js

import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from "node-fetch";

// Resolve __dirname equivalent in ESM
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Backend API URL - adjust port if your backend runs on different port
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5000';

console.log('Frontend Server Config:');
console.log('BACKEND_API_URL:', BACKEND_API_URL);
console.log('PORT:', process.env.PORT || 3001);

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

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

// NEW: Chatbot Endpoint
app.post('/api/chatbot', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required.' });
  }

  try {
    // Fetch real household data from backend
    const householdsResponse = await fetch(`${BACKEND_API_URL}/api/households`);
    const households = await householdsResponse.json();
    
    // Provide the household data as context for the model
    const householdDataString = JSON.stringify(households, null, 2);

    // Construct a detailed prompt
    const prompt = `
      You are SwachaPatha Helper, an AI assistant for a rural waste management system called "SwatchaPatha".
      Your role is to analyze the provided household data and answer questions from a supervisor.
      Today is ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
      
      Here is the complete household data in JSON format:
      ${householdDataString}

      Based on this data, please answer the following question. Provide clear, concise answers. If a calculation is needed, perform it and show the result.
      
      Question: "${query}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ error: 'Failed to get a response from the AI model.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Frontend API Server running on port ${PORT}`);
  console.log(`🔗 Connecting to backend at: ${BACKEND_API_URL}`);
  console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);
});