import mongoose, { Document, Schema } from 'mongoose';

export interface IHelpTicket extends Document {
  userId?: mongoose.Types.ObjectId;
  userName: string;
  userEmail: string;
  toolId: string;
  toolName: string;
  issueType: 'bug' | 'feature-request' | 'question' | 'other';
  priority: 'low' | 'medium' | 'high';
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  adminNotes?: string;
  resolvedBy?: mongoose.Types.ObjectId;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const HelpTicketSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    userName: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    userEmail: {
      type: String,
      required: [true, 'Please provide your email'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    toolId: {
      type: String,
      required: [true, 'Please specify the tool'],
    },
    toolName: {
      type: String,
      required: [true, 'Please specify the tool name'],
    },
    issueType: {
      type: String,
      enum: ['bug', 'feature-request', 'question', 'other'],
      required: [true, 'Please specify the issue type'],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true,
      maxlength: [200, 'Subject cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
      maxlength: [2000, 'Description cannot be more than 2000 characters'],
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },
    adminNotes: {
      type: String,
      trim: true,
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    resolvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
HelpTicketSchema.index({ status: 1, createdAt: -1 });
HelpTicketSchema.index({ userEmail: 1 });
HelpTicketSchema.index({ toolId: 1 });

export default mongoose.model<IHelpTicket>('HelpTicket', HelpTicketSchema);
