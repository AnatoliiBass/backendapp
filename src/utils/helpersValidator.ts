import { body } from "express-validator";

export const nameValidator = body("name").trim().isLength({ min: 2, max: 100 })
.withMessage("Name must be between 2 and 100 characters long and cannot be empty");