export type CourseViewModel = {
    /**
     * The course identifier with id and name.
     */
    id: number;
    name: string;
    author: {
        first_name: string;
        last_name: string;
    }
}