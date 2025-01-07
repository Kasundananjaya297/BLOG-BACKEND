import mongoose, { Schema, Document } from 'mongoose';

interface IArticle extends Document {
  title: string;
  author: string;
  content: string;
  images: string[];
}

const articleSchema: Schema = new Schema({
  title: { type: String, require: true },
  author: { type: String, require: true },
  content: { type: String, require: true },
  images: { type: [String], require: false },
});

export default mongoose.model<IArticle>('Articles', articleSchema);
