import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
  toolId: string;
  toolName: string;
  category: string;
  userId?: string;
  action: 'view' | 'use';
  timestamp: Date;
  sessionId?: string;
}

const AnalyticsSchema: Schema = new Schema(
  {
    toolId: {
      type: String,
      required: true,
      index: true,
    },
    toolName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      index: true,
    },
    action: {
      type: String,
      enum: ['view', 'use'],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    sessionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for common queries
AnalyticsSchema.index({ timestamp: -1, action: 1 });
AnalyticsSchema.index({ toolId: 1, timestamp: -1 });
AnalyticsSchema.index({ category: 1, timestamp: -1 });

export default mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
