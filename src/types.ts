import type { Request } from "express";

export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParams<T> = Request<T>;
export type RequestWithParamsAndQuery<Params, Query> = Request<Params, {}, {}, Query>;
export type RequestWithParamsAndBody<Params, Body> = Request<Params, {}, Body>;
export type RequestWithBodyAndQuery<Body, Query> = Request<{}, {}, Body, Query>;
export type RequestWithParamsAndBodyAndQuery<Params, Body, Query> = Request<Params, {}, Body, Query>;

export type Course = {
    id: number,
    name: string,
    studentsAmount: number,
    author_id: number
}

export type Author = {
    id: number,
    first_name: string,
    last_name: string
}

export type DbCourses = {
    courses: Course[]
}