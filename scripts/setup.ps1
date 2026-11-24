# Sandesh Barde Full-Stack Portfolio - Setup Script (Windows 11 PowerShell)
$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   Setting up Sandesh Barde Full-Stack Developer Portfolio" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Check Python
Write-Host "`n[1/4] Checking Python environment..." -ForegroundColor Yellow
try {
    $pyVer = cmd.exe /c "py --version 2>&1"
    Write-Host "Found Python: $pyVer" -ForegroundColor Green
} catch {
    Write-Host "Python not found on PATH. Please ensure Python 3.11+ is installed." -ForegroundColor Red
}

# 2. Check Node
Write-Host "`n[2/4] Checking Node.js & npm..." -ForegroundColor Yellow
try {
    $nodeVer = cmd.exe /c "node -v"
    $npmVer = cmd.exe /c "npm -v"
    Write-Host "Found Node.js: $nodeVer (npm: $npmVer)" -ForegroundColor Green
} catch {
    Write-Host "Node.js not found. Please install Node.js 18+." -ForegroundColor Red
}

# 3. Setup Backend Environment
Write-Host "`n[3/4] Installing Python Backend dependencies..." -ForegroundColor Yellow
Push-Location backend
try {
    if (-not (Test-Path ".venv")) {
        Write-Host "Creating Python virtual environment (.venv)..."
        cmd.exe /c "py -m venv .venv"
    }
    Write-Host "Installing requirements into virtual environment..."
    cmd.exe /c ".\.venv\Scripts\python.exe -m pip install --upgrade pip"
    cmd.exe /c ".\.venv\Scripts\python.exe -m pip install -r requirements.txt"
    Write-Host "Backend dependencies ready." -ForegroundColor Green
} finally {
    Pop-Location
}

# 4. Setup Frontend Environment
Write-Host "`n[4/4] Installing Frontend dependencies..." -ForegroundColor Yellow
Push-Location frontend
try {
    cmd.exe /c "npm install"
    Write-Host "Frontend dependencies ready." -ForegroundColor Green
} finally {
    Pop-Location
}

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "Setup Complete! Run .\scripts\run-dev.ps1 to start services." -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Green
