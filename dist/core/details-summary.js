"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailsSummary = detailsSummary;
function detailsSummary(html, language) {
    const expandAll = language === "eng"
        ? "Expand all"
        : "Afficher tout";
    const collapseAll = language === "eng"
        ? "Collapse all"
        : "Réduire tout";
    return html
        .replace(/<h2>/, '<h2 class="first-h2">')
        .replace(/<h2>(.*?)<\/h2>/gs, `</details>

<details>
<summary>
<h2 class="h3">$1</h2>
</summary>`)
        .replace(/<h2 class="first-h2">(.*?)<\/h2>/s, `<div id="lt-tog">

<div class="btn-group mrgn-tp-md mrgn-bttm-md">
<button type="button" class="btn btn-default wb-toggle" data-toggle='{"selector": "details", "parent": "#lt-tog", "print": "on", "type": "on"}'>${expandAll}</button>
<button type="button" class="btn btn-default wb-toggle" data-toggle='{"selector": "details", "parent": "#lt-tog", "type": "off"}'>${collapseAll}</button>
</div>

<details>
<summary>
<h2 class="h3">$1</h2>
</summary>`)
        .concat(`
</details>
</div>`)
        .replace(/<\/p>\s*<\/details>/g, "</p>\n</details>")
        .replace(/<\/ul>\s*<\/details>/g, "</ul>\n</details>")
        .replace(/<\/ol>\s*<\/details>/g, "</ol>\n</details>");
}
//# sourceMappingURL=details-summary.js.map