import { removeWordComments } from "./cleaner/word-comments";
import { decodeSafeLinks } from "./cleaner/safelinks";
import { removeTrackChanges } from "./cleaner/track-changes";
import { removeEmptyAnchors } from "./cleaner/anchors";
import { simplifyNestedParagraphs } from "./cleaner/paragraphs";

export function cleanWordMarkup(
    html: string
): string {

    html = removeWordComments(html);
    html = decodeSafeLinks(html);
    html = removeTrackChanges(html);
    html = removeEmptyAnchors(html);
    html = simplifyNestedParagraphs(html);

    return html;
}