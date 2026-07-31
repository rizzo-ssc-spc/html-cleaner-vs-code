"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanDates = cleanDates;
function cleanDates(html) {
    return html
        .replace(/(January|February|March|April|May|June|July|August|September|October|November|December) (\d+)/g, "$1&nbsp;$2")
        .replace(/(\d+) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/g, "$1&nbsp;$2")
        .replace(/(1er) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/g, "1er&nbsp;$2");
}
//# sourceMappingURL=dates.js.map