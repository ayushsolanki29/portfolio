import mongoose, { Schema, Document } from "mongoose";

interface IProject extends Document {
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  slug: string;
  githubUrl?: string;
  liveUrl?: string;
  techStacks: Schema.Types.ObjectId[]; // References to TechStack
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  githubUrl: { type: String },
  liveUrl: { type: String },
  techStacks: [{ type: Schema.Types.ObjectId, ref: "TechStack" }], // Reference to TechStack
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema);
