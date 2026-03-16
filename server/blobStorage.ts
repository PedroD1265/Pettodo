import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} from '@azure/storage-blob';

const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME ?? 'pettodo-media';

export function isStorageConfigured(): boolean {
  return !!(accountName && accountKey);
}

function getCredential(): StorageSharedKeyCredential {
  if (!accountName || !accountKey) {
    throw new Error('[blobStorage] AZURE_STORAGE_ACCOUNT_NAME and AZURE_STORAGE_ACCOUNT_KEY must be set');
  }
  return new StorageSharedKeyCredential(accountName, accountKey);
}

export function generateUploadSasUrl(blobPath: string, expiryMinutes = 15): string {
  const cred = getCredential();
  const now = new Date();
  const expiry = new Date(now.getTime() + expiryMinutes * 60_000);
  const sas = generateBlobSASQueryParameters(
    {
      containerName,
      blobName: blobPath,
      permissions: BlobSASPermissions.parse('cw'),
      expiresOn: expiry,
      startsOn: now,
    },
    cred,
  );
  return `https://${accountName}.blob.core.windows.net/${containerName}/${encodeURIComponent(blobPath)}?${sas.toString()}`;
}

export function generateReadSasUrl(blobPath: string, expiryMinutes = 60): string {
  const cred = getCredential();
  const now = new Date();
  const expiry = new Date(now.getTime() + expiryMinutes * 60_000);
  const sas = generateBlobSASQueryParameters(
    {
      containerName,
      blobName: blobPath,
      permissions: BlobSASPermissions.parse('r'),
      expiresOn: expiry,
    },
    cred,
  );
  return `https://${accountName}.blob.core.windows.net/${containerName}/${encodeURIComponent(blobPath)}?${sas.toString()}`;
}

export async function deleteBlob(blobPath: string): Promise<void> {
  const cred = getCredential();
  const client = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, cred);
  const container = client.getContainerClient(containerName);
  await container.getBlobClient(blobPath).deleteIfExists();
}

export async function ensureContainer(): Promise<void> {
  const cred = getCredential();
  const client = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, cred);
  await client.getContainerClient(containerName).createIfNotExists();
}
