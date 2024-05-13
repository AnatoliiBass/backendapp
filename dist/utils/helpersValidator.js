"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastNameValidator = exports.firstNameValidator = exports.nameValidator = void 0;
const express_validator_1 = require("express-validator");
exports.nameValidator = (0, express_validator_1.body)("name").trim().isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters long and cannot be empty");
exports.firstNameValidator = (0, express_validator_1.body)("author_first_name").trim().isLength({ min: 2, max: 100 })
    .withMessage("Author first name must be between 2 and 100 characters long and cannot be empty");
exports.lastNameValidator = (0, express_validator_1.body)("author_last_name").trim().isLength({ min: 2, max: 100 })
    .withMessage("Author last name must be between 2 and 100 characters long and cannot be empty");
//# sourceMappingURL=helpersValidator.js.map