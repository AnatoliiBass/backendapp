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
    usersAmount: number,
    author_id: number,
    comments: Comment[]
}

export type CourseKeys = keyof Course;

export type Author = {
    id: number,
    first_name: string,
    last_name: string
}

export type AuthorKeys = keyof Author;

export type EmailConfirmation = {
    code: string,
    expires_at: string,
    isConfirmed: boolean
}

export type ResetPassword = {
    code: string,
    expires_at: string | null,
    isConfirmed: boolean,
    isBlocked: boolean,
    count: number
}

export type User = {
    id: number,
    role: string,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    birthdate: string,
    password: string,
    created_at: string
    emailConfirmation: EmailConfirmation;
    resetPassword: ResetPassword | null;
}

export type Comment = {
    id: number,
    text: string,
    user_id: number,
    user_full_name: string,
    course_id: number,
    created_at: string
};

