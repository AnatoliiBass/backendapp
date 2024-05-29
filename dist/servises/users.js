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
exports.usersServises = void 0;
const usersFromDBCommand_1 = require("../repositories/usersFromDBCommand");
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = __importDefault(require("uuid"));
const add_1 = require("date-fns/add");
exports.usersServises = {
    createUser(first_name, last_name, role, email, phone, birthdate, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(password, passwordSalt);
            const newUser = {
                id: new Date().getTime(),
                role,
                first_name,
                last_name,
                email,
                phone,
                birthdate,
                password: passwordHash,
                created_at: new Date().toISOString(),
                emailConfirmation: {
                    code: uuid_1.default.v4(),
                    expires_at: (0, add_1.add)(new Date(), { minutes: 3 }).toISOString(),
                    isConfirmed: false
                }
            };
            return yield usersFromDBCommand_1.usersRepositoryCommand.createUser(newUser);
        });
    },
    _generateHash(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(password, salt);
        });
    },
    checkCredentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usersFromDBCommand_1.usersRepositoryCommand.getUserByEmail(email);
            if (!user || !user.emailConfirmation.isConfirmed) {
                return null;
            }
            const result = yield bcrypt_1.default.compare(password, user.password);
            if (result) {
                return user;
            }
            else {
                return null;
            }
        });
    }
};
//# sourceMappingURL=users.js.map