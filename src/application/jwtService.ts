import { setting } from "../setting";
import type { User } from "../types";
import jwt from "jsonwebtoken";
export const jwtService = {
    generateToken: async (user: User): Promise<{token: string, refreshToken: string}> => {
        const token = jwt.sign({ id: user.id, role: user.role}, setting.JWT_SECRET, { expiresIn: "1m" });
        const refreshToken = jwt.sign({date: new Date().toUTCString(), id: user.id}, setting.JWT_REFRESH_SECRET, { expiresIn: "5m" });
        return { token, refreshToken };
    },
    verifyToken: async (token: string): Promise<number | null> => {
        try {
            const decoded: string | jwt.JwtPayload = jwt.verify(token, setting.JWT_SECRET);
            console.log("decoded", decoded);
            if (typeof decoded === 'string') {
                return null;
            }
            return parseInt(decoded.id);
        } catch(err) {
            console.log("Error", err);
            return null;
        }
    },
    verifyRefreshToken: async (token: string): Promise<{user_id: number, date: string} | null> => {
        try {
            const decoded: string | jwt.JwtPayload = jwt.verify(token, setting.JWT_REFRESH_SECRET);
            if (typeof decoded === 'string') {
                return null;
            }
            if (decoded.date <= new Date().toUTCString()) {
                return null;
            }
            return {user_id: parseInt(decoded.id), date: decoded.date};
        } catch(err) {
            return null;
        }
    }
};