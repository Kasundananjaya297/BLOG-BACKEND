import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  mysqlId: number;
  fname: string;
  lname: string;
  email: string;
  gender: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  role: string;
  contact: string;
  company?: string;
  password?: string;
  status: 'pending' | 'active' | 'rejected';
  profileImage?: string;
}

const userSchema: Schema = new Schema(
  {
    mysqlId: { type: Number, required: true, unique: true },
    email: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    gender: { type: String, required: true },
    addressLine1: { type: String, required: false },
    addressLine2: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipCode: { type: String, required: false },
    country: { type: String, required: false },
    role: { type: String, required: true },
    contact: { type: String, required: true },
    company: { type: String, required: false },
    password: { type: String, required: false },
    status: {
      type: String,
      enum: ['pending', 'active', 'rejected'],
      default: 'active',
    },
    profileImage: { type: String, required: false },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('Users', userSchema);
