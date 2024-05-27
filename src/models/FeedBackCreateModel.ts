export type FeedBackCreateModel = {
    /**
     * The feedback author.
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