"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMySSCFootnotes = convertMySSCFootnotes;
const cheerio = __importStar(require("cheerio"));
function convertMySSCFootnotes(html) {
    const $ = cheerio.load(html);
    const footnotes = {};
    $("dd[id^='fn']").each((_, element) => {
        const fnId = $(element).attr("id");
        if (!fnId) {
            return;
        }
        const content = $(element)
            .find("p:not(.fn-rtn)")
            .map((_, p) => $.html(p))
            .get()
            .join("");
        footnotes[fnId] =
            content;
    });
    $("sup[id$='-rf']").each((_, element) => {
        const link = $(element)
            .find("a");
        const href = link.attr("href");
        if (!href) {
            return;
        }
        const fnId = href.replace("#", "");
        const content = footnotes[fnId];
        if (!content) {
            return;
        }
        const fnText = link.text().trim();
        const symbol = fnText.match(/[^\d\s]+$/);
        const dataValue = symbol
            ? symbol[0]
            : "";
        const encodedContent = $("<div>")
            .text(content)
            .html();
        $(element).replaceWith(`<footnotes data-value="${dataValue}" data-text="${encodedContent}">&nbsp;</footnotes>`);
    });
    $("aside.wb-fnote")
        .remove();
    return $.html();
}
//# sourceMappingURL=myssc-footnotes.js.map