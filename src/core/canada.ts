export function convertCanadaLinks(
    html: string
): string {

    return html
        .replace(
            /href="https:\/\/www\.canada\.ca\/en\//g,
            'href="/content/canadasite/en/'
        )
        .replace(
            /href="https:\/\/www\.canada\.ca\/fr\//g,
            'href="/content/canadasite/fr/'
        );
}

export function buildCanadaUrlFromHtml(
    html: string
): string | null {

    const title = extractTitle(html);

    if (!title) {
        return null;
    }

    const isFrench = detectFrench(title);

    return titleToUrl(
        title,
        isFrench
    );
}

function extractTitle(
    html: string
): string | null {

    const h1Match =
        html.match(
            /<h1[^>]*>(.*?)<\/h1>/is
        );

    if (h1Match?.[1]) {
        return stripTags(
            h1Match[1]
        ).trim();
    }

    const titleMatch =
        html.match(
            /<title[^>]*>(.*?)<\/title>/is
        );

    if (titleMatch?.[1]) {
        return stripTags(
            titleMatch[1]
        ).trim();
    }

    const lines = html
        .split(/\r?\n/)
        .map(x => x.trim())
        .filter(Boolean);

    return lines.length
        ? lines[0]
        : null;
}

function detectFrench(
    text: string
): boolean {

    return (
        /[éèêàùçôîûœâÄÉÈÊÔÛÎ]/.test(text)
        ||
        /\b(le|la|les|un|une|en|de|du|des|pour|avec|sur|dans|et|est)\b/i
            .test(text)
    );
}

function titleToUrl(
    title: string,
    isFrench: boolean
): string | null {

    let s = title
        .toLowerCase()
        .replace(/[’'`ʹ]/g, "");

    const map: Record<string, string> = {
        "à": "a", "á": "a", "â": "a", "ã": "a", "ä": "a", "å": "a", "ā": "a",
        "ç": "c", "ć": "c", "č": "c",
        "è": "e", "é": "e", "ê": "e", "ë": "e", "ē": "e",
        "î": "i", "ï": "i", "í": "i", "ī": "i",
        "ô": "o", "ö": "o", "ò": "o", "ó": "o", "õ": "o", "ø": "o",
        "û": "u", "ü": "u", "ù": "u", "ú": "u", "ū": "u",
        "œ": "oe", "æ": "ae", "ß": "ss", "ñ": "n"
    };

    s = s
        .split("")
        .map(c => map[c] || c)
        .join("");

    s = s.replace(
        /[^a-z0-9\s-]/g,
        " "
    );

    let tokens = s
        .split(/[\s-]+/)
        .filter(Boolean);

    const stopEn = [
        "to",
        "the",
        "a",
        "an",
        "by",
        "for",
        "of",
        "how",
        "on",
        "in",
        "and",
        "or",
        "with",
        "is",
        "are",
        "what"
    ];

    const stopFr = [
        "de",
        "du",
        "des",
        "la",
        "le",
        "les",
        "un",
        "une",
        "en",
        "par",
        "pour",
        "sur",
        "dans",
        "et",
        "ou",
        "avec",
        "est",
        "a",
        "sont",
        "comment"
    ];

    const stopWords =
        isFrench
            ? stopFr
            : stopEn;

    if (tokens.length > 1) {

        tokens = tokens.filter(
            x => !stopWords.includes(x)
        );

    }

    const seen =
        new Set<string>();

    const result =
        tokens.filter(token => {

            if (
                seen.has(token)
            ) {
                return false;
            }

            seen.add(token);

            return true;

        });

    const url =
        result
            .join("-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "");

    return url || null;
}

function stripTags(
    html: string
): string {

    return html.replace(
        /<[^>]+>/g,
        ""
    );
}