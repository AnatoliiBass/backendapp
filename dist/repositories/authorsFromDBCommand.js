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
exports.authorsRepositoryCommand = void 0;
const db_1 = require("../db/db");
const getViewModelAuthor_1 = require("../utils/getViewModelAuthor");
exports.authorsRepositoryCommand = {
    deleteAuthor: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.authors.deleteOne({ id });
        return result.deletedCount === 1;
    }),
    createAuthor: (author) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.authors.insertOne(author);
        const authorSaved = yield db_1.authors.findOne({ id: author.id });
        return { id: authorSaved.id, first_name: authorSaved.first_name, last_name: authorSaved.last_name };
    }),
    updateAuthor: (id, first_name, last_name) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.authors.updateOne({ id }, { $set: { first_name, last_name } });
        if (!result.matchedCount) {
            return null;
        }
        else {
            const getAuthor = yield db_1.authors.findOne({ id });
            if (!getAuthor) {
                return null;
            }
            const coursesByAuthor = yield db_1.courses.find({ author_id: getAuthor.id }).toArray();
            return (0, getViewModelAuthor_1.getViewModelAuthor)(coursesByAuthor, getAuthor);
        }
    })
};
//# sourceMappingURL=authorsFromDBCommand.js.map