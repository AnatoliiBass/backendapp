"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidation = exports.studentPasswordValidator = exports.studentBirthdateValidator = exports.studentPhoneValidator = exports.studentEmailValidator = exports.studentLastNameValidator = exports.studentFirstNameValidator = exports.courseValidation = exports.lastNameValidator = exports.firstNameValidator = exports.nameValidator = void 0;
const express_validator_1 = require("express-validator");
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
exports.studentFirstNameValidator = (0, express_validator_1.body)("first_name").trim().isLength({ min: 2, max: 100 });
exports.studentLastNameValidator = (0, express_validator_1.body)("last_name").trim().isLength({ min: 2, max: 100 });
exports.studentEmailValidator = (0, express_validator_1.body)("email").trim().isEmail();
exports.studentPhoneValidator = (0, express_validator_1.body)("phone").trim().isMobilePhone('nb-NO', { strictMode: false });
exports.studentBirthdateValidator = (0, express_validator_1.body)("birthdate").trim().isISO8601();
exports.studentPasswordValidator = (0, express_validator_1.body)("password").trim().isLength({ min: 8, max: 100 });
exports.studentValidation = [
    exports.studentFirstNameValidator.withMessage("First name must be between 2 and 100 characters long and cannot be empty"),
    exports.studentLastNameValidator.withMessage("Last name must be between 2 and 100 characters long and cannot be empty"),
    exports.studentEmailValidator.withMessage("Email must be a valid email"),
    exports.studentPhoneValidator.withMessage("Phone must be a valid phone number"),
    exports.studentBirthdateValidator.withMessage("Birthdate must be a valid date"),
    exports.studentPasswordValidator.withMessage("Password must be between 8 and 100 characters long and cannot be empty")
];
//# sourceMappingURL=helpersValidator.js.map