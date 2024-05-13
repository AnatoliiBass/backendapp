import { body } from "express-validator";

export const nameValidator = body("name").trim().isLength({ min: 2, max: 100 })
.withMessage("Name must be between 2 and 100 characters long and cannot be empty");

export const firstNameValidator = body("author_first_name").trim().isLength({ min: 2, max: 100 })
.withMessage("Author first name must be between 2 and 100 characters long and cannot be empty");

export const lastNameValidator = body("author_last_name").trim().isLength({ min: 2, max: 100 })
.withMessage("Author last name must be between 2 and 100 characters long and cannot be empty");