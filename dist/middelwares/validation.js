"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standartValidation = void 0;
const express_validator_1 = require("express-validator");
const httpstatuses_1 = require("../utils/httpstatuses");
const standartValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        console.log("Errors: ", errors.array());
        return res.status(httpstatuses_1.HTTP_STATUSES.BAD_REQUEST).json({ errors: errors.array() });
    }
    else {
        next();
    }
};
exports.standartValidation = standartValidation;
//# sourceMappingURL=validation.js.map