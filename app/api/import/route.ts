import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Record } from "@/lib/models/Record";
import recordData from "@/data/record.json"; // Import JSON file

export async function POST() {
  try {
    await connectDB();

    // Check if record already exists (by studentId or email)
    const existing = await Record.findOne({ studentId: recordData.studentId });
    if (existing) {
      return NextResponse.json({ message: "⚠️ Record already exists" });
    }

    // Insert into MongoDB
    const newRecord = new Record(recordData);
    await newRecord.save();

    return NextResponse.json({ message: "✅ Data imported into MongoDB", record: newRecord });
  } catch (error) {
    return NextResponse.json({ error: "❌ Import failed" }, { status: 500 });
  }
}
