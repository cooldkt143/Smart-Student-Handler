import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Record } from "@/lib/models/Record";

export async function GET() {
  try {
    await connectDB();

    // Fetch records from DB
    const records = await Record.find();

    // Instead of writing to file (not permanent on Vercel), just return JSON
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json({ error: "❌ Export failed" }, { status: 500 });
  }
}
