import { users } from "../db/db";
import type { User } from "../types";

export const usersRepositoryCommand = {
    deleteUser: async (id: number):Promise<boolean> => {
        const result = await users.deleteOne({id});
        return result.deletedCount === 1;
    },
    createUser: async (user: User):Promise<User> => {
        await users.insertOne(user);
        const userSaved = await users.findOne({id: user.id});
        return userSaved;
    },
    getUserByEmail: async (email: string): Promise<User | null> => {
        const user =  await users.findOne({email});
        if(!user){
            return null;
        }
        return user;
    },
    getUserById: async (id: number): Promise<User | null> => {
        const user =  await users.findOne({id});
        if(!user){
            return null;
        }
        return user;
    },
}