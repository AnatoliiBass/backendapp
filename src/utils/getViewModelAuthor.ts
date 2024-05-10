import { AuthorViewModel } from "../models/AuthorViewModel";
import type { Author, Course } from "../types";

export function getViewModelAuthor(courses: Course[], author: Author): AuthorViewModel{
    console.log("getViewModel courses: ", courses);
    console.log("getViewModel author: ", author);
    return {id: author.id, first_name: author.first_name, last_name: author.last_name, courses: courses.map(c => ({id: c.id, name: c.name}))};
}