// --- Securely load environment variables from a .env file ---
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
// Import the Supabase client
const { createClient } = require('@supabase/supabase-js');

// --- Configuration ---
const app = express();
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
// This filepath matches your project structure
app.set('views', path.join(__dirname, 'views')); 

// --- Supabase Client Initialization ---
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ SUPABASE_URL or SUPABASE_SERVICE_KEY is missing from .env file.");
    console.log("Please add them to your .env file.");
    process.exit(1);
}

// Create a single, shared Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// --- Helper Function for Timezone (IST) ---
function getTodayIST() {
    // Get the current date and time in IST timezone
    const now = new Date();
    // Use toLocaleString to get the date in IST timezone
    const istDateString = now.toLocaleString('en-CA', { 
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    // Return the date in 'YYYY-MM-DD' format
    return istDateString.split(',')[0];
}

// --- Helper Function to get current IST timestamp ---
function getCurrentISTTimestamp() {
    // Get current UTC time
    const now = new Date();
    
    // Add IST offset (+5:30 hours = 330 minutes)
    const istTime = new Date(now.getTime() + (330 * 60 * 1000));
    
    // Get IST time components
    const year = istTime.getUTCFullYear();
    const month = String(istTime.getUTCMonth() + 1).padStart(2, '0');
    const day = String(istTime.getUTCDate()).padStart(2, '0');
    const hours = String(istTime.getUTCHours()).padStart(2, '0');
    const minutes = String(istTime.getUTCMinutes()).padStart(2, '0');
    const seconds = String(istTime.getUTCSeconds()).padStart(2, '0');
    
    // Format as ISO string with correct IST offset (+05:30)
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`;
}

// --- Routes ---

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Welcome Page
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>Waste Collection Server is Running (Supabase)</h1>
            <p>Click the link below to access the scanner.</p>
            <a href="/scanner" style="font-size: 1.2em; padding: 10px 20px; background-color: #1877f2; color: white; text-decoration: none; border-radius: 5px;">
                Go to Scanner
            </a>
        </div>
    `);
});

// Scanner Page
app.get('/scanner', (req, res) => {
    // This renders your /views/scanner.ejs file
    res.render('scanner');
});

// --- API Route to get all households ---
app.get('/api/households', async (req, res) => {
    try {
        console.log("Fetching households from Supabase...");
        
        const { data: households, error } = await supabase
            .from('Households')
            .select('*');
        
        if (error) {
            console.error("Error fetching households:", error);
            throw error;
        }
        
        console.log(`Found ${households?.length || 0} households`);
        res.status(200).json(households || []);
    } catch (err) {
        console.error("Error fetching households:", err.message);
        res.status(500).json({ success: false, message: 'Error fetching households', error: err.message });
    }
});

// --- API Route to get collection logs ---
app.get('/api/collection-logs', async (req, res) => {
    try {
        console.log("Fetching collection logs from Supabase...");
        
        const { data: logs, error } = await supabase
            .from('CollectionLogs')
            .select('*')
            .order('CollectedOn', { ascending: false });
        
        if (error) {
            console.error("Error fetching collection logs:", error);
            // Return empty array instead of throwing error
            res.status(200).json([]);
            return;
        }
        
        console.log(`Found ${logs?.length || 0} collection logs`);
        res.status(200).json(logs || []);
    } catch (err) {
        console.error("Error fetching collection logs:", err.message);
        res.status(200).json([]); // Return empty array instead of error
    }
});

// --- API Route to get today's collection status ---
app.get('/api/today-collections', async (req, res) => {
    try {
        console.log("Fetching today's collections from Supabase...");
        const today_ist = getTodayIST();
        const startOfTodayIST = `${today_ist}T00:00:00+05:30`;
        const endOfTodayIST = `${today_ist}T23:59:59+05:30`;

        const { data: todayLogs, error } = await supabase
            .from('CollectionLogs')
            .select('*')
            .gte('CollectedOn', startOfTodayIST)
            .lte('CollectedOn', endOfTodayIST);
        
        if (error) {
            console.error("Error fetching today's collections:", error);
            // Return empty array instead of throwing error
            res.status(200).json([]);
            return;
        }
        
        console.log(`Found ${todayLogs?.length || 0} today's collections`);
        res.status(200).json(todayLogs || []);
    } catch (err) {
        console.error("Error fetching today's collections:", err.message);
        res.status(200).json([]); // Return empty array instead of error
    }
});

// --- API Route to manually update payment status ---
app.post('/api/update-payment', async (req, res) => {
    try {
        const { householdId, status } = req.body;
        
        if (!householdId) {
            return res.status(400).json({ success: false, message: 'Household ID is required' });
        }
        
        if (!['paid', 'unpaid'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Status must be "paid" or "unpaid"' });
        }
        
        const { error } = await supabase
            .from('Households')
            .update({ FeeStatus: status })
            .eq('HouseholdID', householdId);
        
        if (error) throw error;
        
        console.log(`✅ Manually updated payment status to '${status}' for household ${householdId}`);
        res.status(200).json({ 
            success: true, 
            message: `Payment status updated to '${status}' for household ${householdId}` 
        });
        
    } catch (err) {
        console.error("Error updating payment status:", err.message);
        res.status(500).json({ success: false, message: 'Error updating payment status', error: err.message });
    }
});

// --- API Route for GET method (backward compatibility) ---
app.get('/api/update-payment/:householdId/:status', async (req, res) => {
    try {
        const { householdId, status } = req.params;
        
        if (!['paid', 'unpaid'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Status must be "paid" or "unpaid"' });
        }
        
        const { error } = await supabase
            .from('Households')
            .update({ FeeStatus: status })
            .eq('HouseholdID', householdId);
        
        if (error) throw error;
        
        console.log(`✅ Updated payment status to '${status}' for household ${householdId}`);
        res.status(200).json({ 
            success: true, 
            message: `Payment status updated to '${status}' for household ${householdId}` 
        });
        
    } catch (err) {
        console.error("Error updating payment status:", err.message);
        res.status(500).json({ success: false, message: 'Error updating payment status', error: err.message });
    }
});

// --- API Route to refresh/sync household payment status ---
app.post('/api/sync-payments', async (req, res) => {
    try {
        console.log("Syncing payment status based on today's collections...");
        const today_ist = getTodayIST();
        const startOfTodayIST = `${today_ist}T00:00:00+05:30`;
        const endOfTodayIST = `${today_ist}T23:59:59+05:30`;

        // Get all households that were collected today
        const { data: collectedToday, error: collectedError } = await supabase
            .from('CollectionLogs')
            .select('HouseholdID')
            .eq('Status', 'collected')
            .gte('CollectedOn', startOfTodayIST)
            .lte('CollectedOn', endOfTodayIST);

        if (collectedError) throw collectedError;

        const collectedHouseholdIds = collectedToday.map(log => log.HouseholdID);

        // Update payment status: 'paid' for collected, 'unpaid' for not collected
        if (collectedHouseholdIds.length > 0) {
            // Set collected households to 'paid'
            const { error: paidError } = await supabase
                .from('Households')
                .update({ FeeStatus: 'paid' })
                .in('HouseholdID', collectedHouseholdIds);

            if (paidError) throw paidError;

            // Set non-collected households to 'unpaid'
            const { error: unpaidError } = await supabase
                .from('Households')
                .update({ FeeStatus: 'unpaid' })
                .not('HouseholdID', 'in', `(${collectedHouseholdIds.map(id => `'${id}'`).join(',')})`);

            if (unpaidError) throw unpaidError;
        }

        res.status(200).json({ 
            success: true, 
            message: `Payment status synced. ${collectedHouseholdIds.length} households marked as paid.`,
            collectedCount: collectedHouseholdIds.length
        });

    } catch (err) {
        console.error("Error syncing payment status:", err.message);
        res.status(500).json({ success: false, message: 'Error syncing payment status', error: err.message });
    }
});

// --- API Route to update collection status ---
app.get('/collect', async (req, res) => {
    const houseId = req.query.houseid;
    if (!houseId) {
        return res.status(400).json({ success: false, message: "Household ID is required." });
    }

    try {
        const today_ist = getTodayIST();
        // Define the start and end of today in IST for Supabase (Postgres)
        const startOfTodayIST = `${today_ist}T00:00:00+05:30`;
        const endOfTodayIST = `${today_ist}T23:59:59+05:30`;

        // --- Step 1: Try to UPDATE a 'pending' log for today. ---
        const { data: updateData, error: updateError, count: updateCount } = await supabase
            .from('CollectionLogs')
            .update({ 
                Status: 'collected', 
                CollectorName: 'WebApp Scanner', 
                CollectedOn: getCurrentISTTimestamp() // Set collection time to current IST
            })
            .eq('HouseholdID', houseId)
            .eq('Status', 'pending')
            .gte('CollectedOn', startOfTodayIST) // Check for logs from today (IST)
            .lte('CollectedOn', endOfTodayIST);

        if (updateError) throw updateError;

        if (updateCount > 0) {
            // SUCCESS: We updated a pending log (collection only, payment is separate)
            return res.status(200).json({ success: true, message: `Household ${houseId} marked as collected.` });
        }

        // --- Step 2: If update failed (count=0), check if it's already collected. ---
        const { data: checkData, error: checkError } = await supabase
            .from('CollectionLogs')
            .select('Status')
            .eq('HouseholdID', houseId)
            .gte('CollectedOn', startOfTodayIST)
            .lte('CollectedOn', endOfTodayIST);

        if (checkError) throw checkError;

        if (checkData && checkData.length > 0) {
            if (checkData[0].Status === 'collected') {
                // It was already collected. This is a duplicate scan.
                return res.status(200).json({ success: true, message: `Household ${houseId} has already been collected today.` });
            }
        }
        
        // --- Step 3: If no log exists for today, INSERT a new one. ---
        // This handles cases where the daily log script hasn't run or missed one.
        if (!checkData || checkData.length === 0) {
             const { error: insertError } = await supabase
                .from('CollectionLogs')
                .insert({ 
                    HouseholdID: houseId, 
                    Status: 'collected', 
                    CollectorName: 'WebApp Scanner',
                    CollectedOn: getCurrentISTTimestamp() 
                });
            
            if (insertError) throw insertError;
            
            return res.status(201).json({ success: true, message: `Collection logged for Household ${houseId}.` });
        }
        
        // Fallback for any other state
        return res.status(200).json({ success: true, message: `Scan for Household ${houseId} processed.` });

    } catch (err) {
        console.error("SUPABASE ERROR in /collect:", err.message);
        res.status(500).json({ success: false, message: 'Error updating the database.', error: err.message });
    }
});

// --- API Route for Chatbot ---
app.post('/api/chatbot', async (req, res) => {
    const { query } = req.body;
    
    if (!query) {
        return res.status(400).json({ error: 'Query is required.' });
    }

    // Check if Gemini API key is configured
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
        console.error('❌ Chatbot request failed: GEMINI_API_KEY not configured');
        return res.status(500).json({ 
            error: 'Gemini API key is not configured. Please add GEMINI_API_KEY to your Backend/.env file.' 
        });
    }

    try {
        console.log('🤖 Chatbot query received:', query);
        
        // Dynamically import the Gemini AI package
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        // Fetch real household data from Supabase
        const { data: households, error: householdsError } = await supabase
            .from('Households')
            .select('*');
        
        if (householdsError) {
            console.error('Error fetching households:', householdsError);
            throw new Error('Failed to fetch household data from database');
        }
        
        console.log(`📊 Fetched ${households?.length || 0} households from Supabase`);
        
        // Fetch collection logs for additional context
        const { data: collectionLogs, error: logsError } = await supabase
            .from('CollectionLogs')
            .select('*')
            .order('CollectedOn', { ascending: false })
            .limit(100); // Get recent 100 logs
        
        if (logsError) {
            console.warn('Warning: Could not fetch collection logs:', logsError);
        }
        
        // Prepare data context
        const householdDataString = JSON.stringify(households, null, 2);
        const logsDataString = collectionLogs ? JSON.stringify(collectionLogs, null, 2) : '[]';
        
        // Construct a detailed prompt
        const prompt = `
You are SwachaPatha Helper, an AI assistant for a rural waste management system called "SwatchSetu".
Your role is to analyze the provided household data and collection logs, then answer questions from a supervisor.
Today is ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.

Here is the complete household data from the Supabase database in JSON format:
${householdDataString}

Here are recent collection logs:
${logsDataString}

Based on this real data from the database, please answer the following question. Provide clear, concise answers with specific numbers and details. If a calculation is needed, perform it and show the result.

Question: "${query}"
`;

        console.log('🔄 Sending request to Gemini API...');
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('✅ Gemini API response received');
        res.json({ reply: text });

    } catch (error) {
        console.error('❌ Error with chatbot:', error.message);
        console.error('Full error:', error);
        
        let errorMessage = 'Failed to get a response from the AI model.';
        
        if (error.message.includes('API key') || error.message.includes('API_KEY')) {
            errorMessage = 'Invalid Gemini API key. Please check your API key in the Backend/.env file.';
        } else if (error.message.includes('database') || error.message.includes('Supabase')) {
            errorMessage = 'Failed to fetch data from database. Please check your Supabase connection.';
        } else if (error.message.includes('Cannot find package')) {
            errorMessage = 'Gemini AI package not installed. Please run: npm install @google/generative-ai';
        }
        
        res.status(500).json({ 
            error: errorMessage,
            details: error.message 
        });
    }
});

// Function to add daily pending logs for all households if they don't exist
async function addDailyPendingLogs() {
  try {
    const today_ist = getTodayIST();
    const startOfTodayIST = `${today_ist}T00:00:00+05:30`;
    const endOfTodayIST = `${today_ist}T23:59:59+05:30`;

    console.log(`Checking for and adding daily pending logs for ${today_ist}...`);

    // 1. Get all households (use quotes to match table casing)
    const { data: households, error: householdsError } = await supabase
        .from('Households')
        .select('"HouseholdID"'); 
    
    if (householdsError) throw householdsError;
    if (!households || households.length === 0) {
        console.log("No households found in database. Skipping log generation.");
        return;
    }

    // 2. Find which households *already* have a log for today
    const { data: existingLogs, error: logsError } = await supabase
        .from('CollectionLogs')
        .select('"HouseholdID"')
        .gte('CollectedOn', startOfTodayIST)
        .lte('CollectedOn', endOfTodayIST);

    if (logsError) throw logsError;

    const loggedHouseholdIds = new Set(existingLogs.map(log => log.HouseholdID));

    // 3. Find which households are *missing* a log for today
    const householdsToInsert = households
        .filter(h => !loggedHouseholdIds.has(h.HouseholdID))
        .map(h => ({
            HouseholdID: h.HouseholdID,
            Status: 'pending',
            CollectedOn: getCurrentISTTimestamp() // Set to current IST time
        }));

    // 4. Insert the missing logs (payment status is managed separately)
    if (householdsToInsert.length > 0) {
        // Insert new collection logs
        const { error: insertError } = await supabase
            .from('CollectionLogs')
            .insert(householdsToInsert);
        
        if (insertError) throw insertError;
        
        console.log(`✅ Inserted ${householdsToInsert.length} new 'pending' logs for today.`);
    } else {
        console.log(`✅ Daily 'pending' logs for ${today_ist} are already present.`);
    }
  } catch (err) {
    console.error("❌ Error adding daily pending logs:", err.message);
  }
}

// --- Start Server ---
const startServer = async () => {
    // Check Supabase connection by fetching one household
    // Use quotes to match the case-sensitive table name
    const { data, error } = await supabase.from('Households').select('"HouseholdID"').limit(1);
    if(error) {
         console.error("❌ Failed to connect to Supabase. Check .env file and network.", error.message);
         process.exit(1);
    }
    console.log("✅ Supabase connection established.");

    // Run the log generation function on server start
    await addDailyPendingLogs(); 

    // Use the port from environment variables (for deployment) or 5001 (for local)
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT} with Supabase`);
        console.log(`👉 Access the scanner at http://localhost:${PORT}/scanner`);
    });
};

startServer();