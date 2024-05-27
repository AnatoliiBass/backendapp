import type { CourseViewModel, CourseViewModelObject } from "../models/CourseViewModel";
import { courses, authors } from "../db/db";
import { getViewModelCourse } from "../utils/getViewModelCourse";
import { PAGE, PER_PAGE, COURSE_KEYS } from "../constants";
import type { CourseKeys } from "../types";

export const coursesRepositoryQueries = {
  getAllCourses: async (
    name: string | undefined, page: string | undefined, per_page: string | undefined, sort_by: string | undefined, sort_order: string | undefined
  ): Promise<CourseViewModelObject | null> => {
    let filter = {};
    let sort = {};
    if (sort_by || (sort_order && sort_order.toLowerCase() === "desc")) {
      if(COURSE_KEYS.includes(sort_by as CourseKeys)) {
        sort = {[sort_by]: sort_order === "desc" ? -1 : 1};
      }else{
        sort = {_id: sort_order === "desc" ? -1 : 1};
      }
    }
    if (name) {
      filter = { name: { $regex: name } };
    }
    const getCourses = await courses.find(filter).sort(sort).toArray();
    const total = await courses.countDocuments(filter);
    const correctPage = parseInt(page) && parseInt(page) > 0 ? parseInt(page) : PAGE;
    const correctPerPage = parseInt(per_page) && parseInt(per_page) > 0 ? parseInt(per_page) : PER_PAGE;
    const coursesWithAuthor: CourseViewModel[] = [];
    if (getCourses.length > 0) {
      for await (const course of getCourses) {
        const author = await authors.findOne({ id: course.author_id });
        if (author) {
          coursesWithAuthor.push(getViewModelCourse(course, author));
        }
      }
    }
    if(coursesWithAuthor.length === 0 || correctPage > Math.ceil(total / correctPerPage)){
      return null;
    }
    return {courses: coursesWithAuthor
      .slice((correctPage - 1) * correctPerPage, ((correctPage - 1) * correctPerPage) + correctPerPage),
       total: Math.ceil(total / correctPerPage), page: correctPage, per_page: correctPerPage};
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
