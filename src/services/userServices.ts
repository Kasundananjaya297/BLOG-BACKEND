import { IUser } from '../interfaces/userInterface';
import bcrypt from 'bcrypt';
import User from '../models/userModels';
import * as userRepo from '../repos/userRepo';
import { userDTO } from '../DTO/response';
import { JsonWebTokenError } from 'jsonwebtoken';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const saltRounds = 10;
dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;

const createUserService = async (userDetails: IUser) => {
  try {
    const hashedPw = await bcrypt.hash(userDetails.password, saltRounds);
    const existUser = await userRepo.findUserByEmail(userDetails.email);
    if (existUser) {
      console.warn(`User Already Exists ${userDetails.email} `);
      return {
        success: false,
        data: existUser,
        message: 'User already Exist',
      };
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

const logUserService = async (email: string, password: string) => {
  try {
    const user = await userRepo.findUserByEmail(email);
    if (!user) {
      return { success: 'false', message: 'User not Exists' };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.info(`User Logged Successfully ${email}`);
      const token = Jwt.sign(
        { email: user.email, role: user.role },
        jwtSecret.toString(),
        { expiresIn: '24h' },
      );
      return {
        success: 'true',
        data: userDTO(user, token),
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

export { createUserService, logUserService };
