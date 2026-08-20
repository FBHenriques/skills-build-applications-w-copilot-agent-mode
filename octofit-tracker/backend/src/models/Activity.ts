import mongoose, { Document, Schema } from 'mongoose';

export interface Activity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  recordedAt: Date;
}

const activitySchema = new Schema<Activity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  calories: { type: Number, required: true, min: 0 },
  recordedAt: { type: Date, default: Date.now },
});

export default mongoose.model<Activity>('Activity', activitySchema);