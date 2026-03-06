import mongoose, { Schema, Document } from 'mongoose';

interface IArticle extends Document {
  title: string;
  subtitle: string;
  images: string;
  category: string;
  content: string;
  authorName: string;
  authorEmail: string;
  authorId: string;
  authorProfileImage: string;
  likes: string[];
  commentsCount: number;
}

const articleSchema: Schema = new Schema(
  {
    title: { type: String, require: false },
    subtitle: { type: String, require: false },
    images: { type: String, require: false },
    category: { type: String, require: false },
    content: { type: String, require: false },
    authorName: { type: String, require: false },
    authorEmail: { type: String, require: false },
    authorId: { type: String, require: false },
    authorProfileImage: { type: String, require: false },
    likes: { type: [String], default: [] },
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model<IArticle>('Articles', articleSchema);
