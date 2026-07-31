import * as cheerio from "cheerio";

export function removeEmptyAnchors(
    html: string
): string {

    const $ = cheerio.load(html);

    $("a").each(
        (_, element) => {

            const attrs =
                element.attribs
                ? Object.keys(
                    element.attribs
                )
                : [];

            if (
                attrs.length === 0
            ) {

                $(element)
                    .replaceWith(
                        $(element)
                            .html() ?? ""
                    );
            }
        }
    );

    return $.html();
}