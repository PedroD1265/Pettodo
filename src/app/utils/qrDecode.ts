import QrScanner from 'qr-scanner';

export interface QrParsedResult {
  type: 'url' | 'json' | 'text';
  raw: string;
  url?: string;
  host?: string;
  json?: Record<string, unknown>;
  text?: string;
}

export function parseQrPayload(qrRaw: string): QrParsedResult {
  const trimmed = qrRaw.trim();
  try {
    const url = new URL(trimmed);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return { type: 'url', raw: trimmed, url: trimmed, host: url.hostname };
    }
  } catch { /* not a URL */ }

  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed === 'object' && parsed !== null) {
      return { type: 'json', raw: trimmed, json: parsed };
    }
  } catch { /* not JSON */ }

  return { type: 'text', raw: trimmed, text: trimmed };
}

export async function decodeQrFromImage(file: File): Promise<string> {
  const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true });
  return result.data;
}

export function createQrScanner(
  videoElement: HTMLVideoElement,
  onDecode: (result: string) => void,
  onError?: (error: string | Error) => void
): QrScanner {
  return new QrScanner(
    videoElement,
    (result) => onDecode(result.data),
    {
      returnDetailedScanResult: true,
      highlightScanRegion: true,
      highlightCodeOutline: true,
      onDecodeError: onError,
    }
  );
}
