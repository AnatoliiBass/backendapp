import { MongoClient, ServerApiVersion } from "mongodb";
import type { Course, DbCourses } from "../types";

export const db: DbCourses ={
    courses: [
        {
            id: 1,
            name: 'front-end',
            studentsAmount: 10
        },
        {
            id: 2,
            name: 'back-end',
            studentsAmount: 20
        },
        {
            id: 3,
            name: 'devops',
            studentsAmount: 30
        },
        {
            id: 4,
            name: 'fullstack',
            studentsAmount: 40
        }
    ]

}

const url = process.env.MongoURI || "mongodb+srv://anatolii:zRfPyrXqc1s3kB93@cluster0.dvhwtgl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
export const database = client.db("Learning");
export const courses = database.collection<Course>("Courses");
export const runDB = async () => {
    try {
        await client.connect();
        console.log(database.databaseName)
        console.log(courses.collectionName)
    } catch (error) {
        console.log("Error: " + error)
        await client.close();
    }
};