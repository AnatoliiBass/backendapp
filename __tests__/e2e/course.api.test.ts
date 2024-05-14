import request from "supertest";
import {app} from "../../src/app";
import type { CourseViewModel } from "../../src/models/CourseViewModel";
import type { CourseCreateModel } from "../../src/models/CourseCreateModel";
import type { CourseUpdateModel } from "../../src/models/CourseUpdateModel";
import { HTTP_STATUSES } from "../../src/utils/httpstatuses";

describe("/courses", ()=>{

    it("should return 200 and a list of courses", async ()=>{
        const response = await request(app)
        .get("/courses")
        .expect(HTTP_STATUSES.OK);

    expect(response.body).toBeInstanceOf(Array<CourseViewModel>);
    })
    it("should return 404 for not existing course", async ()=>{
        const res = await request(app)
            .get("/courses/0")
            .expect(HTTP_STATUSES.NOT_FOUND, null);
    })
    it("should return 200 for existing course", async ()=>{
        const res = await request(app)
            .get("/courses/1714483108614")
            .expect(HTTP_STATUSES.OK, {id: 1714483108614, name: "QA", author: {first_name: "Anatolii", last_name: "Bas"}});
    })
    it("should'nt create a course with incorrect input data", async ()=>{
        const data: CourseCreateModel = {name: "", author_first_name: "", author_last_name: ""};
        await request(app)
            .post("/courses")
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST, 
                { errors: [{ type: "field", value: data.name, msg: "Name must be between 2 and 100 characters long and cannot be empty", 
                path: "name", location: "body" },{ type: "field", value: data.author_first_name, msg: "Author first name must be between 2 and 100 characters long and cannot be empty", 
                path: "author_first_name", location: "body" },{ type: "field", value: data.author_last_name, msg: "Author last name must be between 2 and 100 characters long and cannot be empty", 
                path: "author_last_name", location: "body" }] })
    })
    it("should'nt create a course with data which is exists", async ()=>{
        const data: CourseCreateModel = {name: "Design", author_first_name: "Anatolii", author_last_name: "Bas"};
        await request(app)
            .post("/courses")
            .send(data)
            .expect(HTTP_STATUSES.DATA_EXISTS, null)
    })
    let createdCourse: CourseViewModel;
    it("should create a course with correct input data", async ()=>{
        const data: CourseCreateModel = {name: "Test1", author_first_name: "Test1", author_last_name: "Test1"};
        const createResponse = await request(app)
            .post("/courses")
            .send(data)
            .expect(HTTP_STATUSES.CREATED)

        createdCourse = createResponse.body;
        expect(createdCourse).toEqual({id: expect.any(Number), name: data.name, 
            author: {first_name: expect.any(String), last_name: expect.any(String)}})

        const response = await request(app)
            .get("/courses")
            .expect(HTTP_STATUSES.OK)
        expect(response.body).toBeInstanceOf(Array<CourseViewModel>);
    })
    let createdCourse2: CourseViewModel;
    it("should create a course2 with correct input data", async ()=>{
        const data: CourseCreateModel = {name: "Test2", author_first_name: "Test2", author_last_name: "Test2"};
        const createResponse = await request(app)
            .post("/courses")
            .send(data)
            .expect(HTTP_STATUSES.CREATED)

        createdCourse2 = createResponse.body;
        expect(createdCourse2).toEqual({id: expect.any(Number), name: data.name, 
            author: {first_name: expect.any(String), last_name: expect.any(String)}})

        const response = await request(app)
            .get("/courses")
            .expect(HTTP_STATUSES.OK)
            expect(response.body).toBeInstanceOf(Array<CourseViewModel>);
    })
    it("should'nt update a course with incorrect input data", async ()=>{
        const data: CourseUpdateModel = {name: ""};
        await request(app)
            .put("/courses/" + createdCourse.id)
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST, { errors: [{ type: "field", value: data.name, msg: "Name must be between 2 and 100 characters long and cannot be empty", 
            path: "name", location: "body" }] })

        await request(app)
            .get("/courses/" + createdCourse.id)
            .expect(HTTP_STATUSES.OK, createdCourse)
    })
    it("should'nt update a course that is not exist", async ()=>{
        const data: CourseUpdateModel = {name: "Unknown"};
        await request(app)
            .put("/courses/0")
            .send(data)
            .expect(HTTP_STATUSES.NOT_FOUND, null)
    })
    it("should update a course with correct input data", async ()=>{
        const data: CourseUpdateModel = {name: "Project Management"};
        await request(app)
            .put("/courses/" + createdCourse.id)
            .send(data)
            .expect(HTTP_STATUSES.CREATED)

        await request(app)
            .get("/courses/" + createdCourse.id)
            .expect(HTTP_STATUSES.OK, {...createdCourse, name: data.name})

        createdCourse.name = data.name;
    })
    it("should'nt update a course2 with incorrect input data", async ()=>{
        const data: CourseUpdateModel = {name: ""};
        await request(app)
            .put("/courses/" + createdCourse2.id)
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST, { errors: [{ type: "field", value: data.name, msg: "Name must be between 2 and 100 characters long and cannot be empty", 
            path: "name", location: "body" }] })

        await request(app)
            .get("/courses/" + createdCourse2.id)
            .expect(HTTP_STATUSES.OK, createdCourse2)
    })
    it("should'nt update a course2 that is not exist", async ()=>{
        const data: CourseUpdateModel = {name: "Unknown"};
        await request(app)
            .put("/courses/0")
            .send(data)
            .expect(HTTP_STATUSES.NOT_FOUND, null)
    })
    it("should update a course2 with correct input data", async ()=>{
        const data: CourseUpdateModel = {name: "Team Lead"};
        await request(app)
            .put("/courses/" + createdCourse2.id)
            .send(data)
            .expect(HTTP_STATUSES.CREATED)

        await request(app)
            .get("/courses/" + createdCourse2.id)
            .expect(HTTP_STATUSES.OK, {...createdCourse2, name: data.name})

        createdCourse2.name = data.name;
    })
    it("should delete a course", async ()=>{
        await request(app)
            .delete("/courses/" + createdCourse.id)
            .expect(HTTP_STATUSES.NO_CONTENT)

        await request(app)
            .get("/courses/" + createdCourse.id)
            .expect(HTTP_STATUSES.NOT_FOUND, null)
    })
    it("should delete a course2", async ()=>{
        await request(app)
            .delete("/courses/" + createdCourse2.id)
            .expect(HTTP_STATUSES.NO_CONTENT)

        await request(app)
            .get("/courses/" + createdCourse2.id)
            .expect(HTTP_STATUSES.NOT_FOUND, null)
    })
})