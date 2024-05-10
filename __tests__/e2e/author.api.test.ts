import request from "supertest";
import {app} from "../../src/app";
import type { AuthorViewModel } from "../../src/models/AuthorViewModel";
import { HTTP_STATUSES } from "../../src/utils/httpstatuses";

describe("/authors", ()=>{

    it("should return 200 and a list of courses", async ()=>{
        const response = await request(app)
        .get("/authors")
        .expect(HTTP_STATUSES.OK);

    expect(response.body).toBeInstanceOf(Array<AuthorViewModel>);
    })
    it("should return 404 for not existing course", async ()=>{
        const res = await request(app)
            .get("/authors/0")
            .expect(HTTP_STATUSES.NOT_FOUND, null);
    })
    it("should return 200 for existing course", async ()=>{
        const res = await request(app)
            .get("/authors/124")
            .expect(HTTP_STATUSES.OK, {id: 124, first_name: "Tom", last_name: "Crouze", courses: []});
    })
});