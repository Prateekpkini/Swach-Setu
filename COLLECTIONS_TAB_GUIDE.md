# Collections Tab - User Guide

## Overview

The new **Collections** tab provides a comprehensive view of today's waste collection status for all households.

## Features

### 📊 Statistics Cards
At the top of the page, you'll see three summary cards:
- **Total Households**: Total number of registered households
- **Collected**: Number of households where waste has been collected today
- **Pending**: Number of households still waiting for collection

### 🔍 Filter Options
Three filter buttons allow you to view specific subsets:
- **All**: Shows all households (default)
- **Collected**: Shows only households that have been collected today
- **Pending**: Shows only households waiting for collection

### 📋 Collection Status Table

The table displays the following information for each household:

| Column | Description |
|--------|-------------|
| **ID** | Household identifier (e.g., H001) |
| **Head of Household** | Name of the household head |
| **Collection Status** | Visual badge showing collected (✓ green) or pending (⏳ orange) |
| **Collected Time** | Time when waste was collected (IST format) |
| **Collector** | Name of the person who collected the waste |
| **Frequency** | Collection frequency (daily, weekly, alternate) |

## Visual Indicators

### Status Badges
- **✓ Collected** (Green badge): Waste has been collected from this household today
- **⏳ Pending** (Orange badge): Waste collection is still pending for this household

### Color Coding
- Green = Completed collection
- Orange = Pending collection
- Alternating row colors for better readability

## How It Works

### Data Source
The Collections tab combines data from two sources:
1. **Households Table**: Basic household information
2. **CollectionLogs Table**: Today's collection status

### Real-time Updates
- Data is fetched when you open the dashboard
- Click the "🔄 Refresh Data" button on the Dashboard tab to update
- Collection status updates automatically when QR codes are scanned

### Time Display
- Times are shown in IST (Indian Standard Time)
- Format: HH:MM AM/PM
- Shows "-" if collection hasn't occurred yet

## Usage Scenarios

### Morning (Before Collection)
```
Statistics:
- Total: 100
- Collected: 0
- Pending: 100

All households show: ⏳ Pending
```

### During Collection (10 AM)
```
Statistics:
- Total: 100
- Collected: 45
- Pending: 55

Filter by "Collected" to see which households are done
Filter by "Pending" to see which ones still need collection
```

### End of Day (5 PM)
```
Statistics:
- Total: 100
- Collected: 98
- Pending: 2

Filter by "Pending" to identify households that were missed
```

## Workflow Integration

### For Supervisors
1. Open dashboard in the morning
2. Go to Collections tab
3. Monitor collection progress throughout the day
4. Use filters to identify pending households
5. Follow up with collectors for pending collections

### For Collectors
1. Scan QR codes at each household
2. Supervisor can track progress in real-time
3. Pending households are clearly visible
4. Collection time is recorded automatically

## Comparison with Other Tabs

| Tab | Purpose | Shows |
|-----|---------|-------|
| **Dashboard** | Overview | Summary statistics and charts |
| **Households** | Management | All household details (static info) |
| **Collections** | Today's Status | Real-time collection progress |
| **Payments** | Finance | Payment status (independent of collection) |

## Key Differences: Collections vs Payments

### Collections Tab
- Shows **today's** waste collection status
- Updates when QR codes are scanned
- Resets daily (new pending logs each day)
- Tracks: Who collected, when, and from where

### Payments Tab
- Shows **fee payment** status
- Updates when "Mark as Paid" button is clicked
- Persists across days (no daily reset)
- Tracks: Who paid and who hasn't

**Important**: A household can be:
- ✅ Collected but ❌ Unpaid (waste collected, fee not paid)
- ❌ Not Collected but ✅ Paid (fee paid in advance)
- ✅ Collected and ✅ Paid (both done)
- ❌ Not Collected and ❌ Unpaid (neither done)

## Navigation

### Access the Collections Tab
1. Open dashboard: `http://localhost:3002`
2. Click the **Collections** icon in the navigation bar
3. View today's collection status

### Navigation Bar Layout
```
[Dashboard] [Households] [Map] [Collections] [Payments]
```

## Tips & Best Practices

### For Efficient Monitoring
1. **Start of Day**: Check total pending count
2. **Mid-Day**: Filter by "Pending" to see remaining households
3. **End of Day**: Verify all collections are complete
4. **Follow-up**: Use pending list to contact missed households

### For Reporting
1. Take note of collection rate percentage
2. Identify patterns (which areas are collected first/last)
3. Track collector performance (who collected how many)
4. Monitor time efficiency (collection times)

### For Troubleshooting
- If a household shows "Pending" but was collected:
  - Check if QR code was scanned properly
  - Verify household ID matches
  - Refresh the dashboard
  
- If collection time shows "-":
  - Collection hasn't occurred yet
  - Or QR code wasn't scanned

## Technical Details

### Field Compatibility
The component automatically handles both naming conventions:
- Supabase format: `HouseholdID`, `Status`, `CollectedOn`
- Static format: `household_id`, `status`, `collected_on`

### Data Refresh
- Automatic on page load
- Manual via Dashboard refresh button
- Updates reflect immediately after QR scan

### Performance
- Efficient data merging (households + collection logs)
- Client-side filtering (fast response)
- Optimized rendering for large datasets

## Example Use Case

**Scenario**: Supervisor monitoring morning collection

**8:00 AM** - Opens Collections tab
- Sees 100 pending households
- Notes that collection should start soon

**10:00 AM** - Checks progress
- Filters by "Collected": 35 households done
- Filters by "Pending": 65 households remaining
- Identifies which areas are complete

**12:00 PM** - Mid-day review
- 70 collected, 30 pending
- Notices some high-priority households still pending
- Contacts collectors to prioritize those areas

**5:00 PM** - End of day
- 98 collected, 2 pending
- Filters by "Pending" to see which 2 households were missed
- Plans follow-up for next day

## Benefits

✅ **Real-time Visibility**: See collection progress as it happens
✅ **Easy Filtering**: Quickly find collected or pending households
✅ **Time Tracking**: Know exactly when each collection occurred
✅ **Accountability**: Track which collector handled each household
✅ **Efficiency**: Identify bottlenecks and optimize routes
✅ **Reporting**: Generate daily collection reports easily

## Future Enhancements

Potential improvements:
- Export collection data to CSV/Excel
- Collection route optimization
- Collector performance analytics
- Historical collection trends
- SMS/Email notifications for pending collections
- Map view integration showing collection progress
