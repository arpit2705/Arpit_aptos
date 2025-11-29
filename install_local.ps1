$ErrorActionPreference = "Stop"
Write-Host "Fetching latest version..."
try {
    # Hardcoded version to avoid API rate limits
    $version = "aptos-cli-v7.11.1"
    $cleanVersion = "7.11.1"
    Write-Host "Using hardcoded version: $version"

    $url = "https://github.com/aptos-labs/aptos-core/releases/download/$version/aptos-cli-$cleanVersion-Windows-x86_64.zip"
    $zipPath = "aptos.zip"
    $dest = "aptos_bin"

    Write-Host "Downloading from $url..."
    Invoke-WebRequest -Uri $url -OutFile $zipPath

    if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
    New-Item -ItemType Directory -Path $dest | Out-Null

    Write-Host "Extracting..."
    Expand-Archive -Path $zipPath -DestinationPath $dest -Force
    Remove-Item $zipPath

    Write-Host "Success! Aptos CLI is at $PWD\$dest\aptos.exe"
    & "$dest\aptos.exe" --version
}
catch {
    Write-Host "Error: $_"
    exit 1
}
