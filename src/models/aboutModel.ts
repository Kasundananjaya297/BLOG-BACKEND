import mongoose, { Schema, Document } from 'mongoose';

interface IAbout extends Document {
  title: string;
  description: string;
  image: string;
}

const aboutSchema: Schema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true },
);
export default mongoose.model<IAbout>('About', aboutSchema);
