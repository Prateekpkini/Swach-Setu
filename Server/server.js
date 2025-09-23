// Server/server.js

const express = require('express'); 
const cors = require('cors'); 
const data = require('./data'); 
const sql = require('mssql')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Load environment variables const sql = require('mssql');
console.log('DB SERVER:', process.env.AZURE_DB_SERVER);  // should print server name
console.log('DB NAME:', process.env.AZURE_DB_NAME);

const { GoogleGenerativeAI } = require('@google/generative-ai');


// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// New, updated line
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

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

// -------------------- QR Scan API --------------------
app.post("/api/collect", async (req, res) => {
  const { householdId, collectorName } = req.body; // decoded from QR
  if (!householdId) return res.status(400).json({ error: "Household ID required" });

  try {
    const pool = await sql.connect(dbConfig);
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // Update today's log to Collected
    const result = await pool.request()
      .input("householdId", sql.NVarChar, householdId)
      .input("status", sql.NVarChar, "Collected")
      .input("collectorName", sql.NVarChar, collectorName || null)
      .input("today", sql.NVarChar, today)
      .query(`
        UPDATE CollectionLogs
        SET Status=@status, CollectorName=@collectorName
        WHERE HouseholdID=@householdId
          AND CAST(CollectedOn AS DATE) = CAST(GETDATE() AS DATE)
      `);

    // If no log existed for today (shouldn’t happen because of daily insertion), insert one
    if (result.rowsAffected[0] === 0) {
      await pool.request()
        .input("householdId", sql.NVarChar, householdId)
        .input("status", sql.NVarChar, "Collected")
        .input("collectorName", sql.NVarChar, collectorName || null)
        .query(`
          INSERT INTO CollectionLogs (HouseholdID, CollectedOn, CollectorName, Status)
          VALUES (@householdId, GETDATE(), @collectorName, @status)
        `);
    }

    res.json({ success: true, message: "Household marked as Collected", householdId });
    await pool.close();

  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).json({ error: "Database error" });
  }
});

async function addDailyPendingLogs() {
  try {
    const pool = await sql.connect(dbConfig);

    // Today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);

    // Insert households that do NOT already have a log for today
    await pool.request()
      .input("today", sql.NVarChar, today)
      .query(`
        INSERT INTO CollectionLogs (HouseholdID, CollectedOn, Status)
        SELECT h.HouseholdID, GETDATE(), 'Pending'
        FROM Households h
        WHERE NOT EXISTS (
          SELECT 1 
          FROM CollectionLogs c
          WHERE c.HouseholdID = h.HouseholdID
            AND CAST(c.CollectedOn AS DATE) = @today
        )
      `);

    console.log("✅ Daily Pending Logs added for today:", today);
    await pool.close();
  } catch (err) {
    console.error("❌ Error adding daily pending logs:", err);
  }
}


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
     // Add today's pending logs
    await addDailyPendingLogs();

  } catch (err) {
    console.error('❌ Azure SQL connection failed:', err);
  }
}

startServer();