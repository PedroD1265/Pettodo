param(
    [Parameter(Mandatory = $true)]
    [string]$RepoRoot,

    [Parameter(Mandatory = $true)]
    [string]$Surface,

    [string]$PythonExe = "python",

    [string]$Model
)

$ErrorActionPreference = "Stop"

function Invoke-Step {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Label,

        [Parameter(Mandatory = $true)]
        [string[]]$Arguments
    )

    Write-Host ""
    Write-Host "==> $Label"
    & $PythonExe @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Step failed: $Label"
    }
}

$ResolvedRepoRoot = (Resolve-Path $RepoRoot).Path
$WarRoomRoot = Split-Path -Parent $PSScriptRoot
$Timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

$BundlePath = Join-Path $WarRoomRoot "bundles\$Surface.txt"
$SurfacesFile = Join-Path $WarRoomRoot "surfaces\surfaces.json"

$RiskOut = Join-Path $WarRoomRoot "outputs\01_risk\${Surface}_$Timestamp.md"
$RiskRaw = Join-Path $WarRoomRoot "outputs\01_risk\${Surface}_$Timestamp.json"
$TestsOut = Join-Path $WarRoomRoot "outputs\02_tests\${Surface}_$Timestamp.md"
$TestsRaw = Join-Path $WarRoomRoot "outputs\02_tests\${Surface}_$Timestamp.json"
$PatchOut = Join-Path $WarRoomRoot "outputs\03_patch\${Surface}_$Timestamp.md"
$PatchRaw = Join-Path $WarRoomRoot "outputs\03_patch\${Surface}_$Timestamp.json"
$DocsOut = Join-Path $WarRoomRoot "outputs\04_docs\${Surface}_$Timestamp.md"
$DocsRaw = Join-Path $WarRoomRoot "outputs\04_docs\${Surface}_$Timestamp.json"

$BuildScript = Join-Path $WarRoomRoot "scripts\build_surface_bundle.py"
$ReviewScript = Join-Path $WarRoomRoot "scripts\call_vertex_review.py"

$ReviewCommonArgs = @(
    $ReviewScript,
    "--surface", $Surface,
    "--bundle", $BundlePath
)

if ($Model) {
    $ReviewCommonArgs += @("--model", $Model)
}

Write-Host "AI War Room root: $WarRoomRoot"
Write-Host "Repo root: $ResolvedRepoRoot"
Write-Host "Surface: $Surface"
Write-Host "Bundle: $BundlePath"

Invoke-Step -Label "Build surface bundle" -Arguments @(
    $BuildScript,
    "--repo-root", $ResolvedRepoRoot,
    "--surfaces-file", $SurfacesFile,
    "--surface", $Surface,
    "--output", $BundlePath
)

Invoke-Step -Label "Risk audit" -Arguments ($ReviewCommonArgs + @(
    "--prompt", (Join-Path $WarRoomRoot "prompts\risk_audit.md"),
    "--output", $RiskOut,
    "--raw-output", $RiskRaw
))

Invoke-Step -Label "Test blueprint" -Arguments ($ReviewCommonArgs + @(
    "--prompt", (Join-Path $WarRoomRoot "prompts\test_blueprint.md"),
    "--output", $TestsOut,
    "--raw-output", $TestsRaw
))

Invoke-Step -Label "Patch plan" -Arguments ($ReviewCommonArgs + @(
    "--prompt", (Join-Path $WarRoomRoot "prompts\patch_plan.md"),
    "--output", $PatchOut,
    "--raw-output", $PatchRaw
))

Invoke-Step -Label "Docs vs code" -Arguments ($ReviewCommonArgs + @(
    "--prompt", (Join-Path $WarRoomRoot "prompts\docs_vs_code.md"),
    "--output", $DocsOut,
    "--raw-output", $DocsRaw
))

Write-Host ""
Write-Host "Completed ai-war-room run for surface '$Surface'."
