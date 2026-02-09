# Test Security Headers Script
# This script tests the HTTP security headers on the deployed site

Write-Host "Testing Security Headers for Ana Risorlange Supermarket" -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Gray
Write-Host ""

$url = "https://anarisorlange.alessandrosantos.dev/"

try {
    Write-Host "Fetching headers from: $url" -ForegroundColor Yellow
    Write-Host ""
    
    $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -ErrorAction Stop
    
    # Headers to check
    $securityHeaders = @(
        @{Name = "X-XSS-Protection"; Description = "XSS Protection"; ShouldExist = $true },
        @{Name = "X-Frame-Options"; Description = "Clickjacking Protection"; ShouldExist = $true },
        @{Name = "X-Content-Type-Options"; Description = "MIME Sniffing Protection"; ShouldExist = $true },
        @{Name = "Referrer-Policy"; Description = "Referrer Policy"; ShouldExist = $true },
        @{Name = "Content-Security-Policy"; Description = "Content Security Policy"; ShouldExist = $true },
        @{Name = "Permissions-Policy"; Description = "Permissions Policy"; ShouldExist = $true },
        @{Name = "Strict-Transport-Security"; Description = "HSTS (from Traefik/Coolify)"; ShouldExist = $true },
        @{Name = "X-Powered-By"; Description = "Technology Fingerprint"; ShouldExist = $false }
    )
    
    Write-Host "SECURITY HEADERS REPORT" -ForegroundColor Green
    Write-Host "======================================================================" -ForegroundColor Gray
    Write-Host ""
    
    $score = 0
    $maxScore = $securityHeaders.Count
    
    foreach ($header in $securityHeaders) {
        $value = $response.Headers[$header.Name]
        
        if ($header.ShouldExist) {
            if ($null -ne $value) {
                Write-Host "[OK] $($header.Description)" -ForegroundColor Green
                Write-Host "     Header: $($header.Name)" -ForegroundColor Gray
                Write-Host "     Value: $value" -ForegroundColor Cyan
                $score++
            }
            else {
                Write-Host "[MISSING] $($header.Description)" -ForegroundColor Red
                Write-Host "          Header: $($header.Name)" -ForegroundColor Gray
            }
        }
        else {
            if ($null -eq $value) {
                Write-Host "[OK] $($header.Description) - NOT PRESENT (Good!)" -ForegroundColor Green
                Write-Host "     Header: $($header.Name)" -ForegroundColor Gray
                $score++
            }
            else {
                Write-Host "[FAIL] $($header.Description) - PRESENT (Bad!)" -ForegroundColor Red
                Write-Host "       Header: $($header.Name)" -ForegroundColor Gray
                Write-Host "       Value: $value" -ForegroundColor Red
            }
        }
        Write-Host ""
    }
    
    Write-Host "======================================================================" -ForegroundColor Gray
    $percentage = [math]::Round(($score / $maxScore) * 100)
    Write-Host "SECURITY SCORE: $score / $maxScore ($percentage%)" -ForegroundColor $(if ($score -eq $maxScore) { "Green" } elseif ($score -ge ($maxScore * 0.7)) { "Yellow" } else { "Red" })
    Write-Host ""
    
    if ($score -eq $maxScore) {
        Write-Host "EXCELLENT! All security headers are properly configured!" -ForegroundColor Green
    }
    elseif ($score -ge ($maxScore * 0.7)) {
        Write-Host "GOOD, but some headers are missing. Review the report above." -ForegroundColor Yellow
    }
    else {
        Write-Host "CRITICAL: Multiple security headers are missing!" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "TIP: Test your site at https://securityheaders.com/" -ForegroundColor Cyan
    Write-Host ""
    
}
catch {
    Write-Host "Error fetching headers: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure the site is accessible and try again." -ForegroundColor Yellow
}
