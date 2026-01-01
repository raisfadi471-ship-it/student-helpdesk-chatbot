# Test webhook locally
$body = @{
    responseId = "test-response-123"
    queryResult = @{
        queryText = "What is web development?"
        parameters = @{}
        allRequiredParamsPresent = $true
        fulfillmentText = "Web Development is a course that teaches you HTML, CSS, JavaScript, React, Node.js, and full-stack development. Duration: 12 weeks."
        intent = @{
            name = "projects/student-helpdesk/agent/intents/web-dev-intent"
            displayName = "WebDevelopmentIntent"
        }
        intentDetectionConfidence = 0.95
        languageCode = "en"
    }
    originalDetectIntentRequest = @{
        source = "facebook"
        payload = @{}
    }
    session = "projects/student-helpdesk/agent/sessions/test-session-123"
} | ConvertTo-Json -Depth 10

Write-Host "Testing webhook at http://localhost:3000/webhook" -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/webhook" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Yellow
    Write-Host $response.Content
} catch {
    Write-Host "❌ ERROR!" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
