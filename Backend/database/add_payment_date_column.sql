-- Add PaymentDate column to Households table if it doesn't exist
-- Run this in your Supabase SQL Editor

-- Check if the column exists and add it if it doesn't
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'Households' 
        AND column_name = 'PaymentDate'
    ) THEN
        ALTER TABLE "Households" 
        ADD COLUMN "PaymentDate" TIMESTAMPTZ;
        
        RAISE NOTICE 'PaymentDate column added successfully';
    ELSE
        RAISE NOTICE 'PaymentDate column already exists';
    END IF;
END $$;

-- Optional: Update existing paid households with a default payment date
-- Uncomment the lines below if you want to set a default date for existing paid households
-- UPDATE "Households" 
-- SET "PaymentDate" = NOW() 
-- WHERE "FeeStatus" = 'paid' AND "PaymentDate" IS NULL;
