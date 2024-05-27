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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = void 0;
const setting_1 = require("../setting");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.jwtService = {
    generateToken: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, setting_1.setting.JWT_SECRET, { expiresIn: "1h" });
        return token;
    }),
    verifyToken: (token) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, setting_1.setting.JWT_SECRET);
            if (typeof decoded === 'string') {
                return null;
            }
            return parseInt(decoded.id);
        }
        catch (err) {
            return null;
        }
    })
};
//# sourceMappingURL=jwtService.js.map