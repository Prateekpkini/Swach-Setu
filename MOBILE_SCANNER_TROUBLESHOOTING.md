# Mobile Scanner Troubleshooting Guide

## Problem
Scanner shows white/blank screen on mobile but works on laptop.

## Common Causes & Solutions

### 1. HTTPS Requirement ⚠️
**Most Common Issue**: Mobile browsers require HTTPS to access the camera.

**Solution:**
- Ngrok provides HTTPS by default
- Make sure you're using the `https://` URL, not `http://`
- Example: `https://abc123.ngrok.io/scanner` ✅ (not `http://abc123.ngrok.io/scanner` ❌)

### 2. Camera Permission Denied 📷

**On Android Chrome:**
1. Tap the lock icon or "i" icon in the address bar
2. Find "Camera" permission
3. Change to "Allow"
4. Refresh the page

**On iOS Safari:**
1. Go to Settings → Safari → Camera
2. Set to "Ask" or "Allow"
3. Go back to the scanner page and refresh
4. When prompted, tap "Allow"

### 3. Browser Compatibility 🌐

**Recommended Browsers:**
- ✅ Chrome (Android)
- ✅ Safari (iOS)
- ✅ Firefox (Android)
- ❌ Instagram/Facebook in-app browser (use regular browser instead)

### 4. Check Ngrok Configuration

**Verify your ngrok command:**
```bash
ngrok http 5001
```

**Use the HTTPS URL from ngrok output:**
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:5001
            ^^^^^ Use this HTTPS URL
```

### 5. Test the Scanner

**Updated scanner now shows helpful error messages:**
- "HTTPS Required" - Use the https:// URL
- "Camera Access Denied" - Check browser permissions
- "Camera API not supported" - Try a different browser

## Testing Steps

1. **Start your backend:**
   ```bash
   cd Backend
   npm start
   ```

2. **Start ngrok:**
   ```bash
   ngrok http 5001
   ```

3. **Copy the HTTPS URL** (e.g., `https://abc123.ngrok-free.app`)

4. **On mobile, visit:**
   ```
   https://abc123.ngrok-free.app/scanner
   ```

5. **Grant camera permission** when prompted

6. **Point camera at QR code**

## What Changed

The scanner now includes:
- ✅ Better mobile support with responsive design
- ✅ HTTPS detection and warning
- ✅ Camera permission checking
- ✅ Detailed error messages
- ✅ Loading states
- ✅ Better error handling

## Still Not Working?

**Check browser console:**
1. On mobile Chrome: Menu → More Tools → Remote Devices (from desktop)
2. Look for error messages
3. Check if camera permission was granted

**Common Error Messages:**
- "NotAllowedError" → Camera permission denied
- "NotFoundError" → No camera available
- "NotReadableError" → Camera is being used by another app
- "OverconstrainedError" → Camera doesn't support the requested settings

## Quick Checklist

- [ ] Using HTTPS URL from ngrok
- [ ] Camera permission granted in browser
- [ ] Using Chrome or Safari (not in-app browser)
- [ ] No other app is using the camera
- [ ] Backend server is running
- [ ] Ngrok tunnel is active
