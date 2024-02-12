import { Course } from "../types";
import type { CourseViewModel } from "../models/CourseViewModel";
import {coursesRepositoryCommand} from "../repositories/coursesFromDBCommand"

export const coursesServises = {
    deleteCourse: async (id: number):Promise<boolean> => {
        return await coursesRepositoryCommand.deleteCourse(id)
    },
    createCourse: async (name: string):Promise<CourseViewModel> => {
        const newCourse: Course = {
            id: new Date().getTime(),
            name,
            studentsAmount: 0,
            author_id: 123
        };
        return await coursesRepositoryCommand.createCourse(newCourse)
    },
    updateCourse: async (id: number, name: string): Promise<CourseViewModel | null> => {
        return await coursesRepositoryCommand.updateCourse(id, name)
    }
}