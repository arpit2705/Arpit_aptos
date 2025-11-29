$ErrorActionPreference = "Stop"
$zipPath = "aptos.zip"
$dest = "aptos_bin"

# Clean up
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
New-Item -ItemType Directory -Path $dest | Out-Null

# Get URL
Write-Host "Fetching URL..."
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$response = Invoke-RestMethod -Uri "https://api.github.com/repos/aptos-labs/aptos-core/releases?per_page=100"
$latest = $response | Where-Object { $_.tag_name -match 'aptos-cli-v' } | Select-Object -First 1
$version = $latest.tag_name
$cleanVersion = $version -replace 'aptos-cli-v', ''
$url = "https://github.com/aptos-labs/aptos-core/releases/download/$version/aptos-cli-$cleanVersion-Windows-x86_64.zip"

Write-Host "Downloading $url..."
try {
    Invoke-WebRequest -Uri $url -OutFile $zipPath -UseBasicParsing
}
catch {
    Write-Host "Download failed: $_"
    exit 1
}

if ((Get-Item $zipPath).Length -lt 1000000) {
    Write-Host "File too small, download likely failed."
    exit 1
}

Write-Host "Extracting..."
try {
    Expand-Archive -Path $zipPath -DestinationPath $dest -Force
}
catch {
    Write-Host "Extraction failed: $_"
    exit 1
}

if (Test-Path "$dest\aptos.exe") {
    Write-Host "Success! Binary at $PWD\$dest\aptos.exe"
    & "$dest\aptos.exe" --version
}
else {
    Write-Host "Extraction succeeded but aptos.exe not found in root of zip. Listing content:"
    Get-ChildItem $dest -Recurse
}
