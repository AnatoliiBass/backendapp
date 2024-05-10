import { courses, authors } from "../db/db";
import { AuthorViewModel } from "../models/AuthorViewModel";
import { getViewModelAuthor } from "../utils/getViewModelAuthor";

export const authorsRepositoryQueries = {
  getAllAuthors: async (
    name: string | undefined
  ): Promise<AuthorViewModel[]> => {
    let filter = {};
    if (name) {
      filter = {
        $or: [
          { first_name: { $regex: name } },
          { last_name: { $regex: name } },
        ],
      };
    }
    const getAuthors = await authors.find(filter).toArray();
    const authorsWithCourses: AuthorViewModel[] = [];
    console.log("getAuthors: ", getAuthors);
    if (getAuthors.length > 0) {
      for await (const author of getAuthors) {
        const course = await courses.find({ author_id: author.id }).toArray();
        if (author) {
          authorsWithCourses.push(getViewModelAuthor(course, author));
        }
      }
    }
    return authorsWithCourses;
  },
  getAuthorById: async (id: number): Promise<AuthorViewModel | null> => {
    const getAuthor = await authors.findOne({ id });
    if (!getAuthor) {
      return null;
    }
    const course = await courses.find({ author_id: getAuthor.id }).toArray();
    return getViewModelAuthor(course, getAuthor);
  },
};
