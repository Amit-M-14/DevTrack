import mongoose , { Schema, model, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  summary: string;
  status: 'To Do' | 'In Progress' | 'Done'; 
  projectId: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' }, // <-- Changed to 'Done'
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }
}, { timestamps: true });

export const Task = model<ITask>('Task', TaskSchema);