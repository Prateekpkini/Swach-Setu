// Server/server.js

import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import sql from "mssql";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Resolve __dirname equivalent in ESM
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, ".env") });

// Import local module (adjust extension if needed)
import data from "./data.js";

// Debug logs
console.log("DB SERVER:", process.env.AZURE_DB_SERVER);
console.log("DB NAME:", process.env.AZURE_DB_NAME);

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
const dbConfig = {
  user: process.env.AZURE_DB_USER,
  password: process.env.AZURE_DB_PASS,
  server: process.env.AZURE_DB_SERVER,
  database: process.env.AZURE_DB_NAME,
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

app.get('/api/households', (req, res) => {
  res.json(data.households);
});

// NEW: Chatbot Endpoint
app.post('/api/chatbot', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'Query is required.' });
  }

  try {
    // Provide the household data as context for the model
    const householdDataString = JSON.stringify(data.households, null, 2);

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

// For database
import sqlite3 from "sqlite3"; // For local testing
sqlite3.verbose(); // enable verbose mode

// Connect to SQLite (replace with Azure SQL connection if needed)
const db = new sqlite3.Database("./collectionLogs.db", (err) => {
  if (err) console.error("DB connection error:", err);
  else console.log("Connected to database");
});

// API: Fetch all household logs
app.get("/api/households", (req, res) => {
  const query = `SELECT * FROM CollectionLogs ORDER BY HouseholdID`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// API: Fetch single household by ID
app.get("/api/households/:id", (req, res) => {
  const householdID = req.params.id;
  const query = `SELECT * FROM CollectionLogs WHERE HouseholdID = ?`;
  db.get(query, [householdID], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) return res.status(404).json({ error: "Household not found" });
    res.json(row);
  });
});


// should print your server
async function startServer() {
  try {
    console.log(process.env.AZURE_DB_SERVER); 
    const pool = await sql.connect(dbConfig);
    console.log('✅ Connected to Azure SQL!');

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.get('/api/households', (req, res) => {
      res.json(data.households);
    });

    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ Azure SQL connection failed:', err);
  }
}

startServer();