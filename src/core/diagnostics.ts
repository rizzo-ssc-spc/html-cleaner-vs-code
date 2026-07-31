import { Language } from "./types";

export interface Issue {
    message: string;
}

export function findIssues(
    html: string,
    language: Language
): Issue[] {

    const issues: Issue[] = [];

    if (html.includes("<em")) {
        issues.push({
            message:
                "EM tag detected. Consider cite or strong."
        });
    }

    if (html.includes("<u>")) {
        issues.push({
            message:
                "U tag detected."
        });
    }

    if (
        html.includes("<table") &&
        !html.includes("</thead>")
    ) {
        issues.push({
            message:
                "Table detected without THEAD."
        });
    }

    if (
        language === "eng" &&
        (
            html.includes("/fr/")
            ||
            html.includes("-fra.")
        )
    ) {
        issues.push({
            message:
                "French links detected."
        });
    }

    if (
        language === "fra" &&
        (
            html.includes("/en/")
            ||
            html.includes("-eng.")
        )
    ) {
        issues.push({
            message:
                "English links detected."
        });
    }

    return issues;
}