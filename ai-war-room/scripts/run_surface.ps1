param(
    [Parameter(Mandatory = $true)]
    [string]$RepoRoot,

    [Parameter(Mandatory = $true)]
    [string]$Surface,

    [string]$PythonExe = "python",

    [string]$Model,

    [string]$TrustTestRunOutputPath,

    [string]$TrustFailingTestsPath,

    [string]$TrustImplementationDiffPath,

    [string]$TrustCoverageSummaryPath
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

function Get-OptionalFileText {
    param(
        [string]$Path,
        [string]$Fallback
    )

    if (-not $Path) {
        return $Fallback
    }

    if (-not (Test-Path $Path)) {
        return "[NOT PROVIDED: file not found at '$Path']"
    }

    return Get-Content -Path $Path -Raw -Encoding UTF8
}

function New-ResolvedPromptTemplate {
    param(
        [Parameter(Mandatory = $true)]
        [string]$TemplatePath,

        [Parameter(Mandatory = $true)]
        [hashtable]$Replacements,

        [Parameter(Mandatory = $true)]
        [string]$DestinationPath
    )

    $TemplateText = Get-Content -Path $TemplatePath -Raw -Encoding UTF8
    foreach ($key in $Replacements.Keys) {
        $TemplateText = $TemplateText.Replace("{{$key}}", [string]$Replacements[$key])
    }

    $DestinationDir = Split-Path -Parent $DestinationPath
    if ($DestinationDir) {
        New-Item -ItemType Directory -Path $DestinationDir -Force | Out-Null
    }

    Set-Content -Path $DestinationPath -Value $TemplateText -Encoding UTF8
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
$TrustBuildScript = Join-Path $WarRoomRoot "scripts\build_trust_surface_bundle.py"
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

if ($Surface -eq "trust_backend") {
    $ContractOut = Join-Path $WarRoomRoot "outputs\05_trust_contracts\trust_backend_contract_freeze_$Timestamp.md"
    $ContractRaw = Join-Path $WarRoomRoot "outputs\05_trust_contracts\trust_backend_contract_freeze_$Timestamp.json"
    $AdversarialOut = Join-Path $WarRoomRoot "outputs\06_trust_adversarial\trust_backend_adversarial_$Timestamp.md"
    $AdversarialRaw = Join-Path $WarRoomRoot "outputs\06_trust_adversarial\trust_backend_adversarial_$Timestamp.json"
    $AuthoringOut = Join-Path $WarRoomRoot "outputs\07_trust_tests\trust_backend_test_authoring_$Timestamp.md"
    $AuthoringRaw = Join-Path $WarRoomRoot "outputs\07_trust_tests\trust_backend_test_authoring_$Timestamp.json"
    $CritiqueOut = Join-Path $WarRoomRoot "outputs\07_trust_tests\trust_backend_self_critique_$Timestamp.md"
    $CritiqueRaw = Join-Path $WarRoomRoot "outputs\07_trust_tests\trust_backend_self_critique_$Timestamp.json"
    $RepairOut = Join-Path $WarRoomRoot "outputs\07_trust_tests\trust_backend_failure_repair_$Timestamp.md"
    $RepairRaw = Join-Path $WarRoomRoot "outputs\07_trust_tests\trust_backend_failure_repair_$Timestamp.json"
    $GateOut = Join-Path $WarRoomRoot "outputs\08_trust_release\trust_backend_release_gate_$Timestamp.md"
    $GateRaw = Join-Path $WarRoomRoot "outputs\08_trust_release\trust_backend_release_gate_$Timestamp.json"
    $DiffOut = Join-Path $WarRoomRoot "outputs\08_trust_release\trust_backend_diff_review_$Timestamp.md"
    $DiffRaw = Join-Path $WarRoomRoot "outputs\08_trust_release\trust_backend_diff_review_$Timestamp.json"

    $PromptRenderDir = Join-Path $WarRoomRoot "outputs\08_trust_release\_resolved_prompts"
    $CritiquePromptResolved = Join-Path $PromptRenderDir "trust_backend_self_critique_$Timestamp.md"
    $RepairPromptResolved = Join-Path $PromptRenderDir "trust_backend_failure_repair_$Timestamp.md"
    $GatePromptResolved = Join-Path $PromptRenderDir "trust_backend_release_gate_$Timestamp.md"
    $DiffPromptResolved = Join-Path $PromptRenderDir "trust_backend_diff_review_$Timestamp.md"

    Write-Host "Mode: trust backend chain"

    if (Test-Path $TrustBuildScript) {
        Invoke-Step -Label "Build trust backend bundle (dedicated helper)" -Arguments @(
            $TrustBuildScript,
            "--repo-root", $ResolvedRepoRoot,
            "--output", $BundlePath
        )
    }
    else {
        Invoke-Step -Label "Build trust backend bundle (surfaces.json)" -Arguments @(
            $BuildScript,
            "--repo-root", $ResolvedRepoRoot,
            "--surfaces-file", $SurfacesFile,
            "--surface", $Surface,
            "--output", $BundlePath
        )
    }

    Invoke-Step -Label "Trust contract freeze" -Arguments ($ReviewCommonArgs + @(
        "--prompt", (Join-Path $WarRoomRoot "prompts\trust_backend_contract_freeze.md"),
        "--output", $ContractOut,
        "--raw-output", $ContractRaw
    ))

    Invoke-Step -Label "Trust adversarial review" -Arguments ($ReviewCommonArgs + @(
        "--prompt", (Join-Path $WarRoomRoot "prompts\trust_backend_adversarial_review.md"),
        "--output", $AdversarialOut,
        "--raw-output", $AdversarialRaw
    ))

    Invoke-Step -Label "Trust test authoring" -Arguments ($ReviewCommonArgs + @(
        "--prompt", (Join-Path $WarRoomRoot "prompts\trust_backend_test_authoring.md"),
        "--output", $AuthoringOut,
        "--raw-output", $AuthoringRaw
    ))

    New-ResolvedPromptTemplate -TemplatePath (Join-Path $WarRoomRoot "prompts\trust_backend_self_critique.md") -DestinationPath $CritiquePromptResolved -Replacements @{
        "CONTRACT_FREEZE" = (Get-Content -Path $ContractOut -Raw -Encoding UTF8)
        "ADVERSARIAL_REVIEW" = (Get-Content -Path $AdversarialOut -Raw -Encoding UTF8)
        "TEST_DRAFTS" = (Get-Content -Path $AuthoringOut -Raw -Encoding UTF8)
    }

    Invoke-Step -Label "Trust self critique" -Arguments ($ReviewCommonArgs + @(
        "--prompt", $CritiquePromptResolved,
        "--output", $CritiqueOut,
        "--raw-output", $CritiqueRaw
    ))

    New-ResolvedPromptTemplate -TemplatePath (Join-Path $WarRoomRoot "prompts\trust_backend_failure_repair.md") -DestinationPath $RepairPromptResolved -Replacements @{
        "TEST_RUN_OUTPUT" = (Get-OptionalFileText -Path $TrustTestRunOutputPath -Fallback "[NOT PROVIDED: no trust test run output supplied for this pass]")
        "FAILING_TESTS" = (Get-OptionalFileText -Path $TrustFailingTestsPath -Fallback "[NOT PROVIDED: no failing test file supplied for this pass]")
        "CONTRACT_FREEZE" = (Get-Content -Path $ContractOut -Raw -Encoding UTF8)
        "ADVERSARIAL_REVIEW" = (Get-Content -Path $AdversarialOut -Raw -Encoding UTF8)
    }

    Invoke-Step -Label "Trust failure repair" -Arguments ($ReviewCommonArgs + @(
        "--prompt", $RepairPromptResolved,
        "--output", $RepairOut,
        "--raw-output", $RepairRaw
    ))

    New-ResolvedPromptTemplate -TemplatePath (Join-Path $WarRoomRoot "prompts\trust_backend_release_gate.md") -DestinationPath $GatePromptResolved -Replacements @{
        "CONTRACT_FREEZE" = (Get-Content -Path $ContractOut -Raw -Encoding UTF8)
        "ADVERSARIAL_REVIEW" = (Get-Content -Path $AdversarialOut -Raw -Encoding UTF8)
        "TEST_AUTHORING" = (Get-Content -Path $AuthoringOut -Raw -Encoding UTF8)
        "SELF_CRITIQUE" = (Get-Content -Path $CritiqueOut -Raw -Encoding UTF8)
        "FAILURE_REPAIR" = (Get-Content -Path $RepairOut -Raw -Encoding UTF8)
        "COVERAGE_SUMMARY" = (Get-OptionalFileText -Path $TrustCoverageSummaryPath -Fallback "[NOT PROVIDED: no external coverage summary supplied]")
    }

    Invoke-Step -Label "Trust release gate" -Arguments ($ReviewCommonArgs + @(
        "--prompt", $GatePromptResolved,
        "--output", $GateOut,
        "--raw-output", $GateRaw
    ))

    New-ResolvedPromptTemplate -TemplatePath (Join-Path $WarRoomRoot "prompts\trust_backend_diff_review.md") -DestinationPath $DiffPromptResolved -Replacements @{
        "WAVE_PLAN" = (Get-Content -Path (Join-Path $WarRoomRoot "trust_backend_wave_plan.md") -Raw -Encoding UTF8)
        "CONTRACT_FREEZE" = (Get-Content -Path $ContractOut -Raw -Encoding UTF8)
        "ADVERSARIAL_REVIEW" = (Get-Content -Path $AdversarialOut -Raw -Encoding UTF8)
        "RELEASE_GATE" = (Get-Content -Path $GateOut -Raw -Encoding UTF8)
        "IMPLEMENTATION_DIFF" = (Get-OptionalFileText -Path $TrustImplementationDiffPath -Fallback "[NOT PROVIDED: no implementation diff supplied]")
        "TEST_RESULTS" = (Get-OptionalFileText -Path $TrustTestRunOutputPath -Fallback "[NOT PROVIDED: no trust test run output supplied]")
    }

    Invoke-Step -Label "Trust diff review" -Arguments ($ReviewCommonArgs + @(
        "--prompt", $DiffPromptResolved,
        "--output", $DiffOut,
        "--raw-output", $DiffRaw
    ))

    Write-Host ""
    Write-Host "Completed ai-war-room trust backend chain for surface '$Surface'."
    return
}

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
