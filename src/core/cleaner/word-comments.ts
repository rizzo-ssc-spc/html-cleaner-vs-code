import * as cheerio from "cheerio";

export function removeWordComments(
    html: string
): string {

    const $ = cheerio.load(html, undefined, false);

    $('a[href*="#_msocom"]').remove();

    $("div").each((_, element) => {

        const current =
            $(element);

        const content =
            current.html() ?? "";

        const startsWithHr =
            content
                .trim()
                .startsWith("<hr>");

        const hasCommentDiv =
            current.find(
                'div[id^="_com_"]'
            ).length > 0;

        const hasAnchor =
            current.find(
                'a[href^="#_msoanchor_"]'
            ).length > 0;

        if (
            startsWithHr &&
            hasCommentDiv &&
            hasAnchor
        ) {
            current.remove();
        }
    });

    return $.html();
}