import { Schema, model, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
}

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true }
}, { timestamps: true });

export const Project = model<IProject>('Project', ProjectSchema);