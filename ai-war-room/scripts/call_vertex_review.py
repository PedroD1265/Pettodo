from __future__ import annotations

import argparse
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

DEFAULT_MODEL = "gemini-2.5-pro"
API_TIMEOUT_SECONDS = 300
VERTEX_EXPRESS_BASE = "https://aiplatform.googleapis.com/v1/publishers/google/models"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Run one ai-war-room review prompt against Vertex AI express mode over REST."
    )
    parser.add_argument("--surface", required=True, help="Surface name.")
    parser.add_argument("--prompt", required=True, help="Prompt template .md path.")
    parser.add_argument("--bundle", required=True, help="Bundle .txt path.")
    parser.add_argument("--output", required=True, help="Markdown output path.")
    parser.add_argument(
        "--raw-output",
        help="Optional raw JSON output path. Defaults to the markdown stem plus .json.",
    )
    parser.add_argument(
        "--model",
        default=os.getenv("AI_WAR_ROOM_MODEL") or DEFAULT_MODEL,
        help="Model name. Defaults to AI_WAR_ROOM_MODEL or gemini-2.5-pro.",
    )
    return parser.parse_args()


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8-sig")
    except FileNotFoundError as exc:
        raise SystemExit(f"[call_vertex_review] file not found: {path}") from exc
    except UnicodeDecodeError:
        return path.read_text(encoding="utf-8-sig", errors="replace")


def render_prompt(template: str, surface: str, bundle_text: str) -> str:
    return template.replace("{{SURFACE}}", surface).replace("{{BUNDLE}}", bundle_text)


def make_json_safe(value: Any) -> Any:
    if value is None or isinstance(value, (str, int, float, bool)):
        return value
    if isinstance(value, dict):
        return {str(key): make_json_safe(val) for key, val in value.items()}
    if isinstance(value, (list, tuple, set)):
        return [make_json_safe(item) for item in value]
    if isinstance(value, Path):
        return str(value)
    if hasattr(value, "__dict__"):
        return make_json_safe(vars(value))
    return repr(value)


def extract_text_from_vertex_payload(payload: dict[str, Any]) -> str:
    text_parts: list[str] = []
    for candidate in payload.get("candidates", []):
        content = candidate.get("content") or {}
        for part in content.get("parts", []):
            text = part.get("text")
            if text:
                text_parts.append(text)
    if text_parts:
        return "\n\n".join(text_parts)
    return (
        "# Empty model text response\n\n"
        "The Vertex AI REST call succeeded, but no text parts were returned. "
        "Inspect the raw JSON artifact for details.\n"
    )


def build_vertex_url(model: str, api_key: str) -> str:
    encoded_model = urllib.parse.quote(model, safe="-._~")
    encoded_key = urllib.parse.quote(api_key, safe="")
    return f"{VERTEX_EXPRESS_BASE}/{encoded_model}:generateContent?key={encoded_key}"


def call_vertex_rest(prompt: str, model: str, api_key: str) -> tuple[str, dict[str, Any], str]:
    url = build_vertex_url(model=model, api_key=api_key)
    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}],
            }
        ]
    }
    data = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=API_TIMEOUT_SECONDS) as response:
            raw_body = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode("utf-8", errors="replace")
        raise SystemExit(
            "[call_vertex_review] Vertex AI REST request failed. "
            f"status={exc.code} body={error_body}"
        ) from exc
    except urllib.error.URLError as exc:
        raise SystemExit(
            "[call_vertex_review] Vertex AI REST request could not reach the API. "
            f"Error: {exc}"
        ) from exc

    try:
        parsed = json.loads(raw_body)
    except json.JSONDecodeError as exc:
        raise SystemExit(
            "[call_vertex_review] Vertex AI REST request returned non-JSON content. "
            f"Body: {raw_body[:1000]}"
        ) from exc

    return extract_text_from_vertex_payload(parsed), parsed, url


def write_outputs(markdown_path: Path, raw_path: Path, markdown: str, raw_payload: Any) -> None:
    markdown_path.parent.mkdir(parents=True, exist_ok=True)
    raw_path.parent.mkdir(parents=True, exist_ok=True)
    markdown_path.write_text(markdown, encoding="utf-8")
    raw_path.write_text(
        json.dumps(make_json_safe(raw_payload), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )


def main() -> int:
    args = parse_args()

    prompt_path = Path(args.prompt).resolve()
    bundle_path = Path(args.bundle).resolve()
    markdown_path = Path(args.output).resolve()
    raw_path = Path(args.raw_output).resolve() if args.raw_output else markdown_path.with_suffix(".json")

    template = read_text(prompt_path)
    bundle_text = read_text(bundle_path)
    prompt = render_prompt(template, args.surface, bundle_text)

    api_key = os.getenv("GOOGLE_API_KEY")
    if not api_key:
        raise SystemExit(
            "[call_vertex_review] GOOGLE_API_KEY is required for Vertex AI express mode REST calls."
        )

    print("[call_vertex_review] transport=vertex_ai_rest_express_mode")
    markdown, response_payload, request_url = call_vertex_rest(
        prompt=prompt,
        model=args.model,
        api_key=api_key,
    )

    raw_payload = {
        "surface": args.surface,
        "model": args.model,
        "transport": "vertex_ai_rest_express_mode",
        "request_url": request_url.replace(api_key, "***"),
        "prompt_path": str(prompt_path),
        "bundle_path": str(bundle_path),
        "response": response_payload,
    }

    write_outputs(markdown_path, raw_path, markdown, raw_payload)

    print(f"[call_vertex_review] markdown written: {markdown_path}")
    print(f"[call_vertex_review] raw json written: {raw_path}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except SystemExit:
        raise
    except Exception as exc:
        print(f"[call_vertex_review] unexpected error: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
