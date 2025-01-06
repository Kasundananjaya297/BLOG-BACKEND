import { IUser } from '../interfaces/userInterface';
import bcrypt from 'bcrypt';
import User from '../models/userModal';
import * as userRepo from '../repos/userRepo';

const saltRounds = 10;

const createUser = async (userDetails: IUser) => {
  try {
    const hashedPw = await bcrypt.hash(userDetails.password, saltRounds);

    const existUser = await userRepo.findUserByEmail(userDetails.email);
    if (existUser) {
      console.warn(`User Already Exists ${userDetails.email} `);
      return { success: false, message: 'User already Exist' };
    }
    const user = new User({
      ...userDetails,
      password: hashedPw,
    });
    await userRepo.saveUser(user);
    console.info(`User Saved Successfully ${userDetails.email}`);
    return { success: 'true', data: user, message: 'User added successfully' };
  } catch (err) {
    console.error('Failed to add user', err);
    return { success: 'false', message: 'Failed to add user' };
  }
};

export { createUser };
