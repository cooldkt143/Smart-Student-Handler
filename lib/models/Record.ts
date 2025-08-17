import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRecord extends Document {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  studentId: string;
  major: string;
  year: string;
  gpa: number;
  avatar: string;
}

const RecordSchema: Schema<IRecord> = new Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  dateOfBirth: String,
  studentId: String,
  major: String,
  year: String,
  gpa: Number,
  avatar: String,
});

export const Record: Model<IRecord> =
  mongoose.models.Record || mongoose.model<IRecord>("Record", RecordSchema);
