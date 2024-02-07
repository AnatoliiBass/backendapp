import type { CourseViewModel } from "../models/CourseViewModel";
import type { Course } from "../types";

export function getViewModel(course: Course): CourseViewModel{
    return {id: course.id, name: course.name};
}