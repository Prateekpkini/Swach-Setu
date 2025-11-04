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
    // Get the current date and time
    const now = new Date();
    // Create a new Date object formatted for 'Asia/Kolkata' (IST)
    // We are in Amtady, which is UTC+5:30
    const istDate = new Date(now.getTime() + (330 * 60 * 1000));
    // Return the date in 'YYYY-MM-DD' format
    return istDate.toISOString().slice(0, 10);
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
                CollectedOn: new Date().toISOString() // Set collection time to now
            })
            .eq('HouseholdID', houseId)
            .eq('Status', 'pending')
            .gte('CollectedOn', startOfTodayIST) // Check for logs from today (IST)
            .lte('CollectedOn', endOfTodayIST);

        if (updateError) throw updateError;

        if (updateCount > 0) {
            // SUCCESS: We updated a pending log.
            return res.status(200).json({ success: true, message: `Household ${houseId} status updated to 'collected'.` });
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
                    CollectedOn: new Date().toISOString() 
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
            CollectedOn: startOfTodayIST // Set to start of the day
        }));

    // 4. Insert the missing logs
    if (householdsToInsert.length > 0) {
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