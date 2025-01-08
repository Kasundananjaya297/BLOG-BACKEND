import mongoose, { Schema, Document } from 'mongoose';

interface IImageSection extends Document {
  title: string;
  description: string;
  image: string;
  location: string;
}
const imageSectionSchema: Schema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    location: { type: String, require: true },
  },
  { timestamps: true },
);

export default mongoose.model<IImageSection>(
  'ImageSection',
  imageSectionSchema,
);
