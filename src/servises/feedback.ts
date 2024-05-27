import type { Comment } from "../types";
import type { CourseViewModel } from "../models/CourseViewModel";
import {coursesRepositoryCommand} from "../repositories/coursesFromDBCommand"
import { feedbackRepositoryCommand } from "../repositories/feedbackFromDBCommand";
import { coursesRepositoryQueries } from "../repositories/coursesFromDBQueries";
import { usersRepositoryCommand } from "../repositories/usersFromDBCommand";

export const feedbackServises = {
    deleteFeedback: async (id: number):Promise<boolean> => {
        return await feedbackRepositoryCommand.deleteComment(id)
    },
    sendFeedback: async (text: string, user_id: number, course_id: number):Promise<Comment | null> => {
        const user = await usersRepositoryCommand.getUserById(user_id);
        if(!user){
            return null
        }
        const newComment: Comment = {
            id: new Date().getTime(),
            text,
            user_id,
            user_full_name: `${user.first_name} ${user.last_name}`,
            course_id,
            created_at: new Date().toISOString()
        };
        const createdComment = await feedbackRepositoryCommand.createComment(newComment);
        const course: CourseViewModel | null = await coursesRepositoryQueries.getCourseById(course_id);
        if(course){
            await coursesRepositoryCommand.updateCourse(course_id, course.name, [...course.comments, createdComment]);
        }else{
            return null
        }
        return createdComment;
    } 
}