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
exports.usersRepositoryCommand = void 0;
const db_1 = require("../db/db");
exports.usersRepositoryCommand = {
    deleteUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.users.deleteOne({ id });
        return result.deletedCount === 1;
    }),
    createUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.users.insertOne(user);
        const userSaved = yield db_1.users.findOne({ id: user.id });
        return {
            id: userSaved.id,
            role: userSaved.role,
            first_name: userSaved.first_name,
            last_name: userSaved.last_name,
            email: userSaved.email,
            phone: userSaved.phone,
            birthdate: userSaved.birthdate,
            password: userSaved.password,
            created_at: userSaved.created_at
        };
    }),
    getUserByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.users.findOne({ email });
        if (!user) {
            return null;
        }
        return {
            id: user.id,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            birthdate: user.birthdate,
            password: user.password,
            created_at: user.created_at
        };
    }),
    getUserById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield db_1.users.findOne({ id });
        if (!user) {
            return null;
        }
        return {
            id: user.id,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            birthdate: user.birthdate,
            password: user.password,
            created_at: user.created_at
        };
    }),
};
//# sourceMappingURL=usersFromDBCommand.js.map