"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewModelCourse = void 0;
function getViewModelCourse(course, author) {
    return { id: course.id, name: course.name, author: { first_name: author.first_name, last_name: author.last_name }, comments: course.comments };
}
exports.getViewModelCourse = getViewModelCourse;
//# sourceMappingURL=getViewModelCourse.js.map