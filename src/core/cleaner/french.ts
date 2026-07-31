export function cleanFrench(
    html: string
): string {

    return html

        .replace(
            /(\s+):/g,
            "&nbsp;:"
        )

        .replace(
            / »/g,
            "&nbsp;»"
        )

        .replace(
            /« /g,
            "«&nbsp;"
        )

        .replace(
            /(?<=\b\d{1,3}) (?=\d{3}(?:\b| ))/g,
            "&nbsp;"
        )

        .replace(
            /(?<=\b\d{1,3}) (?=\$)/g,
            "&nbsp;"
        );
}