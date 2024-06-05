export type FeedBackCreateModel = {
    newToken: string | null;
    /**
     * The feedback user.
     */
    user_id: number;
    /**
     * The feedback course.
     */
    course_id: number;
    /**
     * The feedback message.
     */
    comment: string;
};