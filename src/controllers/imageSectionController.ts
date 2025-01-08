import { Request, Response, NextFunction } from 'express';
import { responseDTO } from '../DTO/response';
import * as imageSectionServices from '../services/imageSectionServices';

const saveImageSection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    let imageSectionResponse;
    try {
        imageSectionResponse = await imageSectionServices.saveImageSectionService(
        req.body,
        );
        if (imageSectionResponse.success === 'true') {
        res
            .status(200)
            .json(
            responseDTO(
                imageSectionResponse.success,
                imageSectionResponse.data,
                imageSectionResponse.message,
            ),
            );
        } else {
        res
            .status(400)
            .json(
            responseDTO(
                imageSectionResponse.success,
                imageSectionResponse.data,
                imageSectionResponse.message,
            ),
            );
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(responseDTO('false', [], 'Internal Server Error'));
    }
};

export { saveImageSection };
