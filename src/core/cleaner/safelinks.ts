import * as cheerio from "cheerio";

export function decodeSafeLinks(
    html: string
): string {

    const $ = cheerio.load(html);

    $('a[href*="safelinks.protection.outlook.com"]')
        .each((_, element) => {

            const href =
                $(element)
                    .attr("href");

            if (!href) {
                return;
            }

            try {

                const url =
                    new URL(href);

                let realUrl =
                    url.searchParams.get(
                        "url"
                    ) ??
                    url.searchParams.get(
                        "target"
                    );

                if (
                    realUrl
                ) {

                    realUrl =
                        decodeURIComponent(
                            realUrl
                        );

                    $(element)
                        .attr(
                            "href",
                            realUrl
                        );
                }

            }
            catch {

                // ignore invalid urls

            }
        });

    return $.html();
}