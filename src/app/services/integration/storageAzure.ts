import type { IStorageService } from '../interfaces';

async function getUploadPackage(filename: string, mimeType: string): Promise<{ uploadUrl: string; readUrl: string; blobPath: string }> {
  const res = await fetch('/api/storage/upload-url', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ filename, mimeType }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    if (res.status === 503) {
      throw new Error('[Azure Storage] Not configured on server: ' + (body.message ?? ''));
    }
    throw new Error('[Azure Storage] Failed to get upload URL: ' + (body.message ?? res.status));
  }
  return res.json();
}

async function putToBlob(uploadUrl: string, file: File): Promise<void> {
  const resp = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'x-ms-blob-type': 'BlockBlob',
      'Content-Type': file.type || 'application/octet-stream',
    },
    body: file,
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`[Azure Storage] Blob PUT failed (${resp.status}): ${text.slice(0, 200)}`);
  }
}

export const storageAzureAdapter: IStorageService = {
  async uploadImage(input, _pathHint) {
    if (typeof input === 'string') {
      return { url: input };
    }
    const { uploadUrl, readUrl } = await getUploadPackage(input.name, input.type || 'image/jpeg');
    await putToBlob(uploadUrl, input);
    return { url: readUrl };
  },

  async uploadDocument(file, _pathHint) {
    const { uploadUrl, readUrl } = await getUploadPackage(file.name, file.type || 'application/octet-stream');
    await putToBlob(uploadUrl, file);
    return { url: readUrl };
  },
};

export { getUploadPackage, putToBlob };
