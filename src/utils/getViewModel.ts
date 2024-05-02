import type { CourseViewModel } from "../models/CourseViewModel";
import type { Author, Course } from "../types";

export function getViewModel(course: Course, author: Author): CourseViewModel{
    console.log("getViewModel course: ", course);
    console.log("getViewModel author: ", author);
    return {id: course.id, name: course.name, author: 
        {first_name: author.first_name, last_name: author.last_name}};
}