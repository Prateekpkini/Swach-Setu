// Server/server.js

import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
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

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies

app.get("/api/households", (req, res) => {
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log("Using static data from data.js");
});