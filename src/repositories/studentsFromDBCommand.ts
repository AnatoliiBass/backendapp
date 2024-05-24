import { students } from "../db/db";
import type { Student } from "../types";

export const studentsRepositoryCommand = {
    deleteStudent: async (id: number):Promise<boolean> => {
        const result = await students.deleteOne({id});
        return result.deletedCount === 1;
    },
    createStudent: async (student: Student):Promise<Student> => {
        const result = await students.insertOne(student);
        const studentSaved = await students.findOne({id: student.id});
        return {
            id: studentSaved.id,
            first_name: studentSaved.first_name,
            last_name: studentSaved.last_name,
            email: studentSaved.email,
            phone: studentSaved.phone,
            birthdate: studentSaved.birthdate,
            password: studentSaved.password,
            created_at: studentSaved.created_at
        };
    },
    getStudentByEmail: async (email: string): Promise<Student | null> => {
        const student =  await students.findOne({email});
        if(!student){
            return null;
        }
        return {
            id: student.id,
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            phone: student.phone,
            birthdate: student.birthdate,
            password: student.password,
            created_at: student.created_at
        };
    },
    getStudentById: async (id: number): Promise<Student | null> => {
        const student =  await students.findOne({id});
        if(!student){
            return null;
        }
        return {
            id: student.id,
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            phone: student.phone,
            birthdate: student.birthdate,
            password: student.password,
            created_at: student.created_at
        };
    },
}