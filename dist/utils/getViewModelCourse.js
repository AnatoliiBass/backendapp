"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewModelCourse = void 0;
function getViewModelCourse(course, author) {
    console.log("getViewModel course: ", course);
    console.log("getViewModel author: ", author);
    return { id: course.id, name: course.name, author: { first_name: author.first_name, last_name: author.last_name } };
}
exports.getViewModelCourse = getViewModelCourse;
//# sourceMappingURL=getViewModelCourse.js.map