"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSpaces = normalizeSpaces;
function normalizeSpaces(html) {
    return html
        // remove spaces before punctuation
        .replace(/\s+(;|!|,|\)|\]|})/g, "$1")
        // remove spaces after opening brackets
        .replace(/(\(|\[|\{)\s+/g, "$1")
        // remove double spaces
        .replace(/ (\s+)/g, " ")
        .replace(/ ( +)/g, " ")
        .replace(/( +) /g, " ")
        // nbsp cleanup
        .replace(/&nbsp; /g, " ")
        .replace(/ &nbsp;/g, " ")
        .replace(/(&nbsp;)+/g, "&nbsp;");
}
//# sourceMappingURL=spaces.js.map