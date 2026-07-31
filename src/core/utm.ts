// core/utm.ts

export function removeUtmCodes(
    html: string
): string {

    return html.replace(
        /\?utm[^"]*/g,
        ""
    );
}