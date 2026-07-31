"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanWordMarkup = cleanWordMarkup;
const word_comments_1 = require("./cleaner/word-comments");
const safelinks_1 = require("./cleaner/safelinks");
const track_changes_1 = require("./cleaner/track-changes");
const anchors_1 = require("./cleaner/anchors");
const paragraphs_1 = require("./cleaner/paragraphs");
function cleanWordMarkup(html) {
    html = (0, word_comments_1.removeWordComments)(html);
    html = (0, safelinks_1.decodeSafeLinks)(html);
    html = (0, track_changes_1.removeTrackChanges)(html);
    html = (0, anchors_1.removeEmptyAnchors)(html);
    html = (0, paragraphs_1.simplifyNestedParagraphs)(html);
    return html;
}
//# sourceMappingURL=word.js.map