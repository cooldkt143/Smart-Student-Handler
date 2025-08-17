import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
const containerName = "uploads"; // container name

if (!connectionString) {
  throw new Error("❌ Missing Azure Storage connection string");
}

// Initialize Blob client
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Ensure container exists (Block Blob by default)
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists({
      access: "private",
    });

    // Create BlockBlobClient
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);

    // Upload file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: file.type }, // set MIME type
    });

    return NextResponse.json({
      message: `✅ File "${file.name}" uploaded successfully!`,
      url: blockBlobClient.url,
    });
  } catch (error: any) {
    console.error("Upload Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
