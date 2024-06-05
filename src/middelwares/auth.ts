import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application/jwtService";
import { usersServises } from "../servises/users";

export const authValidation = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Auth validation", req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
    console.log("Token", token);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await jwtService.verifyToken(token);
    console.log("User", user);
    if (user) {
        console.log("Refresh token: ", req.cookies.refreshToken);
        req.body.user_id = user;
        req.body.newToken = null;
        next();
    }else{
        const refreshToken = req.cookies.refreshToken;
        const obj = await jwtService.verifyRefreshToken(refreshToken);
        if (obj) {
            const currentUser = await usersServises.getUserById(obj.user_id);
            if (currentUser) {
                const newToken = await jwtService.generateToken(currentUser);
                const userNext = await jwtService.verifyToken(newToken.token);
                if (!userNext) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                res.cookie("refreshToken", newToken.refreshToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 5,
                });
                req.body.user_id = userNext;
                req.body.newToken = newToken.token;
                next();
            }
        }
        res.status(401).json({ message: "Unauthorized" });
    }
};