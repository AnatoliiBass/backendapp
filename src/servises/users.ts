import { usersRepositoryCommand } from "../repositories/usersFromDBCommand";
import type { User } from "../types";
import bcrypt from "bcrypt";
import {add} from "date-fns/add";
import type { UserReturnModel } from "../models/UserReturnModel";
import { uuid } from 'uuidv4';
import { emailServices } from "./email";

export const usersServises = {
    async deleteUser(id: number): Promise<boolean> {
        return await usersRepositoryCommand.deleteUser(id)
    },
    async updateUser(user: User):Promise<User | null> {
        return await usersRepositoryCommand.updateUser(user)
    },
    async getUserById(id: number): Promise<User | null> {
        return await usersRepositoryCommand.getUserById(id)
    },
    async createUser(first_name: string, last_name: string, role: string, email: string, phone: string,
        birthdate: string, password: string):Promise<UserReturnModel | null> {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await this._generateHash(password, passwordSalt);
        const newUser: User = {
            id: new Date().getTime(),
            role,
            first_name,
            last_name,
            email,
            phone,
            birthdate,
            password: passwordHash,
            created_at: new Date().toISOString(),
            emailConfirmation: {
                code: uuid(),
                expires_at: add(new Date(), {minutes: 3}).toISOString(),
                isConfirmed: false
            }
        };
        const createdUser = await usersRepositoryCommand.createUser(newUser)
        const emailSent = await emailServices.sendConfirmEmail(createdUser);
        if(createdUser && emailSent){
            return {
                id: createdUser.id,
                role: createdUser.role,
                first_name: createdUser.first_name,
                last_name: createdUser.last_name,
                email: createdUser.email,
                phone: createdUser.phone,
                birthdate: createdUser.birthdate
            }
        }else{
            await usersRepositoryCommand.deleteUser(createdUser.id);
            return null
        }
    },
    async _generateHash(password: string, salt: string): Promise<string>{
        return await bcrypt.hash(password, salt)
    },
    async checkCredentials(email: string, password: string): Promise<User | null>{
        const user = await usersRepositoryCommand.getUserByEmail(email);
        if(!user || !user.emailConfirmation.isConfirmed){
            return null;
        }
        const result = await bcrypt.compare(password, user.password);
        if(result){
            return user
        }else{
            return null
        }
    }
}