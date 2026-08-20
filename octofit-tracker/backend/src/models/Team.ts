import mongoose, { Document, Schema } from 'mongoose';

export interface Team extends Document {
  name: string;
  motto: string;
  members: mongoose.Types.ObjectId[];
}

const teamSchema = new Schema<Team>({
  name: { type: String, required: true },
  motto: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<Team>('Team', teamSchema);