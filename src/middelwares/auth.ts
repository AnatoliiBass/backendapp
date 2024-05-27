import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application/jwtService";

export const authValidation = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await jwtService.verifyToken(token);
    if (user) {
        req.body.user_id = parseInt(user);
        next();
    }
    res.status(401).json({ message: "Unauthorized" });
};