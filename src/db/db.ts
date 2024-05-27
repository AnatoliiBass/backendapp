import { MongoClient, ServerApiVersion } from "mongodb";
import type { Author, Course, User, Comment } from "../types";
import { setting } from "../setting";

const url = setting.MONGO_URI;
const client = new MongoClient(url, {
  family: 4,
  connectTimeoutMS: 100000,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
export const runDB = async () => {
    try {
        await client.connect().catch((error) => {console.log("Error inside connect: ", error)});
    } catch (error) {
        console.log("Error inside when try connect: " + error)
        await client.close();
    }
};
export const database = client.db("Learning");
export const courses = database.collection<Course>("Courses");
export const authors = database.collection<Author>("Authors");
export const users = database.collection<User>("Users");
export const comments = database.collection<Comment>("Comments");
