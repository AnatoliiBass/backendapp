import type { CourseViewModel } from "../models/CourseViewModel";
import { courses } from "../db/db";
import { getViewModel } from "../utils/getViewModel";
import type { Course } from "../types";

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
    createCourse: async (course: Course):Promise<CourseViewModel> => {
        const result = await courses.insertOne(course);
        console.log("Created result: ", result)
        return getViewModel(course);
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