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
const logUser = async (email: string, password: string) => {
  try {
    const user = await userRepo.findUserByEmail(email);
    if (!user) {
      return { success: 'false', message: 'User not Exists' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.info(`User Logged Successfully ${email}`);

      return {
        success: 'true',
        data: { email: user.email, role: user.role, token: 'asadasd asdasd ' },
        message: 'Login successfully',
      };
    } else {
      return { success: 'false', message: 'Password Missed match' };
    }
  } catch (err) {
    console.log(err);
    return { success: 'false', message: 'Internal server error' };
  }
};
export { createUser, logUser };
