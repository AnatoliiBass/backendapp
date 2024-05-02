"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewModel = void 0;
function getViewModel(course, author) {
    console.log("getViewModel course: ", course);
    console.log("getViewModel author: ", author);
    return { id: course.id, name: course.name, author: { first_name: author.first_name, last_name: author.last_name } };
}
exports.getViewModel = getViewModel;
//# sourceMappingURL=getViewModel.js.map