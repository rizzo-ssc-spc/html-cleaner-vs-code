"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertCanadaLinks = convertCanadaLinks;
exports.buildCanadaUrlFromHtml = buildCanadaUrlFromHtml;
function convertCanadaLinks(html) {
    return html
        .replace(/href="https:\/\/www\.canada\.ca\/en\//g, 'href="/content/canadasite/en/')
        .replace(/href="https:\/\/www\.canada\.ca\/fr\//g, 'href="/content/canadasite/fr/');
}
function buildCanadaUrlFromHtml(html) {
    const title = extractTitle(html);
    if (!title) {
        return null;
    }
    const isFrench = detectFrench(title);
    return titleToUrl(title, isFrench);
}
function extractTitle(html) {
    const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/is);
    if (h1Match?.[1]) {
        return stripTags(h1Match[1]).trim();
    }
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
    if (titleMatch?.[1]) {
        return stripTags(titleMatch[1]).trim();
    }
    const lines = html
        .split(/\r?\n/)
        .map(x => x.trim())
        .filter(Boolean);
    return lines.length
        ? lines[0]
        : null;
}
function detectFrench(text) {
    return (/[éèêàùçôîûœâ]/i.test(text)
        ||
            /\b(le|la|les|un|une|en|de|du|des|pour|avec|sur|dans|et|est)\b/i
                .test(text));
}
function titleToUrl(title, isFrench) {
    let s = title
        .toLowerCase()
        .replace(/[’'`ʹ]/g, "");
    const map = {
        "à": "a",
        "á": "a",
        "â": "a",
        "ä": "a",
        "ç": "c",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "î": "i",
        "ï": "i",
        "ô": "o",
        "ö": "o",
        "ù": "u",
        "û": "u",
        "ü": "u",
        "œ": "oe"
    };
    s = s
        .split("")
        .map(c => map[c] || c)
        .join("");
    s = s.replace(/[^a-z0-9\s-]/g, " ");
    let tokens = s
        .split(/[\s-]+/)
        .filter(Boolean);
    const stopEn = [
        "to",
        "the",
        "a",
        "an",
        "by",
        "for",
        "of",
        "how",
        "on",
        "in",
        "and",
        "or",
        "with",
        "is"
    ];
    const stopFr = [
        "de",
        "du",
        "des",
        "la",
        "le",
        "les",
        "un",
        "une",
        "en",
        "par",
        "pour",
        "sur",
        "dans",
        "et",
        "ou",
        "avec",
        "est",
        "a"
    ];
    const stopWords = isFrench
        ? stopFr
        : stopEn;
    if (tokens.length > 1) {
        tokens = tokens.filter(x => !stopWords.includes(x));
    }
    const seen = new Set();
    const result = tokens.filter(token => {
        if (seen.has(token)) {
            return false;
        }
        seen.add(token);
        return true;
    });
    const url = result
        .join("-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
    return url || null;
}
function stripTags(html) {
    return html.replace(/<[^>]+>/g, "");
}
//# sourceMappingURL=canada.js.map