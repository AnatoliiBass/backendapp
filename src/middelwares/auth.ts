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

    try {
        const user = await jwtService.verifyToken(token);
        console.log("User", user);
        if (user) {
            console.log("Refresh token: ", req.cookies.refreshtoken);
            req.body.user_id = user;
            req.body.newToken = null;
            return next();
        } else {
            const refreshToken = req.cookies.refreshtoken;
            console.log("Refresh token from cookies", req.cookies.refreshtoken);
            const obj = await jwtService.verifyRefreshToken(refreshToken);
            if (obj) {
                const currentUser = await usersServises.getUserById(obj.user_id);
                if (currentUser) {
                    const newToken = await jwtService.generateToken(currentUser);
                    const userNext = await jwtService.verifyToken(newToken.token);
                    if (!userNext) {
                        return res.status(401).json({ message: "Unauthorized" });
                    }
                    res.cookie("refreshtoken", newToken.refreshToken, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 5,
                    });
                    req.body.user_id = userNext;
                    req.body.newToken = newToken.token;
                    return next();
                }
            }
        }
    } catch (error) {
        console.error("Error during authentication validation", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(401).json({ message: "Unauthorized" });
};