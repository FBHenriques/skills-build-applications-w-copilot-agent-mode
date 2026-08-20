import mongoose, { Document, Schema } from 'mongoose';

export interface LeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  points: number;
  rank: number;
}

const leaderboardSchema = new Schema<LeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, required: true, min: 0 },
  rank: { type: Number, required: true, min: 1 },
});

export default mongoose.model<LeaderboardEntry>('Leaderboard', leaderboardSchema);