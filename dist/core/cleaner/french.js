"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanFrench = cleanFrench;
function cleanFrench(html) {
    return html
        .replace(/(\s+):/g, "&nbsp;:")
        .replace(/ »/g, "&nbsp;»")
        .replace(/« /g, "«&nbsp;")
        .replace(/(?<=\b\d{1,3}) (?=\d{3}(?:\b| ))/g, "&nbsp;")
        .replace(/(?<=\b\d{1,3}) (?=\$)/g, "&nbsp;");
}
//# sourceMappingURL=french.js.map