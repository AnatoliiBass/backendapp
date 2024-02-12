import { Course } from "../types";
import type { CourseViewModel } from "../models/CourseViewModel";
import {coursesRepository} from "../repositories/coursesFromDB"

export const coursesServises = {
    getAllCourses: async (name: string | undefined): Promise<CourseViewModel[]> => {
        return await coursesRepository.getAllCourses(name)
    },
    getCourseById: async (id: number): Promise<CourseViewModel | null> => {
        return await coursesRepository.getCourseById(id)
    },
    deleteCourse: async (id: number):Promise<boolean> => {
        return await coursesRepository.deleteCourse(id)
    },
    createCourse: async (name: string):Promise<CourseViewModel> => {
        const newCourse: Course = {
            id: new Date().getTime(),
            name,
            studentsAmount: 0
        };
        return await coursesRepository.createCourse(newCourse)
    },
    updateCourse: async (id: number, name: string): Promise<CourseViewModel | null> => {
        return await coursesRepository.updateCourse(id, name)
    }
}