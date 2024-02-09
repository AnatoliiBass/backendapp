import type { CourseViewModel } from "../models/CourseViewModel";
import { courses } from "../db/db";
import { getViewModel } from "../utils/getViewModel";

export const coursesRepository = {
    getAllCourses: async (name: string | undefined): Promise<CourseViewModel[]> => {
        let filter = {};
        if(name){
            filter = {name: {$regex: name}};
        }
        const getCourses = await courses.find(filter).toArray();
        return getCourses.map(getViewModel);
    },
    getCourseById: async (id: number): Promise<CourseViewModel | null> => {
        const getCourse = await courses.findOne({id});
        if(!getCourse){
            return null;
        }
        return getViewModel(getCourse);
    },
    deleteCourse: async (id: number):Promise<boolean> => {
        const result = await courses.deleteOne({id});
        return result.deletedCount === 1;
    },
    createCourse: async (name: string):Promise<CourseViewModel> => {
        const newCourse = {
            id: new Date().getTime(),
            name,
            studentsAmount: 0
        };
        const result = await courses.insertOne(newCourse);
        return getViewModel(newCourse);
    },
    updateCourse: async (id: number, name: string): Promise<CourseViewModel | null> => {
        const result = await courses.updateOne({id}, {$set: {name}});
        if(!result.matchedCount){
            return null;
        }else{
            const getCourse = await courses.findOne({id});
            if(!getCourse){
                return null;
            }
            return getViewModel(getCourse);
        }
    }
}