import { usersRepositoryCommand } from "../repositories/usersFromDBCommand";
import { User } from "../types";
import bcrypt from "bcrypt";

export const usersServises = {
    async createUser(first_name: string, last_name: string, role: string, email: string, phone: string,
        birthdate: string, password: string):Promise<User | null> {
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
            created_at: new Date().toISOString()
        };
        return await usersRepositoryCommand.createUser(newUser)
    },
    async _generateHash(password: string, salt: string): Promise<string>{
        return await bcrypt.hash(password, salt)
    },
    async checkCredentials(email: string, password: string): Promise<User | null>{
        const user = await usersRepositoryCommand.getUserByEmail(email);
        if(!user){
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