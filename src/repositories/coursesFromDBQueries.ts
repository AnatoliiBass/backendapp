import type { CourseViewModel } from "../models/CourseViewModel";
import { courses } from "../db/db";
import { getViewModel } from "../utils/getViewModel";

export const coursesRepositoryQueries = {
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
    }
}