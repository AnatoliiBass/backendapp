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

export type CourseViewModelObject = {
    courses: CourseViewModel[];
    total: number;
    page: number;
    per_page: number;
}