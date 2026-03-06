import User from '../models/userModels';
import Article from '../models/articleModels';
import Comment from '../models/commentModels';
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

    if (user) {
      const authorIds = [user.id || (user as any)._id.toString()];
      if (user.mysqlId) {
        authorIds.push(user.mysqlId.toString());
      }

      // Sync the new profile image to all of the user's articles
      await Article.updateMany(
        { authorId: { $in: authorIds } },
        { authorProfileImage: imageUrl }
      );

      // Sync the new profile image to all of the user's comments
      await Comment.updateMany(
        { authorId: { $in: authorIds } },
        { authorProfileImage: imageUrl }
      );
    }

    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to update user profile image in the database');
  }
};

const findUserById = async (id: string) => {
  try {
    const user = await User.findOne({
      $or: [
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
        { mysqlId: !isNaN(Number(id)) ? Number(id) : null }
      ]
    });
    return user;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to fetch user by id from the database');
  }
};

export { findUserByEmail, saveUser, updateProfileImageRepo, findUserById };
