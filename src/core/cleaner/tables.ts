export function cleanTables(
    html: string
): string {

    return html

        .replace(
            / border="(\d+)"/g,
            ""
        )

        .replace(
            / cellspacing="(\d+)"/g,
            ""
        )

        .replace(
            / cellpadding="(\d+)"/g,
            ""
        )

        .replace(
            / width="(\d+)\%*"/g,
            ""
        )

        .replace(
            / valign="(\w+)"/g,
            ""
        )

        .replace(
            / nowrap/g,
            ""
        )

        .replace(
            /<table>/g,
            '<table class="table table-bordered">'
        );
}