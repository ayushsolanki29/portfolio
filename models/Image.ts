import mongoose, { Schema, Document } from "mongoose";

interface IImage extends Document {
  imageUrl: string;
  projectId?: Schema.Types.ObjectId; // Optional reference to Project
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema: Schema = new Schema({
  imageUrl: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "Project" }, // Optional reference to Project
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Image ||
  mongoose.model<IImage>("Image", ImageSchema);
