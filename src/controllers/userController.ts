import { Request, Response, NextFunction } from 'express';
import { createUserService, logUserService, updateProfileImageService, getProfileService, getProfileByIdService } from '../services/userServices';
import { syncUserByEmail } from '../services/userSyncService';
import { responseDTO, userDTO } from '../DTO/response';

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userDetails = req.body;
  let user;
  try {
    if (!userDetails.email || !userDetails.role || !userDetails.fname || !userDetails.lname) {
      res.status(400).json(responseDTO('false', [], 'Empty Fields'));
      return;
    }
    user = await createUserService(userDetails);
    res
      .status(200)
      .json(
        responseDTO(user.success.toString(), [], user.message),
      );
  } catch (err) {
    console.error(err);
    res.status(500).json(responseDTO('false', [], 'Failed to Save user'));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const loginDetails = req.body;
  let user;
  try {
    user = await logUserService(loginDetails.email);
    if (user && user.success == 'true') {
      res.status(200).json(responseDTO('true', user?.data, user.message));
    } else {
      res.status(403).json(responseDTO('false', [], user.message));
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(responseDTO('false', [], 'internal Server Error'));
  }
};

const updateProfileImage = async (req: any, res: Response, next: NextFunction) => {
  const { imageUrl } = req.body;
  const email = req.user?.email;

  if (!email || !imageUrl) {
    res.status(400).json(responseDTO('false', [], 'Missing email or imageUrl'));
    return;
  }

  try {
    const result = await updateProfileImageService(email, imageUrl);
    if (result.success === 'true') {
      res.status(200).json(responseDTO('true', result.data, result.message));
    } else {
      res.status(404).json(responseDTO('false', [], result.message));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};

const getProfile = async (req: any, res: Response, next: NextFunction) => {
  const email = req.user?.email;

  if (!email) {
    res.status(401).json(responseDTO('false', [], 'Unauthorized'));
    return;
  }

  try {
    // Before fetching, force a sync from MySQL to ensure we have the latest address info
    await syncUserByEmail(email);

    const result = await getProfileService(email);
    if (result.success === 'true') {
      res.status(200).json(responseDTO('true', result.data, result.message));
    } else {
      res.status(404).json(responseDTO('false', [], result.message));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};

const getUserProfileById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json(responseDTO('false', [], 'Missing user ID'));
    return;
  }

  try {
    const result = await getProfileByIdService(id);
    if (result.success === 'true') {
      res.status(200).json(responseDTO('true', result.data, result.message));
    } else {
      res.status(404).json(responseDTO('false', [], result.message));
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};

export { registerUser, loginUser, updateProfileImage, getProfile, getUserProfileById };
