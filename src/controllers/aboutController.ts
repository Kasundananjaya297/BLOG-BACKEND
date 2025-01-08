import { Request, Response, NextFunction } from 'express';
import { responseDTO } from '../DTO/response';
import * as aboutServices from '../services/aboutServices';

const saveAbout = async (req: Request, res: Response, next: NextFunction) => {
  const about = req.body;
  let aboutResponse;
  try {
    if (!about) {
      res.status(400).json(responseDTO('false', [], 'Invalid request'));
    }
    aboutResponse = await aboutServices.saveAboutService(about);
    if (aboutResponse.success === 'true') {
      res
        .status(201)
        .json(
          responseDTO(
            aboutResponse.success,
            aboutResponse.data,
            aboutResponse.message,
          ),
        );
    } else {
      res
        .status(400)
        .json(
          responseDTO(
            aboutResponse.success,
            aboutResponse.data,
            aboutResponse.message,
          ),
        );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
  }
};

export { saveAbout };
