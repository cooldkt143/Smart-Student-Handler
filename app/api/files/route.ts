import { NextResponse } from "next/server";
import { blobServiceClient, containerName } from "@/lib/azure";

export async function GET() {
  try {
    const containerClient = blobServiceClient.getContainerClient(containerName);
    await containerClient.createIfNotExists();

    const files: { name: string; url: string }[] = [];

    for await (const blob of containerClient.listBlobsFlat()) {
      const blobUrl = `${containerClient.url}/${blob.name}`;
      files.push({ name: blob.name, url: blobUrl });
    }

    return NextResponse.json(files);
  } catch (err: any) {
    console.error("List Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
