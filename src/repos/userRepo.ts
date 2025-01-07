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

export { findUserByEmail, saveUser };
