import type { IStorageService } from '../interfaces';

export const storageAzureStub: IStorageService = {
  async uploadImage(_input, pathHint) {
    // TODO: Implement Azure Blob Storage upload
    // 1. Call POST /api/storage/sas?path={pathHint} on your backend
    // 2. Backend generates SAS URL with 15-min expiry using AZURE_STORAGE_CONNECTION_STRING
    // 3. PUT file directly to Azure Blob using the SAS URL
    // 4. Return the permanent blob URL (without SAS token)
    throw new Error(`[Azure Storage] Not implemented. pathHint=${pathHint}`);
  },

  async uploadDocument(file, pathHint) {
    // TODO: Same SAS flow as uploadImage
    // Accept: application/pdf, image/*
    throw new Error(`[Azure Storage] Not implemented. file=${file.name} pathHint=${pathHint}`);
  },
};

export const storageGcsStub: IStorageService = {
  async uploadImage(_input, pathHint) {
    // TODO: Implement GCS signed URL upload
    // 1. Call POST /api/storage/signed-url?path={pathHint}
    // 2. Backend uses @google-cloud/storage to generate signed URL
    // 3. PUT to signed URL
    // 4. Return public URL
    throw new Error(`[GCS Storage] Not implemented. pathHint=${pathHint}`);
  },

  async uploadDocument(file, pathHint) {
    throw new Error(`[GCS Storage] Not implemented. file=${file.name} pathHint=${pathHint}`);
  },
};
