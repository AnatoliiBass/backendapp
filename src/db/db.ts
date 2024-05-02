import { MongoClient, ServerApiVersion } from "mongodb";
import type { Author, Course } from "../types";

const url = process.env.MongoURI || "mongodb+srv://anatolii:oy9CmAVu1orhHfkw@cluster0.rmiojst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
export const database = client.db("Learning");
export const courses = database.collection<Course>("Courses");
export const authors = database.collection<Author>("Authors");
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