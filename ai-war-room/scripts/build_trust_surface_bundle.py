from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

DEFAULT_MAX_CHARS = 24000

TRUST_FILES: list[dict[str, object]] = [
    {"path": "server/routes/protected-contact.ts", "priority": "P0"},
    {"path": "server/routes/community-dogs.ts", "priority": "P0"},
    {"path": "server/routes/reviews.ts", "priority": "P0"},
    {"path": "server/routes/abuse.ts", "priority": "P0"},
    {"path": "server/routes/change-requests.ts", "priority": "P0"},
    {"path": "server/routes/evidence.ts", "priority": "P0"},
    {"path": "server/middleware/verifyToken.ts", "priority": "P1"},
    {"path": "server/middleware/requireRole.ts", "priority": "P1"},
    {"path": "server/utils/audit.ts", "priority": "P1"},
    {"path": "server/schema.sql", "priority": "P1", "max_chars": 32000},
    {"path": "src/app/services/api.ts", "priority": "P1", "max_chars": 32000},
    {"path": "server/app.ts", "priority": "P2"},
    {"path": "tests/matching.test.ts", "priority": "P2", "max_chars": 26000},
]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build trust-sensitive backend bundle for PETTODO ai-war-room."
    )
    parser.add_argument("--repo-root", required=True, help="Path to PETTODO repo root.")
    parser.add_argument(
        "--output",
        default="ai-war-room/bundles/trust_backend_boundary.txt",
        help="Output bundle path, relative to repo root or absolute.",
    )
    parser.add_argument(
        "--max-chars-per-file",
        type=int,
        default=DEFAULT_MAX_CHARS,
        help="Default per-file truncation limit.",
    )
    return parser.parse_args()


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8-sig")
    except UnicodeDecodeError:
        return path.read_text(encoding="utf-8-sig", errors="replace")


def truncate(content: str, limit: int) -> tuple[str, bool]:
    if limit <= 0 or len(content) <= limit:
        return content, False
    marker = f"\n\n[TRUNCATED after {limit} chars by build_trust_surface_bundle.py]\n"
    return content[:limit] + marker, True


def render_section(repo_root: Path, file_path: str, priority: str, limit: int) -> tuple[str, bool, bool]:
    absolute = (repo_root / file_path).resolve()
    if not absolute.exists():
        section = (
            f"=== FILE: {file_path} ===\n"
            f"ABSOLUTE_PATH: {absolute}\n"
            f"PRIORITY: {priority}\n"
            f"STATUS: MISSING\n"
            f"MAX_CHARS: {limit}\n\n"
            "[MISSING FILE]\n"
        )
        return section, True, False

    text = read_text(absolute)
    body, was_truncated = truncate(text, limit)
    section = (
        f"=== FILE: {file_path} ===\n"
        f"ABSOLUTE_PATH: {absolute}\n"
        f"PRIORITY: {priority}\n"
        f"STATUS: OK\n"
        f"MAX_CHARS: {limit}\n\n"
        f"```text\n{body}\n```\n"
    )
    return section, False, was_truncated


def resolve_output_path(repo_root: Path, output_value: str) -> Path:
    output_path = Path(output_value)
    if output_path.is_absolute():
        return output_path
    return (repo_root / output_path).resolve()


def main() -> int:
    args = parse_args()
    repo_root = Path(args.repo_root).resolve()
    output_path = resolve_output_path(repo_root, args.output)

    sections: list[str] = []
    missing_count = 0
    truncated_count = 0

    for entry in TRUST_FILES:
        path = str(entry["path"])
        priority = str(entry["priority"])
        limit = int(entry.get("max_chars") or args.max_chars_per_file)

        section, missing, truncated = render_section(
            repo_root=repo_root,
            file_path=path,
            priority=priority,
            limit=limit,
        )
        sections.append(section)
        missing_count += int(missing)
        truncated_count += int(truncated)

    metadata = {
        "surface": "trust_backend_boundary",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "repo_root": str(repo_root),
        "file_count": len(TRUST_FILES),
        "missing_count": missing_count,
        "truncated_count": truncated_count,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    bundle_text = (
        "# PETTODO Trust Backend Bundle\n\n"
        f"METADATA: {json.dumps(metadata, ensure_ascii=False, indent=2)}\n\n"
        + "\n".join(sections)
    )
    output_path.write_text(bundle_text, encoding="utf-8")

    print(f"[build_trust_surface_bundle] bundle written: {output_path}")
    print(
        "[build_trust_surface_bundle] "
        f"files={len(TRUST_FILES)} missing={missing_count} truncated={truncated_count}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
