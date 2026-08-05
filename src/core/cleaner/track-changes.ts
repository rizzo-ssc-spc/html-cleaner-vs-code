import * as cheerio from "cheerio";

export function removeTrackChanges(
    html: string
): string {

    const $ = cheerio.load(html, undefined, false);

    $("ins").each(
        (_, element) => {

            const content =
                $(element).html();

            $(element)
                .replaceWith(
                    content ?? ""
                );
        }
    );

    $("del").remove();

    return $.html();
}