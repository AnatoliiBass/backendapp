"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nameValidator = void 0;
const express_validator_1 = require("express-validator");
exports.nameValidator = (0, express_validator_1.body)("name").trim().isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters long and cannot be empty");
//# sourceMappingURL=helpersValidator.js.map