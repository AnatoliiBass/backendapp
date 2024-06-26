import { body, query } from "express-validator";

const isValidNorwegianPhone = (value: string) => {
    const regex = /^(\+47|0047)?[49]\d{7}$/; // This regex should match Norwegian mobile numbers
    return regex.test(value);
  };

export const nameValidator = body("name").trim().isLength({ min: 2, max: 100 })
.withMessage("Name must be between 2 and 100 characters long and cannot be empty");

export const firstNameValidator = body("author_first_name").trim().isLength({ min: 2, max: 100 })
.withMessage("Author first name must be between 2 and 100 characters long and cannot be empty");

export const lastNameValidator = body("author_last_name").trim().isLength({ min: 2, max: 100 })
.withMessage("Author last name must be between 2 and 100 characters long and cannot be empty");

export const courseValidation = [
    nameValidator,
    firstNameValidator,
    lastNameValidator
];

export const userFirstNameValidator = body("first_name").trim().isLength({ min: 2, max: 100 });
export const userLastNameValidator = body("last_name").trim().isLength({ min: 2, max: 100 });
export const userRoleValidator = body("role").trim().isLowercase().isIn(["student", "author", "admin"]);
export const userEmailValidator = body("email").trim().isEmail();
export const userCodeValidator = query("code").trim().isLength({ min: 8 });
export const userPhoneValidator = body("phone").trim().isLength({ min: 8, max: 100 });
export const userBirthdateValidator = body("birthdate").trim().isISO8601();
export const userPasswordValidator = body("password").trim().isLength({ min: 8, max: 100 });

export const userValidation = [
    userFirstNameValidator.withMessage("First name must be between 2 and 100 characters long and cannot be empty"),
    userLastNameValidator.withMessage("Last name must be between 2 and 100 characters long and cannot be empty"),
    userEmailValidator.withMessage("Email must be a valid email"),
    userPhoneValidator.withMessage("Phone must be a valid phone number"),
    userBirthdateValidator.withMessage("Birthdate must be a valid date"),
    userPasswordValidator.withMessage("Password must be between 8 and 100 characters long and cannot be empty")
];

export const commentValidator = body("comment").trim().isLength({ min: 2, max: 1000 });