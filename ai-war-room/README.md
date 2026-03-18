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

For the trust-sensitive backend wave, it also supports a dedicated 7-step chain:

- contract freeze
- adversarial review
- test authoring
- self critique
- failure repair
- release gate
- diff review

`trust_backend` is now a first-class surface in `surfaces/surfaces.json`.
That chain builds a dedicated bundle with `scripts/build_trust_surface_bundle.py` into `bundles/trust_backend_boundary.txt`.

Trust-sensitive companion docs now present in the repo:

- `trust_backend_wave_plan.md`
- `trust_backend_bundle_manifest.md`
- `trust_backend_output_spec.md`

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
    05_trust_contracts/
    06_trust_adversarial/
    07_trust_tests/
    08_trust_release/
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

## Run trust backend wave

```powershell
powershell -ExecutionPolicy Bypass -File .\ai-war-room\scripts\run_surface.ps1 -RepoRoot . -Surface trust_backend
```

Optional inputs for richer trust outputs:

- `-TrustTestRunOutputPath <path-to-test-log.txt>`
- `-TrustFailingTestsPath <path-to-failing-tests.txt>`
- `-TrustCoverageSummaryPath <path-to-coverage-summary.txt>`
- `-TrustImplementationDiffPath <path-to-diff.txt>`

If optional inputs are not provided, the trust chain still runs using explicit `[NOT PROVIDED ...]` placeholders.

## Lightweight trust runners

For iterative/manual trust passes, the repo also includes lightweight runners for specific prompt variants, for example:

- `scripts/run_trust_contract_freeze.ps1`
- `scripts/run_trust_contract_freeze_light.py`
- `scripts/run_trust_adversarial_review_light.py`
- `scripts/run_trust_adversarial_review_v2.py`
- `scripts/run_trust_adversarial_review_v3A.py`
- `scripts/run_trust_adversarial_review_v3B.py`
- `scripts/run_trust_test_authoring_v1A.py`
- `scripts/run_trust_test_authoring_v1B.py`

These scripts write directly to named trust artifacts under `ai-war-room/outputs/` and are useful when iterating on one stage without rerunning the full chain.

## Current downstream result in this repo state

The trust-sensitive wave in this repo has already been translated into real backend tests under `tests/`:

- `protected-contact.test.ts`
- `community-dogs.test.ts`
- `reviews.test.ts`
- `abuse.test.ts`
- `change-requests.test.ts`
- `evidence.test.ts`

Current validated result for that set:

- 6 files passed
- 60 tests passed

These implemented tests are more authoritative than any single intermediate model output.

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
- `ai-war-room/outputs/05_trust_contracts/`
- `ai-war-room/outputs/06_trust_adversarial/`
- `ai-war-room/outputs/07_trust_tests/`
- `ai-war-room/outputs/08_trust_release/`

Some trust runs may also create:

- resolved prompt artifacts (`*_prompt_*.md`)
- raw API payloads (`*.response.json` or `*.json`)

Operational truth rule:
- repo code and implemented tests are the primary source of truth
- canonical docs come next
- ai-war-room outputs are supporting artifacts and may include partial/truncated experimental runs
