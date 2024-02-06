import request from "supertest";
import {HTTP_STATUSES, app} from "../../src";

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
        await request(app)
            .get("/courses/1")
            .expect(HTTP_STATUSES.NOT_FOUND)
    })
    it("should'nt create a course with incorrect input data", async ()=>{
        await request(app)
            .post("/courses")
            .send({name: ""})
            .expect(HTTP_STATUSES.BAD_REQUEST)
    })
    let createdCourse: {id: number, name: string};
    it("should create a course with correct input data", async ()=>{
        const createResponse = await request(app)
            .post("/courses")
            .send({name: "QA"})
            .expect(HTTP_STATUSES.CREATED)

        createdCourse = createResponse.body;
        expect(createdCourse).toEqual({id: expect.any(Number), name: "QA"})

        await request(app)
            .get("/courses")
            .expect(HTTP_STATUSES.OK, [createdCourse])
    })
    let createdCourse2: {id: number, name: string};
    it("should create a course2 with correct input data", async ()=>{
        const createResponse = await request(app)
            .post("/courses")
            .send({name: "DevOps"})
            .expect(HTTP_STATUSES.CREATED)

        createdCourse2 = createResponse.body;
        expect(createdCourse2).toEqual({id: expect.any(Number), name: "DevOps"})

        await request(app)
            .get("/courses")
            .expect(HTTP_STATUSES.OK, [createdCourse, createdCourse2])
    })
    it("should'nt update a course with incorrect input data", async ()=>{
        await request(app)
            .put("/courses/" + createdCourse.id)
            .send({name: ""})
            .expect(HTTP_STATUSES.BAD_REQUEST)

        await request(app)
            .get("/courses/" + createdCourse.id)
            .expect(HTTP_STATUSES.OK, createdCourse)
    })
    it("should'nt update a course that is not exist", async ()=>{
        await request(app)
            .put("/courses/" + 0)
            .send({name: "Unknown"})
            .expect(HTTP_STATUSES.NOT_FOUND)
    })
    it("should update a course with correct input data", async ()=>{
        await request(app)
            .put("/courses/" + createdCourse.id)
            .send({name: "Project Management"})
            .expect(HTTP_STATUSES.CREATED)

        await request(app)
            .get("/courses/" + createdCourse.id)
            .expect(HTTP_STATUSES.OK, {...createdCourse, name: "Project Management"})

        createdCourse.name = "Project Management";
    })
    it("should'nt update a course2 with incorrect input data", async ()=>{
        await request(app)
            .put("/courses/" + createdCourse2.id)
            .send({name: ""})
            .expect(HTTP_STATUSES.BAD_REQUEST)

        await request(app)
            .get("/courses/" + createdCourse2.id)
            .expect(HTTP_STATUSES.OK, createdCourse2)
    })
    it("should'nt update a course2 that is not exist", async ()=>{
        await request(app)
            .put("/courses/" + 0)
            .send({name: "Unknown"})
            .expect(HTTP_STATUSES.NOT_FOUND)
    })
    it("should update a course2 with correct input data", async ()=>{
        await request(app)
            .put("/courses/" + createdCourse2.id)
            .send({name: "Team Lead"})
            .expect(HTTP_STATUSES.CREATED)

        await request(app)
            .get("/courses/" + createdCourse2.id)
            .expect(HTTP_STATUSES.OK, {...createdCourse2, name: "Team Lead"})

        createdCourse2.name = "Team Lead";
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