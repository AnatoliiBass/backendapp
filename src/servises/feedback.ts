import type { Comment, Course } from "../types";
import type { CourseViewModel } from "../models/CourseViewModel";
import {coursesRepositoryCommand} from "../repositories/coursesFromDBCommand"
import { authorsRepositoryQueries } from "../repositories/authorsFromDBQueries";
import { authorsRepositoryCommand } from "../repositories/authorsFromDBCommand";
import { feedbackRepositoryCommand } from "../repositories/feedbackFromDBCommand";

export const feedbackServises = {
    deleteFeedback: async (id: number):Promise<boolean> => {
        return await feedbackRepositoryCommand.deleteComment(id)
    },
    sendFeedback: async (text: string, user_id: number, course_id: number):Promise<Comment | null> => {
        const newComment: Comment = {
            id: new Date().getTime(),
            text,
            user_id,
            course_id
        };
        return await feedbackRepositoryCommand.createComment(newComment)
    } 
}