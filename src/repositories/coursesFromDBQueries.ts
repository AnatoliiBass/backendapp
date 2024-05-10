import type { CourseViewModel } from "../models/CourseViewModel";
import { courses, authors } from "../db/db";
import { getViewModelCourse } from "../utils/getViewModelCourse";

export const coursesRepositoryQueries = {
  getAllCourses: async (
    name: string | undefined
  ): Promise<CourseViewModel[]> => {
    let filter = {};
    if (name) {
      filter = { name: { $regex: name } };
    }
    const getCourses = await courses.find(filter).toArray();
    const coursesWithAuthor: CourseViewModel[] = [];
    console.log("getCourses: ", getCourses);
    if (getCourses.length > 0) {
      for await (const course of getCourses) {
        const author = await authors.findOne({ id: course.author_id });
        if (author) {
          coursesWithAuthor.push(getViewModelCourse(course, author));
        }
      }
    }
    return coursesWithAuthor;
  },
  getCourseById: async (id: number): Promise<CourseViewModel | null> => {
    const getCourse = await courses.findOne({ id });
    if (!getCourse) {
      return null;
    }
    const author = await authors.findOne({ id: getCourse.author_id });
    return getViewModelCourse(getCourse, author);
  },
};
