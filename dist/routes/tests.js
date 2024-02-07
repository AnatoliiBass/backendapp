"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestsRoute = void 0;
const express_1 = __importDefault(require("express"));
const httpstatuses_1 = require("../utils/httpstatuses");
const getTestsRoute = (db) => {
    const router = express_1.default.Router();
    router.delete("/", (_req, res) => {
        db.courses = [];
        return res.status(httpstatuses_1.HTTP_STATUSES.NO_CONTENT).send("Courses deleted");
    });
    return router;
};
exports.getTestsRoute = getTestsRoute;
//# sourceMappingURL=tests.js.map