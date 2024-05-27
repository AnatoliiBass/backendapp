import type { Comment, Course } from "../types";
import type { CourseViewModel } from "../models/CourseViewModel";
import {coursesRepositoryCommand} from "../repositories/coursesFromDBCommand"
import { authorsRepositoryQueries } from "../repositories/authorsFromDBQueries";
import { authorsRepositoryCommand } from "../repositories/authorsFromDBCommand";
import { coursesRepositoryQueries } from "../repositories/coursesFromDBQueries";

export const coursesServises = {
    deleteCourse: async (id: number):Promise<boolean> => {
        return await coursesRepositoryCommand.deleteCourse(id)
    },
    createCourse: async (name: string, author_first_name: string, author_last_name: string):Promise<CourseViewModel | null> => {
        let author_id: number = 0;
        const authors = await authorsRepositoryQueries.getAuthorByFullName(author_first_name, author_last_name);
        if(authors.length > 0){
            if(authors[0].courses.some(course => course.name.toLowerCase() === name.toLowerCase())){
                return null
            }else{author_id = authors[0].id}
        }else{
            const newAuthor = await authorsRepositoryCommand.createAuthor({id: new Date().getTime(), first_name: author_first_name, last_name: author_last_name});
            if(newAuthor) {author_id = newAuthor.id}
        }
        const newCourse: Course = {
            id: new Date().getTime(),
            name,
            usersAmount: 0,
            author_id,
            comments: []
        };
        return await coursesRepositoryCommand.createCourse(newCourse)
    },
    updateCourse: async (id: number, name?: string, comments?: Comment[]): Promise<CourseViewModel | null> => {
        const course = await coursesRepositoryQueries.getCourseById(id);
        return await coursesRepositoryCommand.updateCourse(id, name || course.name, comments || course?.comments || [])
    } 
}