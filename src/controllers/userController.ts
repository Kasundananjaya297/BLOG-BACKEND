import { Request, Response, NextFunction } from 'express';
import { createUser, logUser } from '../services/userServices';
import { responseDTO } from '../DTO/response';

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userDetails = req.body;
  let user;
  try {
    user = await createUser(userDetails);
    if (user && user.success === 'false') {
      res.status(500).json(responseDTO('false', [], user.message));
    }
    res.status(200).json(responseDTO('true', user?.data, user.message));
  } catch (err) {
    console.error(err);
    res.status(500).json(responseDTO('false', [], 'Failed to Save user'));
  }
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const loginDetails = req.body;
  let user;
  try {
    user = await logUser(loginDetails.email, loginDetails.password);
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

export { registerUser, loginUser };
