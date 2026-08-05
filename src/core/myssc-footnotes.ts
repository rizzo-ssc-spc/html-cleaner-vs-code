import * as cheerio from "cheerio";

export function convertMySSCFootnotes(
    html: string
): string {

    const $ = cheerio.load(html, undefined, false);

    const footnotes: Record<
        string,
        string
    > = {};

    $("dd[id^='fn']").each(
        (_, element) => {

            const fnId =
                $(element).attr("id");

            if (!fnId) {
                return;
            }

            const content =
                $(element)
                    .find(
                        "p:not(.fn-rtn)"
                    )
                    .map(
                        (_, p) =>
                            $.html(p)
                    )
                    .get()
                    .join("");

            footnotes[fnId] =
                content;
        }
    );

    $("sup[id$='-rf']").each(
        (_, element) => {

            const link =
                $(element)
                    .find("a");

            const href =
                link.attr("href");

            if (!href) {
                return;
            }

            const fnId =
                href.replace(
                    "#",
                    ""
                );

            const content =
                footnotes[fnId];

            if (!content) {
                return;
            }

            const fnText =
                link.text().trim();

            const symbol =
                fnText.match(
                    /[^\d\s]+$/
                );

            const dataValue =
                symbol
                    ? symbol[0]
                    : "";

            const encodedContent =
                $("<div>")
                    .text(content)
                    .html();

            $(element).replaceWith(
                `<footnotes data-value="${dataValue}" data-text="${encodedContent}">&nbsp;</footnotes>`
            );
        }
    );

    $("aside.wb-fnote")
        .remove();

    return $.html();
}