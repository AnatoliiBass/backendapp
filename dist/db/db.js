"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDB = exports.courses = exports.database = exports.db = void 0;
const mongodb_1 = require("mongodb");
exports.db = {
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
};
const url = process.env.MongoURI || "mongodb+srv://anatolii:zRfPyrXqc1s3kB93@cluster0.dvhwtgl.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(url, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
exports.database = client.db("Learning");
exports.courses = exports.database.collection("Courses");
const runDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log(exports.database.databaseName);
        console.log(exports.courses.collectionName);
    }
    catch (error) {
        console.log("Error: " + error);
        yield client.close();
    }
});
exports.runDB = runDB;
//# sourceMappingURL=db.js.map