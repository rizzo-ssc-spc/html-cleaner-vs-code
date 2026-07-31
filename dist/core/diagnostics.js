"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIssues = findIssues;
function findIssues(html, language) {
    const issues = [];
    if (html.includes("<em")) {
        issues.push({
            message: "EM tag detected. Consider cite or strong."
        });
    }
    if (html.includes("<u>")) {
        issues.push({
            message: "U tag detected."
        });
    }
    if (html.includes("<table") &&
        !html.includes("</thead>")) {
        issues.push({
            message: "Table detected without THEAD."
        });
    }
    if (language === "eng" &&
        (html.includes("/fr/")
            ||
                html.includes("-fra."))) {
        issues.push({
            message: "French links detected."
        });
    }
    if (language === "fra" &&
        (html.includes("/en/")
            ||
                html.includes("-eng."))) {
        issues.push({
            message: "English links detected."
        });
    }
    return issues;
}
//# sourceMappingURL=diagnostics.js.map