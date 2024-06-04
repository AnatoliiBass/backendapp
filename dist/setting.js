"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setting = void 0;
exports.setting = {
    MONGO_URI: process.env.MONGO_URI || "mongodb+srv://anatolii:oy9CmAVu1orhHfkw@cluster0.rmiojst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    JWT_SECRET: process.env.JWT_SECRET || "secret1234",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH || "refresh4567",
    RESEND_API_KEY: process.env.RESEND_API_KEY || "re_HjabNQNy_4LTcXVrXcjUkMbGnU4j8j59G",
    PROJECT_URL: process.env.PROJECT_URL || "https://backendapp-rouge.vercel.app" || "http://localhost:3003",
    CLIENT_URL: process.env.CLIENT_URL || "https://frontendapp-rouge.vercel.app" || "http://localhost:3000",
};
//# sourceMappingURL=setting.js.map