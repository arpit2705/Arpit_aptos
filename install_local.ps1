$ErrorActionPreference = "Stop"
Write-Host "Fetching latest version..."
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
    $response = Invoke-RestMethod -Uri "https://api.github.com/repos/aptos-labs/aptos-core/releases?per_page=100"
    $latest = $response | Where-Object { $_.tag_name -match 'aptos-cli-v' } | Select-Object -First 1
    $version = $latest.tag_name
    $cleanVersion = $version -replace 'aptos-cli-v', ''
    Write-Host "Latest version: $version"

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
