import mongoose, { Document, Schema } from 'mongoose';

export interface Workout extends Document {
  name: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
  exercises: { name: string; sets: number; reps: number }[];
}

const workoutSchema = new Schema<Workout>({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  exercises: [{
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
  }],
});

export default mongoose.model<Workout>('Workout', workoutSchema);