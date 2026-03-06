import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    articleId: mongoose.Types.ObjectId;
    authorId: string;
    authorName: string;
    authorProfileImage?: string;
    content: string;
    image?: string;
    parentId?: mongoose.Types.ObjectId; // For replies
    repliesCount: number;
    status: 'active' | 'deleted';
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema: Schema = new Schema(
    {
        articleId: { type: Schema.Types.ObjectId, ref: 'Articles', required: true },
        authorId: { type: String, required: true },
        authorName: { type: String, required: true },
        authorProfileImage: { type: String },
        content: { type: String, required: true },
        image: { type: String },
        parentId: { type: Schema.Types.ObjectId, ref: 'Comments', default: null },
        repliesCount: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ['active', 'deleted'],
            default: 'active',
        },
    },
    { timestamps: true },
);

// Index for faster lookups
commentSchema.index({ articleId: 1, parentId: 1, createdAt: -1 });

export default mongoose.model<IComment>('Comments', commentSchema);
