import { setting } from "../setting";
import type { User } from "../types";
import jwt from "jsonwebtoken";
export const jwtService = {
    generateToken: async (user: User): Promise<string> => {
        const token = jwt.sign({ id: user.id, role: user.role}, setting.JWT_SECRET, { expiresIn: "1h" });
        return token;
    },
    verifyToken: async (token: string): Promise<string | null> => {
        try {
            const decoded: string | jwt.JwtPayload = jwt.verify(token, setting.JWT_SECRET);
            if (typeof decoded === 'string') {
                return null;
            }
            return decoded.id.toString();
        } catch(err) {
            return null;
        }
    }
};