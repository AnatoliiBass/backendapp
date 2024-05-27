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
exports.feedbackServises = void 0;
const coursesFromDBCommand_1 = require("../repositories/coursesFromDBCommand");
const feedbackFromDBCommand_1 = require("../repositories/feedbackFromDBCommand");
const coursesFromDBQueries_1 = require("../repositories/coursesFromDBQueries");
const usersFromDBCommand_1 = require("../repositories/usersFromDBCommand");
exports.feedbackServises = {
    deleteFeedback: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield feedbackFromDBCommand_1.feedbackRepositoryCommand.deleteComment(id);
    }),
    sendFeedback: (text, user_id, course_id) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield usersFromDBCommand_1.usersRepositoryCommand.getUserById(user_id);
        if (!user) {
            return null;
        }
        const newComment = {
            id: new Date().getTime(),
            text,
            user_id,
            user_full_name: `${user.first_name} ${user.last_name}`,
            course_id,
            created_at: new Date().toISOString()
        };
        const createdComment = yield feedbackFromDBCommand_1.feedbackRepositoryCommand.createComment(newComment);
        const course = yield coursesFromDBQueries_1.coursesRepositoryQueries.getCourseById(course_id);
        if (course) {
            yield coursesFromDBCommand_1.coursesRepositoryCommand.updateCourse(course_id, course.name, [...course.comments, createdComment]);
        }
        else {
            return null;
        }
        return createdComment;
    })
};
//# sourceMappingURL=feedback.js.map