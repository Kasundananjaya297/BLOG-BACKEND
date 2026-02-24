import User from '../models/userModels';
import { IUser } from '../interfaces/userInterface';

const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch user from the database');
  }
};

const saveUser = async (userDetails: IUser) => {
  try {
    const user = new User(userDetails);
    await user.save();
    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to add user to the database');
  }
};

const updateProfileImageRepo = async (email: string, imageUrl: string) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { profileImage: imageUrl },
      { new: true }
    );
    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update user profile image in the database');
  }
};

export { findUserByEmail, saveUser, updateProfileImageRepo };
