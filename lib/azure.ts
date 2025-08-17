// lib/azure.ts
import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;

if (!connectionString) {
  throw new Error("❌ AZURE_STORAGE_CONNECTION_STRING not found in .env");
}

export const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
export const containerName = "uploads"; // you can rename
