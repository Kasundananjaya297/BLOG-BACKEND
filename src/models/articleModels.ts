import mongoose, { Schema, Document } from 'mongoose';

interface IArticle extends Document {
  title: string;
  subtitle: string;
  images: string;
  category: string;
  content: string;
}

const articleSchema: Schema = new Schema(
  {
    title: { type: String, require: true },
    subtitle: { type: String, require: true },
    images: { type: String, require: false },
    category: { type: String, require: false },
    content: { type: String, require: false },
  },
  { timestamps: true },
);

export default mongoose.model<IArticle>('Articles', articleSchema);
