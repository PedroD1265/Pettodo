import { toast } from 'sonner';
import type { IStorageService } from '../interfaces';

const SIZE_CAP = 500 * 1024;

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function storeFile(file: File, _pathHint: string): Promise<{ url: string }> {
  if (file.size > SIZE_CAP) {
    toast.warning(`File too large for demo storage (${(file.size / 1024).toFixed(0)} KB). Showing placeholder. Max: 500 KB.`);
    return { url: `https://placehold.co/400x300/e5e7eb/6b7280?text=${encodeURIComponent(file.name)}` };
  }
  const dataUrl = await readAsDataUrl(file);
  return { url: dataUrl };
}

export const storageDemoAdapter: IStorageService = {
  async uploadImage(input, pathHint) {
    if (typeof input === 'string') {
      return { url: input };
    }
    return storeFile(input, pathHint);
  },

  async uploadDocument(file, pathHint) {
    return storeFile(file, pathHint);
  },
};
