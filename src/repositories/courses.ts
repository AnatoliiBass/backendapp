import type { CourseViewModel } from "../models/CourseViewModel";
import { db } from "../db/db";
import { getViewModel } from "../utils/getViewModel";

export const coursesRepository = {
    getAllCourses: async (name: string | undefined): Promise<CourseViewModel[]> => {
        let courses = db.courses;
        if(name){
            courses = courses.filter(course => course.name.includes(name))
        }
        return courses.map(getViewModel);
    },
    getCourseById: async (id: number): Promise<CourseViewModel | null> => {
        const course = db.courses.find(course => course.id === id);
        if(!course){
            return null;
        }
        return getViewModel(course);
    },
    deleteCourse: async (id: number):Promise<boolean> => {
        const index = db.courses.findIndex(course => course.id === id);
        if(index === -1){
            return false;
        }
        db.courses.splice(index, 1);
        return true;
    },
    createCourse: async (name: string):Promise<CourseViewModel> => {
        const newCourse = {
            id: new Date().getTime(),
            name,
            studentsAmount: 0
        };
        db.courses.push(newCourse);
        return getViewModel(newCourse);
    },
    updateCourse: async (id: number, name: string): Promise<CourseViewModel | null> => {
        const course = db.courses.find(course => course.id === id);
        if(!course){
            return null;
        }
        course.name = name;
        return getViewModel(course);
    }
}