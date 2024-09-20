import mongoose, { Schema, Document } from 'mongoose';

interface ITechStack extends Document {
  name: string;
  role: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const TechStackSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.TechStack || mongoose.model<ITechStack>('TechStack', TechStackSchema);
