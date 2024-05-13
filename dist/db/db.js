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
exports.authors = exports.courses = exports.database = exports.runDB = void 0;
const mongodb_1 = require("mongodb");
const url = process.env.MongoURI || "mongodb+srv://anatolii:oy9CmAVu1orhHfkw@cluster0.rmiojst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new mongodb_1.MongoClient(url, {
    family: 4,
    connectTimeoutMS: 100000,
    // serverApi: {
    //   version: ServerApiVersion.v1,
    //   // strict: true,
    //   // deprecationErrors: true,
    // }
});
console.log("URL: ", url);
console.log("Client: ", client);
const runDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
    }
    catch (error) {
        console.log("Error: " + error);
        yield client.close();
    }
});
exports.runDB = runDB;
exports.database = client.db("Learning");
exports.courses = exports.database.collection("Courses");
exports.authors = exports.database.collection("Authors");
//# sourceMappingURL=db.js.map