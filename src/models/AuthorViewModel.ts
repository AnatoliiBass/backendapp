export type AuthorViewModel = {
    /**
     * The course identifier with id and name.
     */
    id: number;
    first_name: string;
    last_name: string;
    courses: {
        id: number;
        name: string;
    }[];
}