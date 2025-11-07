# Plant Care Tracker - Setup Script
# Run this script in PowerShell to set up the project

Write-Host "🌱 Plant Care Tracker - Setup Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Cyan
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 20.x or higher from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm installation..." -ForegroundColor Cyan
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please reinstall Node.js." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Cyan
Write-Host "This may take 2-5 minutes..." -ForegroundColor Yellow
Write-Host ""

# Install dependencies
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host "🎉 Setup Complete!" -ForegroundColor Green
    Write-Host "=====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "To start the development server, run:" -ForegroundColor Cyan
    Write-Host "  npm start" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "The app will be available at:" -ForegroundColor Cyan
    Write-Host "  http://localhost:4200" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "For more information, see:" -ForegroundColor Cyan
    Write-Host "  - README.md (Project overview)" -ForegroundColor White
    Write-Host "  - QUICKSTART.md (Quick start guide)" -ForegroundColor White
    Write-Host "  - FEATURES.md (Feature checklist)" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Installation failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting steps:" -ForegroundColor Yellow
    Write-Host "1. Clear npm cache: npm cache clean --force" -ForegroundColor White
    Write-Host "2. Delete node_modules: Remove-Item -Recurse -Force node_modules" -ForegroundColor White
    Write-Host "3. Try again: npm install" -ForegroundColor White
    Write-Host ""
    exit 1
}
