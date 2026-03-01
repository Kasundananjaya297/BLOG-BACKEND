import mongoose, { Schema, Document } from 'mongoose';

export type ReportReason = 'spam' | 'inappropriate' | 'misinformation' | 'harassment' | 'other';
export type ReportStatus = 'pending' | 'reviewed' | 'dismissed';

export interface IReport extends Document {
    articleId: mongoose.Types.ObjectId;
    reporterId: string;
    reporterName: string;
    reason: ReportReason;
    details?: string;
    status: ReportStatus;
    createdAt: Date;
    updatedAt: Date;
}

const reportSchema: Schema = new Schema(
    {
        articleId: { type: Schema.Types.ObjectId, ref: 'Articles', required: true },
        reporterId: { type: String, required: true },
        reporterName: { type: String, required: true },
        reason: {
            type: String,
            enum: ['spam', 'inappropriate', 'misinformation', 'harassment', 'other'],
            required: true,
        },
        details: { type: String, default: '' },
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'dismissed'],
            default: 'pending',
        },
    },
    { timestamps: true },
);

// One report per user per post
reportSchema.index({ articleId: 1, reporterId: 1 }, { unique: true });

export default mongoose.model<IReport>('Reports', reportSchema);
