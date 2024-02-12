import type { CourseViewModel } from "../models/CourseViewModel";
import { courses, authors } from "../db/db";
import { getViewModel } from "../utils/getViewModel";

export const coursesRepositoryQueries = {
    getAllCourses: async (name: string | undefined): Promise<CourseViewModel[]> => {
        let filter = {};
        if(name){
            filter = {name: {$regex: name}};
        }
        const getCourses = await courses.find(filter).toArray();
        const coursesWithAuthor:CourseViewModel[] = []
        getCourses.forEach(async(course) => {
            const author = await authors.findOne({id: course.author_id})
            coursesWithAuthor.push(getViewModel(course, author))
        });
        return coursesWithAuthor
    },
    getCourseById: async (id: number): Promise<CourseViewModel | null> => {
        const getCourse = await courses.findOne({id});
        if(!getCourse){
            return null;
        }
        const author = await authors.findOne({id: getCourse.author_id});
        return getViewModel(getCourse, author);
    }
}