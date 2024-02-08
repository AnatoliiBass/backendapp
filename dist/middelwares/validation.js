"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesValidation = void 0;
const express_validator_1 = require("express-validator");
const coursesValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log("Errors: ", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.coursesValidation = coursesValidation;
//# sourceMappingURL=validation.js.map