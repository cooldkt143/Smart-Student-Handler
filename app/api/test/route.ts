import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: "✅ MongoDB is connected!" });
  } catch (error) {
    return NextResponse.json({ status: "❌ MongoDB connection failed" }, { status: 500 });
  }
}
