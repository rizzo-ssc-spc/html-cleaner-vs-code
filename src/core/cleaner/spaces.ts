export function normalizeSpaces(
    html: string
): string {

    return html

        // remove spaces before punctuation

        .replace(
            /\s+(;|!|,|\)|\]|})/g,
            "$1"
        )

        // remove spaces after opening brackets

        .replace(
            /(\(|\[|\{)\s+/g,
            "$1"
        )

        // remove double spaces

        .replace(
            / (\s+)/g,
            " "
        )

        .replace(
            / ( +)/g,
            " "
        )

        .replace(
            /( +) /g,
            " "
        )

        // nbsp cleanup

        .replace(
            /&nbsp; /g,
            " "
        )

        .replace(
            / &nbsp;/g,
            " "
        )

        .replace(
            /(&nbsp;)+/g,
            "&nbsp;"
        );
}
