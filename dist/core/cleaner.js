"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanHtml = cleanHtml;
const spaces_1 = require("./cleaner/spaces");
const links_1 = require("./cleaner/links");
const headings_1 = require("./cleaner/headings");
const tables_1 = require("./cleaner/tables");
const dates_1 = require("./cleaner/dates");
const french_1 = require("./cleaner/french");
const word_1 = require("./word");
function cleanHtml(html, language) {
    html = (0, spaces_1.normalizeSpaces)(html);
    html = (0, links_1.cleanLinks)(html);
    html = (0, headings_1.cleanHeadings)(html);
    html = (0, tables_1.cleanTables)(html);
    html = (0, dates_1.cleanDates)(html);
    html = (0, word_1.cleanWordMarkup)(html);
    if (language === "fra") {
        html = (0, french_1.cleanFrench)(html);
    }
    return html;
}
//# sourceMappingURL=cleaner.js.map