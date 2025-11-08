# Payment System Guide - SwatchaSetu

## Overview

The payment system is now **completely separate** from the collection system:
- **Collection Status**: Tracked via QR code scanning (pending → collected)
- **Payment Status**: Managed manually in the office (unpaid → paid)

## System Architecture

### Two Independent Processes:

```
┌─────────────────────────────────────────────────────────────┐
│                    COLLECTION PROCESS                        │
│  (Field Work - Waste Collectors with QR Scanner)            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    Scan QR Code
                            │
                            ▼
              Update CollectionLogs Table
              Status: pending → collected
                            │
                            ▼
                  (Payment NOT affected)


┌─────────────────────────────────────────────────────────────┐
│                     PAYMENT PROCESS                          │
│  (Office Work - Manual Payment Collection)                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
            Household comes to office
                            │
                            ▼
              Office staff clicks
              "Mark as Paid" button
                            │
                            ▼
              Update Households Table
              FeeStatus: unpaid → paid
                            │
                            ▼
              (Collection status NOT affected)
```

## Database Schema

### Households Table
```
HouseholdID          (text, primary key)    - e.g., "H001"
HeadOfHousehold      (text)                 - e.g., "Household_1"
FeeStatus            (text)                 - "paid" or "unpaid"
WasteTypePreference  (text)                 - "mixed", "dry", "wet"
CollectionFrequency  (text)                 - "daily", "weekly", "alternate"
Latitude             (decimal)
Longitude            (decimal)
```

### CollectionLogs Table
```
LogID                (auto-increment, primary key)
HouseholdID          (text, foreign key)
Status               (text)                 - "pending" or "collected"
CollectorName        (text)
CollectedOn          (timestamp)
```

## API Endpoints

### Backend (Port 5001)

#### 1. Get All Households
```http
GET http://localhost:5001/api/households
```
Returns all households with their payment status (FeeStatus field).

#### 2. QR Code Scan (Collection Only)
```http
GET http://localhost:5001/collect?houseid=H001
```
Updates ONLY the collection status, NOT payment status.

Response:
```json
{
  "success": true,
  "message": "Household H001 marked as collected."
}
```

#### 3. Manual Payment Update (POST)
```http
POST http://localhost:5001/api/update-payment
Content-Type: application/json

{
  "householdId": "H001",
  "status": "paid"
}
```

Response:
```json
{
  "success": true,
  "message": "Payment status updated to 'paid' for household H001"
}
```

#### 4. Manual Payment Update (GET - for testing)
```http
GET http://localhost:5001/api/update-payment/H001/paid
GET http://localhost:5001/api/update-payment/H001/unpaid
```

### Frontend API (Port 3001)

All endpoints proxy to backend with same paths:
- `GET /api/households`
- `POST /api/update-payment`
- `GET /api/collection-logs`
- `GET /api/today-collections`

## Frontend Components

### 1. Dashboard (Main View)
**Location**: `Frontend/src/components/Dashboard.js`

**Features**:
- Payment Rate card: Shows percentage of households that have paid
- Today's Collections card: Shows collection progress
- Handles both Supabase (PascalCase) and static (snake_case) field names

**Field Compatibility**:
```javascript
// Works with both:
household.FeeStatus    // Supabase format
household.fee_status   // Static format
```

### 2. Household List
**Location**: `Frontend/src/components/HouseholdList.js`

**Features**:
- Displays all households in a table
- Shows payment status with color-coded badges:
  - 🟢 Green = paid
  - 🔴 Red = unpaid
- Field name compatibility built-in

### 3. Payment Tracker
**Location**: `Frontend/src/components/Payments/PaymentTracker.js`

**Features**:
- Filter households by payment status (All/Paid/Unpaid)
- **"Mark as Paid" button** for unpaid households
- Automatically refreshes data after payment update
- Shows loading state while updating
- Field name compatibility for Supabase data

**Key Functions**:
```javascript
// Mark household as paid
const markAsPaid = async (householdId) => {
  await ApiService.updatePaymentStatus(householdId, 'paid');
  await onRefresh(); // Refresh dashboard
};
```

## Field Name Compatibility

The system handles both naming conventions:

| Supabase (PascalCase) | Static (snake_case) |
|----------------------|---------------------|
| HouseholdID          | household_id        |
| HeadOfHousehold      | head_of_household   |
| FeeStatus            | fee_status          |
| WasteTypePreference  | waste_type_preference |
| CollectionFrequency  | collection_frequency |

**Helper Function** (used in all components):
```javascript
const getFieldValue = (household, field) => {
  return household[field] || 
         household[field.toLowerCase()] || 
         household[field.charAt(0).toUpperCase() + field.slice(1)] ||
         household[field.split('_').map(word => 
           word.charAt(0).toUpperCase() + word.slice(1)
         ).join('')];
};
```

## Usage Workflow

### Daily Operations

#### Morning (Field Collection):
1. Collectors go to households with mobile devices
2. Open QR scanner: `http://localhost:5001/scanner`
3. Scan QR codes at each household
4. System marks collection as "collected"
5. Payment status remains unchanged

#### Office (Payment Collection):
1. Household owner comes to office to pay fee
2. Office staff opens dashboard: `http://localhost:3002`
3. Navigate to "Payments" tab
4. Find the household in the list
5. Click "Mark as Paid" button
6. System updates payment status to "paid"
7. Dashboard automatically refreshes

### Example Scenario:

**Household H001**:
- Morning: Collector scans QR → CollectionLogs.Status = "collected"
- Afternoon: Owner pays at office → Households.FeeStatus = "paid"

**Household H002**:
- Morning: Collector scans QR → CollectionLogs.Status = "collected"
- Afternoon: Owner doesn't come → Households.FeeStatus = "unpaid"

**Dashboard shows**:
- Today's Collections: 100% (both collected)
- Payment Rate: 50% (only H001 paid)

## Testing Instructions

### 1. Start Servers
```bash
start-servers.bat
```

### 2. Test Collection (QR Scan)
```bash
# Open in browser
http://localhost:5001/collect?houseid=H001
```

Expected: Collection status updated, payment status unchanged.

### 3. Test Payment Update
1. Open dashboard: `http://localhost:3002`
2. Go to "Payments" tab
3. Find H001 in the list (should show "unpaid")
4. Click "Mark as Paid" button
5. Status should change to "paid" (green badge)

### 4. Verify Dashboard
1. Go to "Dashboard" tab
2. Check Payment Rate card
3. Should show correct percentage of paid households

### 5. Test Filtering
1. In "Payments" tab, click filter buttons:
   - "All" - shows all households
   - "Paid" - shows only paid households
   - "Unpaid" - shows only unpaid households

## Troubleshooting

### Payment status not showing in frontend?

**Check field names in Supabase**:
1. Open Supabase dashboard
2. Go to Table Editor → Households
3. Verify column name is exactly: `FeeStatus` (PascalCase)

**If column name is different**:
- The helper function should handle it automatically
- Check browser console for errors

### "Mark as Paid" button not working?

**Check console logs**:
```javascript
// Browser console (F12)
// Should see: "✅ Payment status updated to 'paid' for household H001"

// Backend console
// Should see: "✅ Manually updated payment status to 'paid' for household H001"
```

**Verify API connection**:
```bash
# Test direct API call
curl -X POST http://localhost:3001/api/update-payment \
  -H "Content-Type: application/json" \
  -d '{"householdId":"H001","status":"paid"}'
```

### Payment status not persisting?

**Check Supabase permissions**:
- Ensure service key has UPDATE permissions on Households table
- Verify FeeStatus column is not read-only

### Dashboard showing 0% payment rate?

**Possible causes**:
1. All households are actually unpaid (correct behavior)
2. Field name mismatch (check helper function)
3. Data not loading (check API response)

**Debug steps**:
```javascript
// In browser console
console.log(households[0]); // Check field names
console.log(households[0].FeeStatus); // Should show "paid" or "unpaid"
```

## Key Differences from Previous Version

| Aspect | Previous (Incorrect) | Current (Correct) |
|--------|---------------------|-------------------|
| QR Scan | Updated both collection AND payment | Updates ONLY collection |
| Payment | Automatic on scan | Manual via button |
| Daily Reset | Payment reset to unpaid daily | Payment persists (no reset) |
| Independence | Collection tied to payment | Completely separate |

## Benefits of Current System

✅ **Accurate Tracking**: Payment status reflects actual payment, not just collection
✅ **Flexibility**: Households can pay before or after collection
✅ **Accountability**: Clear record of who paid vs who was collected
✅ **Reporting**: Separate metrics for collection rate vs payment rate
✅ **Manual Control**: Office staff has full control over payment status

## Future Enhancements

Potential improvements:
1. Payment history tracking (date, amount, method)
2. Partial payment support
3. Payment reminders for unpaid households
4. Receipt generation
5. Payment method tracking (cash, online, etc.)
6. Bulk payment updates
7. Payment reports and analytics
