"use strict";
// core/utm.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUtmCodes = removeUtmCodes;
function removeUtmCodes(html) {
    return html.replace(/\?utm[^"]*/g, "");
}
//# sourceMappingURL=utm.js.map