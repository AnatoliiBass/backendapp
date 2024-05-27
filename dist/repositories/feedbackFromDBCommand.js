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
exports.feedbackRepositoryCommand = void 0;
const db_1 = require("../db/db");
exports.feedbackRepositoryCommand = {
    deleteComment: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.comments.deleteOne({ id });
        return result.deletedCount === 1;
    }),
    createComment: (comment) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db_1.comments.insertOne(comment);
        const commentSaved = yield db_1.comments.findOne({ id: comment.id });
        return {
            id: commentSaved.id,
            text: commentSaved.text,
            user_id: commentSaved.user_id,
            user_full_name: commentSaved.user_full_name,
            course_id: commentSaved.course_id,
            created_at: commentSaved.created_at
        };
    }),
};
//# sourceMappingURL=feedbackFromDBCommand.js.map