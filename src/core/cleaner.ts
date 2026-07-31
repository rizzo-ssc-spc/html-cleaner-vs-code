import { Language } from "./types";
import { normalizeSpaces } from "./cleaner/spaces";
import { cleanLinks } from "./cleaner/links";
import { cleanHeadings } from "./cleaner/headings";
import { cleanTables } from "./cleaner/tables";
import { cleanDates } from "./cleaner/dates";
import { cleanFrench } from "./cleaner/french";
import { cleanWordMarkup } from "./word";


export function cleanHtml(
    html: string,
    language: Language
): string {

    html = normalizeSpaces(html);
    html = cleanLinks(html);
    html = cleanHeadings(html);
    html = cleanTables(html);
    html = cleanDates(html);
    html = cleanWordMarkup(html);
    if (
        language === "fra"
    ) {

        html = cleanFrench(html);
    }

    return html;
}