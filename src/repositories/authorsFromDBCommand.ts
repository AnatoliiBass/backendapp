import { authors, courses } from "../db/db";
import type { Author } from "../types";
import type { AuthorViewModel } from "../models/AuthorViewModel";
import { getViewModelAuthor } from "../utils/getViewModelAuthor";

export const authorsRepositoryCommand = {
    deleteAuthor: async (id: number):Promise<boolean> => {
        const result = await authors.deleteOne({id});
        return result.deletedCount === 1;
    },
    createAuthor: async (author: Author):Promise<Author> => {
        const result = await authors.insertOne(author);
        const authorSaved = await authors.findOne({id: author.id});
        return {id: authorSaved.id, first_name: authorSaved.first_name, last_name: authorSaved.last_name};
    },
    updateAuthor: async (id: number, first_name: string, last_name: string): Promise<AuthorViewModel | null> => {
        const result = await authors.updateOne({id}, {$set: {first_name, last_name}});
        if(!result.matchedCount){
            return null;
        }else{
            const getAuthor = await authors.findOne({id});
            if(!getAuthor){
                return null;
            }
            const coursesByAuthor = await courses.find({author_id: getAuthor.id}).toArray();

            return getViewModelAuthor(coursesByAuthor, getAuthor);
        }
    }
}