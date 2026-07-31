export function cleanLinks(
    html: string
): string {

    return html

        .replace(
            / target="_blank"/g,
            ""
        )

        .replace(
            / target="blank"/g,
            ""
        )

        .replace(
            /(\s+)<\/a>/g,
            "</a> "
        )

        .replace(
            /<a name="([^"]*)">(.*?)<\/a>/g,
            "$2"
        );
}