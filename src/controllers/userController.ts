import { Request, Response, NextFunction } from "express";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    
    res.send(req.body);
}