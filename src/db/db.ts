import { MongoClient, ServerApiVersion } from "mongodb";
import type { Author, Course } from "../types";

const url = process.env.MongoURI || "mongodb+srv://anatolii:oy9CmAVu1orhHfkw@cluster0.rmiojst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(url, {
  family: 4,
  connectTimeoutMS: 100000,
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  console.log("URL: ", url);
  console.log("Client: ", client);
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
