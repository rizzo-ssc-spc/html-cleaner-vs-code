"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanHeadings = cleanHeadings;
function cleanHeadings(html) {
    return html
        .replace(/(\w)\s*<\/h(\d)>/g, "$1</h$2>")
        .replace(/<h(\d)>\s*([\w(])/g, "<h$1>$2")
        .replace(/\s*<\/h(\d)>/g, "</h$1>")
        .replace(/<h(\d)><strong>\s*/g, "<h$1>")
        .replace(/<h(\d)>\s*<strong>/g, "<h$1>")
        .replace(/<\/strong><\/h(\d)>\s*/g, "</h$1>");
}
//# sourceMappingURL=headings.js.map