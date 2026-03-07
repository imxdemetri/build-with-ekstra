param(
    [string]$ComposeFile = "deploy/docker/docker-compose.yml",
    [string]$Image = "ghcr.io/imxdemetri/ekstra-runtime",
    [string]$Tag = "latest",
    [string]$LocalBuildRepo = "",
    [int]$TimeoutSeconds = 90,
    [switch]$KeepRunning
)

$ErrorActionPreference = "Stop"

function Test-TcpPort {
    param(
        [string]$TargetHost,
        [int]$Port
    )
    $client = New-Object System.Net.Sockets.TcpClient
    try {
        $async = $client.BeginConnect($TargetHost, $Port, $null, $null)
        $connected = $async.AsyncWaitHandle.WaitOne(1000)
        if (-not $connected) {
            return $false
        }
        $client.EndConnect($async) | Out-Null
        return $true
    } catch {
        return $false
    } finally {
        $client.Dispose()
    }
}

function Wait-Until {
    param(
        [scriptblock]$Condition,
        [string]$Description,
        [int]$TimeoutSeconds
    )
    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    while ((Get-Date) -lt $deadline) {
        if (& $Condition) {
            return
        }
        Start-Sleep -Seconds 2
    }
    throw "Timed out waiting for $Description"
}

$previousImage = $env:EKSTRA_IMAGE
$previousTag = $env:EKSTRA_TAG

try {
    if ($LocalBuildRepo) {
        if (-not $PSBoundParameters.ContainsKey("Image")) {
            $Image = "ekstra-runtime-local"
        }
        Write-Host "Building local runtime image $Image`:$Tag from $LocalBuildRepo"
        docker build -t "$Image`:$Tag" $LocalBuildRepo
    }

    $env:EKSTRA_IMAGE = $Image
    $env:EKSTRA_TAG = $Tag

    Write-Host "Using runtime image $Image`:$Tag"
    docker compose -f $ComposeFile config | Out-Null
    docker compose -f $ComposeFile up -d

    Wait-Until -Description "motiond tcp port" -TimeoutSeconds $TimeoutSeconds -Condition {
        Test-TcpPort -TargetHost "127.0.0.1" -Port 8765
    }

    Wait-Until -Description "ws-bridge tcp port" -TimeoutSeconds $TimeoutSeconds -Condition {
        Test-TcpPort -TargetHost "127.0.0.1" -Port 8787
    }

    Wait-Until -Description "frontdoor root" -TimeoutSeconds $TimeoutSeconds -Condition {
        try {
            $response = Invoke-WebRequest -Uri "http://127.0.0.1:8088/" -UseBasicParsing -TimeoutSec 3
            return [int]$response.StatusCode -eq 200
        } catch {
            return $false
        }
    }

    Wait-Until -Description "phone ingest health" -TimeoutSeconds $TimeoutSeconds -Condition {
        try {
            $response = Invoke-WebRequest -Uri "http://127.0.0.1:8088/api/phone-imu/health" -UseBasicParsing -TimeoutSec 3
            if ([int]$response.StatusCode -ne 200) {
                return $false
            }
            $payload = $response.Content | ConvertFrom-Json
            return $payload.status -eq "ok"
        } catch {
            return $false
        }
    }

    Write-Host "Self-hosted validation passed."
    Write-Host "Frontdoor: http://127.0.0.1:8088/"
    Write-Host "Phone ingest health: http://127.0.0.1:8088/api/phone-imu/health"
} catch {
    Write-Host "Self-hosted validation failed: $($_.Exception.Message)"
    docker compose -f $ComposeFile logs --no-color
    throw
} finally {
    if (-not $KeepRunning) {
        try {
            docker compose -f $ComposeFile down
        } catch {
        }
    }
    $env:EKSTRA_IMAGE = $previousImage
    $env:EKSTRA_TAG = $previousTag
}
