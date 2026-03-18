# AI War Room

`ai-war-room` is a local audit workspace for PETTODO. It bundles critical repo surfaces into reviewable text files and runs structured AI audits from VS Code + PowerShell + Python without changing app logic.

This war room uses Vertex AI express mode over REST with `GOOGLE_API_KEY`.
It does not use `generativelanguage.googleapis.com`.
It does not use Gemini Developer API.
It does not depend on ADC as the primary runtime path.
It does not require `VERTEX_URL`.

## What it does

- Builds a single text bundle for one repo surface
- Runs four audit passes over that bundle:
  - risk audit
  - test blueprint
  - patch plan
  - docs vs code
- Stores generated markdown and raw response JSON under `ai-war-room/outputs/`

## Folder layout

```text
ai-war-room/
  prompts/
  surfaces/
  bundles/
  outputs/
    01_risk/
    02_tests/
    03_patch/
    04_docs/
  scripts/
```

## Prerequisites

- Python 3.11+
- PowerShell
- Access to the internet for Vertex AI REST calls
- `GOOGLE_API_KEY` available in the shell session

## Runtime model

The review caller sends REST requests to Vertex AI express mode using this endpoint shape:

```text
https://aiplatform.googleapis.com/v1/publishers/google/models/{model}:generateContent?key={GOOGLE_API_KEY}
```

## Required environment variables

- `GOOGLE_API_KEY`
- `AI_WAR_ROOM_MODEL` optional, default `gemini-2.5-pro`

Optional informational variables if you want to keep them in your shell session:

- `GOOGLE_CLOUD_PROJECT`
- `GOOGLE_CLOUD_LOCATION`
- `GOOGLE_GENAI_USE_VERTEXAI`

The script does not require those variables for the REST call.

## Install dependencies

No extra Python package is required for the Vertex AI REST caller in this repo state.

## Run one surface

```powershell
powershell -ExecutionPolicy Bypass -File .\ai-war-room\scripts\run_surface.ps1 -RepoRoot . -Surface matching
```

## Manual single-call test

```powershell
python .\ai-war-room\scripts\call_vertex_review.py --surface matching --prompt .\ai-war-room\prompts\risk_audit.md --bundle .\ai-war-room\bundles\matching.txt --output .\ai-war-room\outputs\01_risk\manual_matching_test.md --raw-output .\ai-war-room\outputs\01_risk\manual_matching_test.json
```

## Outputs

Successful runs create artifacts in:

- `ai-war-room/outputs/01_risk/`
- `ai-war-room/outputs/02_tests/`
- `ai-war-room/outputs/03_patch/`
- `ai-war-room/outputs/04_docs/`
