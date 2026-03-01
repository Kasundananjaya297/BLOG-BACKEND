import { IUser } from '../interfaces/userInterface';
import User from '../models/userModels';
import * as userRepo from '../repos/userRepo';
import { userDTO } from '../DTO/response';
import Jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET as string;

// Note: Registration is handled in the main import-export application.
// Blog Backend receives users via MySQL one-time sync or lazy sync.
const createUserService = async (userDetails: IUser) => {
  return { success: 'false', message: 'Registration is not allowed here. Create account via import-export system.' };
};

// LogUserService here mainly serves to issue a Blog-specific token, 
// assuming the user was already authenticated via import-export and lazy synced.
// For the sake of matching existing frontend requests if any:
const logUserService = async (email: string) => {
  try {
    const user = await userRepo.findUserByEmail(email);
    if (!user) {
      return { success: 'false', message: 'User not Exists' };
    }

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
  } catch (err) {
    console.log(err);
    return { success: 'false', message: 'Internal server error' };
  }
};

const updateProfileImageService = async (email: string, imageUrl: string) => {
  try {
    const user = await userRepo.updateProfileImageRepo(email, imageUrl);
    if (!user) {
      return { success: 'false', message: 'User not found' };
    }
    return { success: 'true', message: 'Profile image updated successfully', data: user };
  } catch (err) {
    console.log(err);
    return { success: 'false', message: 'Internal server error' };
  }
};

const getProfileService = async (email: string) => {
  try {
    const user = await userRepo.findUserByEmail(email);
    if (!user) {
      return { success: 'false', message: 'User not found' };
    }
    return { success: 'true', message: 'Profile retrieved successfully', data: user };
  } catch (err) {
    console.log(err);
    return { success: 'false', message: 'Internal server error' };
  }
};

const getProfileByIdService = async (id: string) => {
  try {
    const user = await userRepo.findUserById(id);
    if (!user) {
      return { success: 'false', message: 'User not found' };
    }
    // Return a sanitized version of the user for public viewing
    const publicProfile = {
      _id: user._id,
      mysqlId: user.mysqlId,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      createdAt: (user as any).createdAt,
    };
    return { success: 'true', message: 'Profile retrieved successfully', data: publicProfile };
  } catch (err) {
    console.log(err);
    return { success: 'false', message: 'Internal server error' };
  }
};

export { createUserService, logUserService, updateProfileImageService, getProfileService, getProfileByIdService };
