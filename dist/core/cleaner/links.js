"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanLinks = cleanLinks;
function cleanLinks(html) {
    return html
        .replace(/ target="_blank"/g, "")
        .replace(/ target="blank"/g, "")
        .replace(/(\s+)<\/a>/g, "</a> ")
        .replace(/<a name="([^"]*)">(.*?)<\/a>/g, "$2");
}
//# sourceMappingURL=links.js.map