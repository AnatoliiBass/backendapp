import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HTTP_STATUSES } from "../utils/httpstatuses";

export const standartValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log("Errors: ", errors.array());
        return res.status(HTTP_STATUSES.BAD_REQUEST).json({ errors: errors.array() });
    }else{
        next();
    }
};