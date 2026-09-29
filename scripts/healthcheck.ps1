param(
    [string]$Url = '',
    [int]$Attempts = 5,
    [int]$DelaySeconds = 2
)

if (-not $Url) {
    $port = if ($env:APP_PORT) { $env:APP_PORT } else { '0001' }
    $Url = "http://localhost:$port/health"
}

for ($attempt = 1; $attempt -le $Attempts; $attempt++) {
    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200) {
            Write-Output "Healthy: $Url"
            exit 0
        }
    } catch {
        Write-Warning "Health check attempt $attempt/$Attempts failed: $Url"
    }
    if ($attempt -lt $Attempts) { Start-Sleep -Seconds $DelaySeconds }
}

Write-Error "Unhealthy: $Url"
exit 1