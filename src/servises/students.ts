import { Student } from "../types";
import bcrypt from "bcrypt";
import { studentsRepositoryCommand } from "../repositories/studentsFromDBCommand";

export const studentsServises = {
    async createStudent(first_name: string, last_name: string, email: string, phone: string,
        birthdate: string, password: string):Promise<Student | null> {
        const passwordSalt = await bcrypt.genSalt(10);
        const passwordHash = await this._generateHash(password, passwordSalt);
        const newStudent: Student = {
            id: new Date().getTime(),
            first_name,
            last_name,
            email,
            phone,
            birthdate,
            password: passwordHash,
            created_at: new Date().toISOString()
        };
        return await studentsRepositoryCommand.createStudent(newStudent)
    },
    async _generateHash(password: string, salt: string): Promise<string>{
        return await bcrypt.hash(password, salt)
    },
    async checkCredentials(email: string, password: string): Promise<boolean>{
        const student = await studentsRepositoryCommand.getStudentByEmail(email);
        if(!student){
            return false;
        }
        return await bcrypt.compare(password, student.password)
    }
}