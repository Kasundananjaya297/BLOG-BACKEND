import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  email: string;
  name: string;
  role: string;
  password: string;
}

const userSchema: Schema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    role: { type: String, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('Users', userSchema);
