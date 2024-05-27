import { comments } from "../db/db";
import type { Comment } from "../types";

export const feedbackRepositoryCommand = {
    deleteComment: async (id: number):Promise<boolean> => {
        const result = await comments.deleteOne({id});
        return result.deletedCount === 1;
    },
    createComment: async (comment: Comment):Promise<Comment> => {
        const result = await comments.insertOne(comment);
        const commentSaved = await comments.findOne({id: comment.id});
        return {
            id: commentSaved.id,
            text: commentSaved.text,
            user_id: commentSaved.user_id,
            user_full_name: commentSaved.user_full_name,
            course_id: commentSaved.course_id,
            created_at: commentSaved.created_at
        };
    },
}