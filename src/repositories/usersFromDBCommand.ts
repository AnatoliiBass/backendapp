import { users } from "../db/db";
import type { User } from "../types";

export const usersRepositoryCommand = {
    deleteUser: async (id: number):Promise<boolean> => {
        const result = await users.deleteOne({id});
        return result.deletedCount === 1;
    },
    createUser: async (user: User):Promise<User> => {
        const result = await users.insertOne(user);
        const userSaved = await users.findOne({id: user.id});
        return {
            id: userSaved.id,
            role: userSaved.role,
            first_name: userSaved.first_name,
            last_name: userSaved.last_name,
            email: userSaved.email,
            phone: userSaved.phone,
            birthdate: userSaved.birthdate,
            password: userSaved.password,
            created_at: userSaved.created_at
        };
    },
    getUserByEmail: async (email: string): Promise<User | null> => {
        const user =  await users.findOne({email});
        if(!user){
            return null;
        }
        return {
            id: user.id,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            birthdate: user.birthdate,
            password: user.password,
            created_at: user.created_at
        };
    },
    getUserById: async (id: number): Promise<User | null> => {
        const user =  await users.findOne({id});
        if(!user){
            return null;
        }
        return {
            id: user.id,
            role: user.role,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
            birthdate: user.birthdate,
            password: user.password,
            created_at: user.created_at
        };
    },
}