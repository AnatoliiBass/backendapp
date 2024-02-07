import express from 'express'
import type { Response } from "express";
import type { DbCourses, RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../types";
import type { CourseGetWithQueryModel } from "../models/CourseGetWithQueryModel";
import type { CourseViewModel } from "../models/CourseViewModel";
import type { CourseURIParamsModel } from "../models/CourseURIParamsModel";
import type { CourseCreateModel } from "../models/CourseCreateModel";
import type { CourseUpdateModel } from "../models/CourseUpdateModel";
import { HTTP_STATUSES } from "../utils/httpstatuses";
import { getViewModel } from "../utils/getViewModel";

export const getCoursesRoute = (db:DbCourses) => {
    const router = express.Router();
    router.get('/', (_req: RequestWithQuery<CourseGetWithQueryModel>, res: Response<CourseViewModel[]>) => {
        let courses = db.courses;
        if(_req.query.name){
            courses = courses.filter(course => course.name.includes(_req.query.name))
        }
        return res.status(HTTP_STATUSES.OK).json(courses.map(getViewModel));
    });
    
    router.get('/:id(\\d+)', (_req: RequestWithParams<CourseURIParamsModel>, res: Response<CourseViewModel | null>) => {
        const id = parseInt(_req.params.id);
        const course = db.courses.find(course => course.id === id);
        if(!course){
            res.statusCode = HTTP_STATUSES.NOT_FOUND;
            res.statusMessage = 'Course not found';
            return res.json(null);
        }
        return res.status(HTTP_STATUSES.OK).json(getViewModel(course));
    });
    
    router.delete('/:id(\\d+)', (_req: RequestWithParams<CourseURIParamsModel>, res: Response) => {
        const id = parseInt(_req.params.id);
        const index = db.courses.findIndex(course => course.id === id);
        if(index === -1){
            return res.status(HTTP_STATUSES.NOT_FOUND).send('Course not found');
        }
        db.courses.splice(index, 1);
        return res.status(HTTP_STATUSES.NO_CONTENT).send('Course deleted');
    });
    
    router.post('/', (_req: RequestWithBody<CourseCreateModel>, res: Response<CourseViewModel | null>) => {
        if(!_req.body.name || _req.body.name === ''){
           res.statusCode = HTTP_STATUSES.BAD_REQUEST;
           res.statusMessage = 'Name is required';
           return res.json(null);
        }
        const newCourse = {
            id: new Date().getTime(),
            name: _req.body.name,
            studentsAmount: 0
        };
        db.courses.push(newCourse);
        return res.status(HTTP_STATUSES.CREATED).json(getViewModel(newCourse));
    });
    
    router.put('/:id(\\d+)', (_req: RequestWithParamsAndBody<CourseURIParamsModel, CourseUpdateModel>, res: Response<CourseViewModel | null>) => {
        const id = parseInt(_req.params.id);
        const course = db.courses.find(course => course.id === id);
        if(!course){
            res.statusCode = HTTP_STATUSES.NOT_FOUND;
            res.statusMessage = 'Course not found';
            return res.json(null);
        }
        if(!_req.body.name || _req.body.name === ''){
            res.statusCode = HTTP_STATUSES.BAD_REQUEST;
            res.statusMessage = 'Name is required';
            return res.json(null);
        }
        course.name = _req.body.name;
        return res.status(HTTP_STATUSES.CREATED).json(getViewModel(course));
    });

    return router;
};