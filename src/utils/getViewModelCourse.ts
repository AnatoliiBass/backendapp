import type { CourseViewModel } from "../models/CourseViewModel";
import type { Author, Course } from "../types";

export function getViewModelCourse(course: Course, author: Author): CourseViewModel{
    return {id: course.id, name: course.name, author: 
        {first_name: author.first_name, last_name: author.last_name}};
}