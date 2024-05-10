"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewModelAuthor = void 0;
function getViewModelAuthor(courses, author) {
    console.log("getViewModel courses: ", courses);
    console.log("getViewModel author: ", author);
    return { id: author.id, first_name: author.first_name, last_name: author.last_name, courses: courses.map(c => ({ id: c.id, name: c.name })) };
}
exports.getViewModelAuthor = getViewModelAuthor;
//# sourceMappingURL=getViewModelAuthor.js.map