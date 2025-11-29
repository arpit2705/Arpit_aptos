$path = "$PSScriptRoot\aptos_bin\aptos.exe"
if (Test-Path $path) {
    Write-Output "Found at $path"
    try {
        & $path --version
    }
    catch {
        Write-Output "Error running aptos: $_"
    }
}
else {
    Write-Output "Not found at $path"
    $path2 = "$env:USERPROFILE\.aptos\bin\aptos.exe"
    if (Test-Path $path2) {
        Write-Output "Found at $path2"
    }
    else {
        Write-Output "Not found at $path2"
    }
}
