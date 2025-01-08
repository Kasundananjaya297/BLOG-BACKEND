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
const getAllAbout = async (req: Request, res: Response, next: NextFunction) => {
  let aboutResponse;
  try {
    aboutResponse = await aboutServices.getAllAboutService();
    if (aboutResponse.success === 'true') {
      res
        .status(200)
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
const getLatestAbout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let aboutResponse;
  try {
    aboutResponse = await aboutServices.getLatestAboutService();
    if (aboutResponse.success === 'true') {
      res
        .status(200)
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
const updateAbout = async (req: Request, res: Response, next: NextFunction) => {
  const about = req.body;
  const id = req.params.id;
  let aboutResponse;
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).json(responseDTO('false', [], 'Invalid id'));
  }
  try {
    if (!about) {
      res.status(400).json(responseDTO('false', [], 'Invalid request'));
    }
    aboutResponse = await aboutServices.updateAboutService(about, id);
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

export { saveAbout, getAllAbout, getLatestAbout, updateAbout };
