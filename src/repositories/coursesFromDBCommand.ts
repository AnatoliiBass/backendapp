import type { CourseViewModel } from "../models/CourseViewModel";
import { authors, courses } from "../db/db";
import { getViewModel } from "../utils/getViewModel";
import type { Course } from "../types";

export const coursesRepositoryCommand = {
    deleteCourse: async (id: number):Promise<boolean> => {
        const result = await courses.deleteOne({id});
        return result.deletedCount === 1;
    },
    createCourse: async (course: Course):Promise<CourseViewModel> => {
        const result = await courses.insertOne(course);
        const author = await authors.findOne({id: course.author_id});
        console.log("Created result: ", result)
        return getViewModel(course, author);
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
            const author = await authors.findOne({id: getCourse.author_id});
            if(!author){
                return null;
            }
            return getViewModel(getCourse, author);
        }
    }
}