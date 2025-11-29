$env:PATH += ";$PSScriptRoot\aptos_bin"
Write-Host "Added .aptoscli\bin to PATH"
try {
    aptos --version
    Write-Host "Aptos CLI is now available!"
}
catch {
    Write-Host "Aptos CLI still not found. Please restart your terminal."
}
