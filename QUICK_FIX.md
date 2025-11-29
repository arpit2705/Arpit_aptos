# Quick Fix Guide - "Nothing is Working"

## If the Server Won't Start or Show Errors

### Step 1: Kill All Node Processes
```powershell
Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Step 2: Clean and Restart
```powershell
cd Crowd_Chain\frontend
Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
npm run dev
```

### Step 3: Open in Browser
- Go to: http://localhost:3000
- Check browser console (F12) for errors

## Common Issues & Solutions

### Issue 1: Page Shows Blank or Errors
**Solution:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab - is localhost:3000 responding?

### Issue 2: Rate Limit Errors (429)
**Solution:**
1. Create `frontend/.env.local` file
2. Add: `NEXT_PUBLIC_APTOS_API_KEY=your_key_here`
3. Get key from: https://geomi.dev/docs/start
4. Restart server

### Issue 3: Wallet Connection Errors
**Solution:**
- Install Petra Wallet extension in your browser
- The wallet will NOT auto-connect (by design)
- Click "Connect Petra" button to connect

### Issue 4: Server Won't Start
**Solution:**
```powershell
cd Crowd_Chain\frontend
npm install
npm run dev
```

### Issue 5: Port 3000 Already in Use
**Solution:**
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill that process (replace PID with actual process ID)
Stop-Process -Id <PID> -Force

# Or let Next.js use a different port
$env:PORT=3001; npm run dev
```

## Verify Everything Works

1. **Server Status:**
   - Open: http://localhost:3000
   - Should see the landing page with "Citizen" and "Government" cards

2. **No Console Errors:**
   - Press F12 in browser
   - Check Console tab - should be empty or only warnings

3. **Network Requests:**
   - Check Network tab in DevTools
   - API calls should succeed (not 429 errors)

## Still Not Working?

Please provide:
1. What error message you see (exact text)
2. Browser console errors (screenshot or copy-paste)
3. What happens when you visit http://localhost:3000

