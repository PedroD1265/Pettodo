import os, json
from pathlib import Path
from urllib.request import Request, urlopen

project = os.environ["GOOGLE_CLOUD_PROJECT"]
location = os.environ.get("GOOGLE_CLOUD_LOCATION", "global")
model = os.environ.get("AI_WAR_ROOM_MODEL", "gemini-2.5-pro")
api_key = os.environ["GOOGLE_API_KEY"]

prompt_path = Path("ai-war-room/outputs/07_trust_tests/trust_backend_test_authoring_prompt_run01A.md")
json_path   = Path("ai-war-room/outputs/07_trust_tests/trust_backend_test_authoring_run01A.response.json")
out_path    = Path("ai-war-room/outputs/07_trust_tests/trust_backend_test_authoring_run01A.md")

prompt = prompt_path.read_text(encoding="utf-8")
body = {
    "contents": [{"role": "user", "parts": [{"text": prompt}]}],
    "generationConfig": {"temperature": 0.1, "maxOutputTokens": 8192}
}
data = json.dumps(body).encode("utf-8")
url = f"https://aiplatform.googleapis.com/v1/projects/{project}/locations/{location}/publishers/google/models/{model}:generateContent?key={api_key}"
req = Request(url, data=data, headers={"Content-Type":"application/json; charset=utf-8"}, method="POST")

with urlopen(req, timeout=600) as resp:
    raw = resp.read().decode("utf-8")

json_path.write_text(raw, encoding="utf-8")
obj = json.loads(raw)
parts = obj.get("candidates", [{}])[0].get("content", {}).get("parts", [])
text = "\n".join(part.get("text", "") for part in parts).strip()
if not text:
    raise SystemExit(f"Respuesta vacía o sin texto útil. Revisa {json_path}")
out_path.write_text(text, encoding="utf-8")
print(f"OK: {out_path}")
print(f"Chars: {len(text)}")
