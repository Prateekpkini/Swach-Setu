# Database Setup for Payment Date Feature

## Issue
The Payment Date & Time column was not displaying dates when clicking "Mark as Paid" because the `PaymentDate` column was missing from the database.

## Solution

### Step 1: Add the PaymentDate Column to Supabase

1. Go to your Supabase Dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `add_payment_date_column.sql`
4. Click "Run" to execute the SQL

This will add a `PaymentDate` column to your `Households` table if it doesn't already exist.

### Step 2: Restart Your Backend Server

After adding the column, restart your backend server:

```bash
cd Backend
npm start
```

Or if using the batch file from the root:
```bash
start-servers.bat
```

## What Changed

The backend now automatically sets the `PaymentDate` field to the current IST timestamp when you click "Mark as Paid". When you mark a household as "unpaid", it clears the payment date.

## Testing

1. Go to the Payments page in your frontend
2. Click "Mark as Paid" on any unpaid household
3. The "Payment Date & Time" column should now display the current date and time in IST format
4. Example format: "04 Dec 2024, 02:30 PM"
