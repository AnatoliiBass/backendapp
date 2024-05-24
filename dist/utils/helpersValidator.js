"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.userPasswordValidator = exports.userBirthdateValidator = exports.userPhoneValidator = exports.userEmailValidator = exports.userRoleValidator = exports.userLastNameValidator = exports.userFirstNameValidator = exports.courseValidation = exports.lastNameValidator = exports.firstNameValidator = exports.nameValidator = void 0;
const express_validator_1 = require("express-validator");
const isValidNorwegianPhone = (value) => {
    const regex = /^(\+47|0047)?[49]\d{7}$/; // This regex should match Norwegian mobile numbers
    return regex.test(value);
};
exports.nameValidator = (0, express_validator_1.body)("name").trim().isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters long and cannot be empty");
exports.firstNameValidator = (0, express_validator_1.body)("author_first_name").trim().isLength({ min: 2, max: 100 })
    .withMessage("Author first name must be between 2 and 100 characters long and cannot be empty");
exports.lastNameValidator = (0, express_validator_1.body)("author_last_name").trim().isLength({ min: 2, max: 100 })
    .withMessage("Author last name must be between 2 and 100 characters long and cannot be empty");
exports.courseValidation = [
    exports.nameValidator,
    exports.firstNameValidator,
    exports.lastNameValidator
];
exports.userFirstNameValidator = (0, express_validator_1.body)("first_name").trim().isLength({ min: 2, max: 100 });
exports.userLastNameValidator = (0, express_validator_1.body)("last_name").trim().isLength({ min: 2, max: 100 });
exports.userRoleValidator = (0, express_validator_1.body)("role").trim().isLowercase().isIn(["student", "author", "admin"]);
exports.userEmailValidator = (0, express_validator_1.body)("email").trim().isEmail();
exports.userPhoneValidator = (0, express_validator_1.body)("phone").trim().isLength({ min: 8, max: 100 });
exports.userBirthdateValidator = (0, express_validator_1.body)("birthdate").trim().isISO8601();
exports.userPasswordValidator = (0, express_validator_1.body)("password").trim().isLength({ min: 8, max: 100 });
exports.userValidation = [
    exports.userFirstNameValidator.withMessage("First name must be between 2 and 100 characters long and cannot be empty"),
    exports.userLastNameValidator.withMessage("Last name must be between 2 and 100 characters long and cannot be empty"),
    exports.userEmailValidator.withMessage("Email must be a valid email"),
    exports.userPhoneValidator.withMessage("Phone must be a valid phone number"),
    exports.userBirthdateValidator.withMessage("Birthdate must be a valid date"),
    exports.userPasswordValidator.withMessage("Password must be between 8 and 100 characters long and cannot be empty")
];
//# sourceMappingURL=helpersValidator.js.map