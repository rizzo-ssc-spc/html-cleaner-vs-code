import * as cheerio from "cheerio";

export function simplifyNestedParagraphs(
    html: string
): string {

    const $ = cheerio.load(html);

    $("li, th, td, dt, dd").each(
        (_, element) => {

            const node = $(element);

            const paragraphs =
                node.find("p");

            const onlyParagraph =
                paragraphs.length === 1;

            const paragraphHasNoChildren =
                paragraphs.children().length === 0;

            const parent =
                paragraphs.parent();

            const paragraphIsOnlyChild =
                parent.children().length === 1;

            if (
                onlyParagraph &&
                paragraphHasNoChildren &&
                paragraphIsOnlyChild
            ) {
                node.html(
                    paragraphs.html() ?? ""
                );
            }

            if (
                node.is("dt") ||
                node.is("th")
            ) {

                node.find("strong").each(
                    (_, strong) => {

                        $(strong).replaceWith(
                            $(strong).html() ?? ""
                        );

                    }
                );

            }

        }
    );

    return $.html();
}