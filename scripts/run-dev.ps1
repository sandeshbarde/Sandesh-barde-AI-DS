# Sandesh Barde Full-Stack Portfolio - Development Runner Script
$ErrorActionPreference = "Stop"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   Starting Sandesh Barde Portfolio (FastAPI + Vite React)" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# Option 1: Docker
$dockerChoice = Read-Host "Start stack using Docker Compose? (y/N)"
if ($dockerChoice -eq 'y' -or $dockerChoice -eq 'Y') {
    Write-Host "Starting Docker containers..." -ForegroundColor Yellow
    docker compose up --build
    exit 0
}

# Option 2: Local Windows processes
Write-Host "`nStarting Backend on http://127.0.0.1:8000 (FastAPI)..." -ForegroundColor Yellow
$backendProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd backend && .\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000" -PassThru

Write-Host "Starting Frontend on http://localhost:5173 (Vite + React)..." -ForegroundColor Yellow
$frontendProcess = Start-Process -FilePath "cmd.exe" -ArgumentList "/k cd frontend && npm run dev" -PassThru

Write-Host "`nServices started!" -ForegroundColor Green
Write-Host "Public Portfolio: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Admin Portal:     http://localhost:5173/admin/login" -ForegroundColor Cyan
Write-Host "API Swagger Docs: http://127.0.0.1:8000/api/docs" -ForegroundColor Cyan
Write-Host "`nClose the terminal windows to stop servers." -ForegroundColor Gray
