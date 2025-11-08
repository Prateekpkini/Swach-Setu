# Quick Reference - Payment System

## 🎯 Core Concept
**Collection ≠ Payment** (They are completely separate!)

## 🔄 Two Independent Processes

### 1️⃣ Collection (Field Work)
- **Who**: Waste collectors
- **Where**: At households
- **How**: Scan QR code
- **Updates**: CollectionLogs.Status
- **Does NOT affect**: Payment status

### 2️⃣ Payment (Office Work)
- **Who**: Office staff
- **Where**: In office
- **How**: Click "Mark as Paid" button
- **Updates**: Households.FeeStatus
- **Does NOT affect**: Collection status

## 📊 Dashboard Metrics

| Metric | What It Shows |
|--------|---------------|
| Today's Collections | % of households where waste was collected |
| Payment Rate | % of households that have paid fees |

These can be different! Example:
- Collections: 100% (all waste collected)
- Payment: 60% (only 60 households paid)

## 🖥️ Frontend Components

### Dashboard Tab
- Overview cards with statistics
- Payment rate and collection rate

### Households Tab
- List of all households
- Color-coded payment badges

### Payments Tab
- **Filter buttons**: All / Paid / Unpaid
- **"Mark as Paid" button**: Updates payment status
- Auto-refreshes after update

## 🔧 API Endpoints

### Collection (QR Scan)
```
GET /collect?houseid=H001
→ Updates collection status only
```

### Payment (Manual)
```
POST /api/update-payment
Body: { "householdId": "H001", "status": "paid" }
→ Updates payment status only
```

## 🎨 Visual Indicators

| Status | Badge Color | Meaning |
|--------|-------------|---------|
| paid | 🟢 Green | Fees paid |
| unpaid | 🔴 Red | Fees not paid |

## 🧪 Quick Test

1. Start: `start-servers.bat`
2. Open: `http://localhost:3002`
3. Go to: Payments tab
4. Click: "Mark as Paid" for any household
5. See: Status changes to green ✅

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Button not working | Check browser console (F12) |
| Status not showing | Verify field names in Supabase |
| Changes not visible | Click refresh button |

## 📝 Field Names

Works with both formats automatically:
- Supabase: `FeeStatus`, `HouseholdID`
- Static: `fee_status`, `household_id`

## ✅ What Changed

- ❌ Removed: Auto payment update on QR scan
- ✅ Added: Manual payment button
- ✅ Added: Field name compatibility
- ✅ Added: Auto-refresh after update
- ❌ Removed: Daily payment reset

## 🚀 URLs

- Dashboard: http://localhost:3002
- QR Scanner: http://localhost:5001/scanner
- Backend API: http://localhost:5001
- Frontend API: http://localhost:3001
