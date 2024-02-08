import { db } from "../db/db";
import { getViewModel } from "../utils/getViewModel";

export const coursesRepository = {
    getAllCourses: (name: string | undefined) => {
        let courses = db.courses;
        if(name){
            courses = courses.filter(course => course.name.includes(name))
        }
        return courses.map(getViewModel);
    },
    getCourseById: (id: number) => {
        const course = db.courses.find(course => course.id === id);
        if(!course){
            return null;
        }
        return getViewModel(course);
    },
    deleteCourse: (id: number) => {
        const index = db.courses.findIndex(course => course.id === id);
        if(index === -1){
            return false;
        }
        db.courses.splice(index, 1);
        return true;
    },
    createCourse: (name: string) => {
        const newCourse = {
            id: new Date().getTime(),
            name,
            studentsAmount: 0
        };
        db.courses.push(newCourse);
        return getViewModel(newCourse);
    },
    updateCourse: (id: number, name: string) => {
        const course = db.courses.find(course => course.id === id);
        if(!course){
            return null;
        }
        course.name = name;
        return getViewModel(course);
    }
}