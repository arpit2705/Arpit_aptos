# 🚀 START HERE - Get Your Project Running

## What Was Fixed

1. ✅ **Rate Limit Errors (429)** - Added API key support
2. ✅ **Wallet Adapter Errors** - Disabled auto-connect
3. ✅ **All code compiles successfully**

## How to Run (Step by Step)

### Option 1: Simple Start (Recommended)

1. **Open PowerShell/Terminal** in the project folder

2. **Navigate to frontend:**
   ```powershell
   cd Crowd_Chain\frontend
   ```

3. **Start the server:**
   ```powershell
   npm run dev
   ```

4. **Wait for this message:**
   ```
   ✓ Ready in X seconds
   ○ Local: http://localhost:3000
   ```

5. **Open your browser:**
   - Go to: http://localhost:3000
   - You should see the landing page!

### Option 2: If Port 3000 is Busy

```powershell
cd Crowd_Chain\frontend
$env:PORT=3001
npm run dev
```

Then open: http://localhost:3001

## Troubleshooting

### ❌ "Cannot find module" errors
**Fix:**
```powershell
cd Crowd_Chain\frontend
npm install
npm run dev
```

### ❌ Server won't start
**Fix:**
```powershell
# Kill any existing Node processes
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Clean and restart
cd Crowd_Chain\frontend
Remove-Item .next -Recurse -Force -ErrorAction SilentlyContinue
npm run dev
```

### ❌ Page shows blank/errors
**Fix:**
1. Open browser DevTools (Press F12)
2. Check the **Console** tab for errors
3. Share the error message with me

### ❌ Still seeing rate limit errors?
**Fix:**
1. Create file: `Crowd_Chain\frontend\.env.local`
2. Add this line (get key from https://geomi.dev/docs/start):
   ```
   NEXT_PUBLIC_APTOS_API_KEY=your_api_key_here
   ```
3. Restart the server

## What Should Work

✅ Landing page loads at http://localhost:3000
✅ No errors in browser console
✅ Can navigate to different pages
✅ Wallet connection works (after clicking "Connect Petra")

## If Nothing Works

**Please tell me:**
1. What error message you see (exact text)
2. What happens when you run `npm run dev`
3. What you see in the browser at http://localhost:3000
4. Any errors in browser console (F12 → Console tab)

## Quick Status Check

Run this to check if server is running:
```powershell
netstat -ano | findstr :3000
```

If you see output, the server IS running. Open http://localhost:3000 in your browser.

