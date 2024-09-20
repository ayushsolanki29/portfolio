import mongoose, { Schema, Document } from "mongoose";

interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  query: string;
  other: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  query: { type: String, required: true },
  other: { type: String }, // Optional field for additional query details
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);
