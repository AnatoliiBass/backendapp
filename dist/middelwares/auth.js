"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const jwtService_1 = require("../application/jwtService");
const users_1 = require("../servises/users");
const httpstatuses_1 = require("../utils/httpstatuses");
const authValidation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Auth validation", req.headers.authorization);
    if (!req.headers.authorization) {
        return res.status(httpstatuses_1.HTTP_STATUSES.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token", token);
    if (!token) {
        return res.status(httpstatuses_1.HTTP_STATUSES.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    try {
        const user = yield jwtService_1.jwtService.verifyToken(token);
        console.log("User", user);
        if (user) {
            console.log("Refresh token: ", req.cookies.refreshtoken);
            req.body.user_id = user;
            req.body.newToken = null;
            return next();
        }
        else {
            const refreshToken = req.cookies.refreshtoken;
            console.log("Refresh token from cookies", req.cookies.refreshtoken);
            const obj = yield jwtService_1.jwtService.verifyRefreshToken(refreshToken);
            if (obj) {
                const currentUser = yield users_1.usersServises.getUserById(obj.user_id);
                if (currentUser) {
                    const newToken = yield jwtService_1.jwtService.generateToken(currentUser);
                    const userNext = yield jwtService_1.jwtService.verifyToken(newToken.token);
                    if (!userNext) {
                        return res.status(httpstatuses_1.HTTP_STATUSES.UNAUTHORIZED).json({ message: "Unauthorized" });
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
    }
    catch (error) {
        console.error("Error during authentication validation", error);
        return res.status(httpstatuses_1.HTTP_STATUSES.UNAUTHORIZED).json({ message: "Refresh and Access tokens are expired. Try to login again." });
    }
    return res.status(httpstatuses_1.HTTP_STATUSES.UNAUTHORIZED).json({ message: "Unauthorized" });
});
exports.authValidation = authValidation;
//# sourceMappingURL=auth.js.map