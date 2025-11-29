# Start Server Script
Write-Host "=== CrowdFix Server Starter ===" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "frontend\package.json")) {
    Write-Host "Error: Please run this script from the Crowd_Chain folder" -ForegroundColor Red
    Write-Host "Current directory: $(Get-Location)" -ForegroundColor Yellow
    exit 1
}

# Kill existing servers
Write-Host "Checking for existing servers..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "Stopping existing Node processes..." -ForegroundColor Yellow
    $nodeProcesses | Stop-Process -Force
    Start-Sleep -Seconds 2
}

# Navigate to frontend
Set-Location frontend

# Check dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Clean build
if (Test-Path ".next") {
    Write-Host "Cleaning previous build..." -ForegroundColor Yellow
    Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
}

# Start server
Write-Host ""
Write-Host "=== Starting Development Server ===" -ForegroundColor Green
Write-Host "Server will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev

