import type { DbCourses } from "../types";

export const db: DbCourses ={
    courses: [
        {
            id: 1,
            name: 'front-end',
            studentsAmount: 10
        },
        {
            id: 2,
            name: 'back-end',
            studentsAmount: 20
        },
        {
            id: 3,
            name: 'devops',
            studentsAmount: 30
        },
        {
            id: 4,
            name: 'fullstack',
            studentsAmount: 40
        }
    ]

}