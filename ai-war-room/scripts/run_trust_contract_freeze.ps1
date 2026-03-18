$PROJECT_ID = $env:GOOGLE_CLOUD_PROJECT
$LOCATION   = $env:GOOGLE_CLOUD_LOCATION
$MODEL_ID   = $env:AI_WAR_ROOM_MODEL
$API_KEY    = $env:GOOGLE_API_KEY

if (-not $PROJECT_ID) { throw "Falta GOOGLE_CLOUD_PROJECT" }
if (-not $LOCATION)   { throw "Falta GOOGLE_CLOUD_LOCATION" }
if (-not $MODEL_ID)   { throw "Falta AI_WAR_ROOM_MODEL" }
if (-not $API_KEY)    { throw "Falta GOOGLE_API_KEY" }

$promptPath = "ai-war-room/outputs/05_trust_contracts/trust_backend_contract_freeze_prompt_run01.md"
$outPath    = "ai-war-room/outputs/05_trust_contracts/trust_backend_contract_freeze_run01.md"
$jsonPath   = "ai-war-room/outputs/05_trust_contracts/trust_backend_contract_freeze_run01.response.json"

$prompt = Get-Content $promptPath -Raw -Encoding utf8

$bodyObject = @{
  contents = @(
    @{
      role  = "user"
      parts = @(
        @{
          text = $prompt
        }
      )
    }
  )
  generationConfig = @{
    temperature     = 0.1
    maxOutputTokens = 8192
  }
}

$body = $bodyObject | ConvertTo-Json -Depth 20

$uri = "https://aiplatform.googleapis.com/v1/projects/$PROJECT_ID/locations/$LOCATION/publishers/google/models/$MODEL_ID`:generateContent?key=$API_KEY"

$response = Invoke-RestMethod `
  -Method Post `
  -Uri $uri `
  -ContentType "application/json; charset=utf-8" `
  -Body $body

$response | ConvertTo-Json -Depth 30 | Set-Content $jsonPath -Encoding utf8

$text = ($response.candidates[0].content.parts | ForEach-Object { $_.text }) -join "`n"

if ([string]::IsNullOrWhiteSpace($text)) {
  throw "Vertex respondió sin texto útil. Revisa $jsonPath"
}

Set-Content $outPath $text -Encoding utf8

Get-Item $outPath | Select-Object FullName, Length, LastWriteTime