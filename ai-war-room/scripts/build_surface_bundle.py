from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


DEFAULT_MAX_CHARS = 16000


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build a text bundle for one PETTODO repo surface."
    )
    parser.add_argument("--repo-root", required=True, help="Path to the PETTODO repo root.")
    parser.add_argument("--surfaces-file", required=True, help="Path to surfaces.json.")
    parser.add_argument("--surface", required=True, help="Surface name to bundle.")
    parser.add_argument("--output", required=True, help="Output bundle .txt path.")
    parser.add_argument(
        "--max-chars-per-file",
        type=int,
        default=DEFAULT_MAX_CHARS,
        help="Default truncation limit for each bundled file.",
    )
    return parser.parse_args()


def read_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8-sig"))
    except FileNotFoundError as exc:
        raise SystemExit(f"[build_surface_bundle] surfaces file not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise SystemExit(
            f"[build_surface_bundle] invalid JSON in surfaces file {path}: {exc}"
        ) from exc


def find_surface(payload: dict[str, Any], surface_name: str) -> dict[str, Any]:
    for surface in payload.get("surfaces", []):
        if surface.get("name") == surface_name:
            return surface
    available = ", ".join(
        surface.get("name", "<unnamed>") for surface in payload.get("surfaces", [])
    )
    raise SystemExit(
        f"[build_surface_bundle] surface '{surface_name}' not found. Available: {available}"
    )


def normalize_file_entry(entry: Any) -> dict[str, Any]:
    if isinstance(entry, str):
        return {"path": entry}
    if isinstance(entry, dict) and "path" in entry:
        return entry
    raise ValueError(f"Unsupported file entry: {entry!r}")


def read_text_file(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8-sig")
    except UnicodeDecodeError:
        return path.read_text(encoding="utf-8-sig", errors="replace")


def truncate_content(content: str, limit: int) -> tuple[str, bool]:
    if limit <= 0 or len(content) <= limit:
        return content, False

    truncated = content[:limit]
    marker = (
        "\n\n[TRUNCATED by ai-war-room/build_surface_bundle.py "
        f"after {limit} characters]\n"
    )
    return truncated + marker, True


def render_file_section(
    repo_root: Path,
    file_path: str,
    notes: str | None,
    limit: int,
) -> tuple[str, bool, bool]:
    absolute_path = (repo_root / file_path).resolve()
    missing = not absolute_path.exists()

    header_lines = [
        f"=== FILE: {file_path} ===",
        f"ABSOLUTE_PATH: {absolute_path}",
        f"STATUS: {'MISSING' if missing else 'OK'}",
        f"MAX_CHARS: {limit}",
    ]
    if notes:
        header_lines.append(f"NOTES: {notes}")

    if missing:
        body = "[MISSING FILE]\n"
        return "\n".join(header_lines) + "\n\n" + body + "\n", True, False

    try:
        raw = read_text_file(absolute_path)
    except OSError as exc:
        body = f"[READ ERROR] {exc}\n"
        return "\n".join(header_lines) + "\n\n" + body + "\n", True, False

    content, truncated = truncate_content(raw, limit)
    body = f"```text\n{content}\n```\n"
    return "\n".join(header_lines) + "\n\n" + body + "\n", False, truncated


def main() -> int:
    args = parse_args()
    repo_root = Path(args.repo_root).resolve()
    surfaces_file = Path(args.surfaces_file).resolve()
    output_path = Path(args.output).resolve()

    payload = read_json(surfaces_file)
    surface = find_surface(payload, args.surface)
    files = [normalize_file_entry(entry) for entry in surface.get("files", [])]

    sections: list[str] = []
    missing_count = 0
    truncated_count = 0

    for entry in files:
        limit = int(entry.get("max_chars") or args.max_chars_per_file)
        section, missing, truncated = render_file_section(
            repo_root=repo_root,
            file_path=entry["path"],
            notes=entry.get("notes"),
            limit=limit,
        )
        sections.append(section)
        missing_count += int(missing)
        truncated_count += int(truncated)

    metadata = {
        "surface": surface.get("name"),
        "description": surface.get("description", ""),
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "repo_root": str(repo_root),
        "surfaces_file": str(surfaces_file),
        "file_count": len(files),
        "missing_count": missing_count,
        "truncated_count": truncated_count,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    bundle_text = (
        "# PETTODO Surface Bundle\n\n"
        f"METADATA: {json.dumps(metadata, ensure_ascii=False, indent=2)}\n\n"
        + "\n".join(sections)
    )
    output_path.write_text(bundle_text, encoding="utf-8")

    print(f"[build_surface_bundle] bundle written: {output_path}")
    print(
        f"[build_surface_bundle] files={len(files)} missing={missing_count} truncated={truncated_count}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

