import { users } from "../db/db";
import type { ResetPassword, User } from "../types";

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
    updateUserConfirm: async (id: number):Promise<User | null> => {
        const result = await users.updateOne({id}, {$set: {"emailConfirmation.isConfirmed": true}});
        if(result.modifiedCount === 1){
            const userUpdated = await users.findOne({id});
            return userUpdated;
        }
        return null;
    },
    updateUserResetPassword: async (id: number, obj: ResetPassword):Promise<User | null> => {
        const result = await users.updateOne({id}, {$set: {resetPassword: obj}});
        if(result.modifiedCount === 1){
            const userUpdated = await users.findOne({id});
            if(userUpdated && userUpdated.resetPassword && userUpdated.resetPassword.code === obj.code){
                return userUpdated;
            }
        }
        return null;
    },
    updateUserPassword: async (id: number, passwordHash: string):Promise<User | null> => {
        const result = await users.updateOne({id}, {$set: {password: passwordHash, 'resetPassword.isConfirmed': false,
            'resetPassword.expires_at': null}});
        if(result.modifiedCount === 1){
            const userUpdated = await users.findOne({id});
            if(userUpdated && userUpdated.password === passwordHash){
                return userUpdated;
            }
        }
        return null;
    },
    getUserByEmail: async (email: string): Promise<User | null> => {
        const user =  await users.findOne({email});
        if(!user){
            return null;
        }
        return user;
    },
    getUserByConfirmCode: async (code: string): Promise<User | null> => {
        const user =  await users.findOne({"emailConfirmation.code": code});
        if(!user){
            return null;
        }
        return user;
    },
    getUserByConfirmResetPasswordCode: async (code: string): Promise<User | null> => {
        const user =  await users.findOne({"resetPassword.code": code});
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