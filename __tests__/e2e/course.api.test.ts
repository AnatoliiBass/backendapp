import request from "supertest";
import {HTTP_STATUSES, app} from "../../src";
import type { CourseViewModel } from "../../src/models/CourseViewModel";
import type { CourseCreateModel } from "../../src/models/CourseCreateModel";
import type { CourseUpdateModel } from "../../src/models/CourseUpdateModel";

describe("/course", ()=>{

    beforeAll(async()=>{
        await request(app)
            .delete("/testdelete")
    })

    it("should return 200 and a list of courses", async ()=>{
        await request(app)
            .get("/courses")
            .expect(HTTP_STATUSES.OK, [])
    })
    it("should return 404 for not existing course", async ()=>{
        const res = await request(app)
            .get("/courses/0")
            .expect(HTTP_STATUSES.NOT_FOUND, null);
    })
    it("should'nt create a course with incorrect input data", async ()=>{
        const data: CourseCreateModel = {name: ""};
        await request(app)
            .post("/courses")
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST, null)
    })
    let createdCourse: CourseViewModel;
    it("should create a course with correct input data", async ()=>{
        const data: CourseCreateModel = {name: "QA"};
        const createResponse = await request(app)
            .post("/courses")
            .send(data)
            .expect(HTTP_STATUSES.CREATED)

        createdCourse = createResponse.body;
        expect(createdCourse).toEqual({id: expect.any(Number), name: data.name})

        await request(app)
            .get("/courses")
            .expect(HTTP_STATUSES.OK, [createdCourse])
    })
    let createdCourse2: CourseViewModel;
    it("should create a course2 with correct input data", async ()=>{
        const data: CourseCreateModel = {name: "DevOps"};
        const createResponse = await request(app)
            .post("/courses")
            .send(data)
            .expect(HTTP_STATUSES.CREATED)

        createdCourse2 = createResponse.body;
        expect(createdCourse2).toEqual({id: expect.any(Number), name: data.name})

        await request(app)
            .get("/courses")
            .expect(HTTP_STATUSES.OK, [createdCourse, createdCourse2])
    })
    it("should'nt update a course with incorrect input data", async ()=>{
        const data: CourseUpdateModel = {name: ""};
        await request(app)
            .put("/courses/" + createdCourse.id)
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST, null)

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
            .expect(HTTP_STATUSES.BAD_REQUEST, null)

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
            .get("/courses")
            .expect(HTTP_STATUSES.OK, [createdCourse2])
    })
    it("should delete a course2", async ()=>{
        await request(app)
            .delete("/courses/" + createdCourse2.id)
            .expect(HTTP_STATUSES.NO_CONTENT)

        await request(app)
            .get("/courses")
            .expect(HTTP_STATUSES.OK, [])
    })
})