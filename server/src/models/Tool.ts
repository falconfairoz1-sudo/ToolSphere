import mongoose, { Document, Schema } from 'mongoose';

export interface ITool extends Document {
  id: string;
  name: string;
  description: string;
  category: string;
  route: string;
  tags: string[];
  trending: boolean;
  new: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ToolSchema: Schema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    route: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    trending: {
      type: Boolean,
      default: false,
      index: true,
    },
    new: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for common queries
ToolSchema.index({ category: 1, trending: 1 });
ToolSchema.index({ trending: 1, new: 1 });

export default mongoose.model<ITool>('Tool', ToolSchema);
