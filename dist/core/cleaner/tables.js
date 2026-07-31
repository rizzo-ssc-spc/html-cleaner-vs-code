"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanTables = cleanTables;
function cleanTables(html) {
    return html
        .replace(/ border="(\d+)"/g, "")
        .replace(/ cellspacing="(\d+)"/g, "")
        .replace(/ cellpadding="(\d+)"/g, "")
        .replace(/ width="(\d+)\%*"/g, "")
        .replace(/ valign="(\w+)"/g, "")
        .replace(/ nowrap/g, "")
        .replace(/<table>/g, '<table class="table table-bordered">');
}
//# sourceMappingURL=tables.js.map