import { Language }
from "./types";

function getLabels(
    language: Language
) {

    if (
        language === "fra"
    ) {

        return {
            footnote:
                "Note de bas de page",

            footnotes:
                "Notes de bas de page",

            returnRef:
                "Retour à la référence de la note de bas de page",

            footnoteRef: ""
        };
    }

    return {
        footnote:
            "Footnote",

        footnotes:
            "Footnotes",

        returnRef:
            "Return to footnote",

        footnoteRef:
            '<span class="wb-inv"> referrer</span>'
    };
}

export function convertWetFootnotes(
    html: string,
    language: Language
): string {

    const count =
        (
            html.match(
                /ftn/g
            ) || []
        ).length;

    if (
        count === 0
    ) {
        return html;
    }

    const labels =
        getLabels(
            language
        );

    const closingTags = "</dl>\n</aside>";
    const closingTagsPattern = new RegExp(
        `${closingTags.replace(/</g, "<\\s*").replace(/>/g, "\\s*>")}\\s*$`,
        "i"
    );

    if (!closingTagsPattern.test(html.trim())) {
        html = `${html}\n</dl>\n</aside>`;
    }

    return html
        .replace(
            /<a href="#_ftn(\d*)" name="_ftnref\d*"><strong>\[\d*\]<\/strong><\/a>/g,
            `<sup id="fn$1-rf"><a class="fn-lnk" href="#fn$1"><span class="wb-inv">${labels.footnote} </span>$1</a></sup>`
        )
        .replace(
            /<a href="#_ftn(\d*)" name="_ftnref\d*"><sup><strong><sup>\[\d*\]<\/sup><\/strong><\/sup><\/a>/g,
            `<sup id="fn$1-rf"><a class="fn-lnk" href="#fn$1"><span class="wb-inv">${labels.footnote} </span>$1</a></sup>`
        )
        .replace(
            /<a href="#_ftn(\d*)" name="_ftnref\d*"><sup><sup>\[\d*\]<\/sup><\/sup><\/a>/g,
            `<sup id="fn$1-rf"><a class="fn-lnk" href="#fn$1"><span class="wb-inv">${labels.footnote} </span>$1</a></sup>`
        )
        .replace(
            /<a href="#_ftn(\d*)" name="_ftnref\d*">\[\d*\]<\/a>/g,
            `<sup id="fn$1-rf"><a class="fn-lnk" href="#fn$1"><span class="wb-inv">${labels.footnote} </span>$1</a></sup>`
        )
        .replace(
            /<sup> <a href="#_ftn(\d*)" name="_ftnref\d*"><sup>\[\d*\]<\/sup><\/a><\/sup>/g,
            `<sup id="fn$1-rf"><a class="fn-lnk" href="#fn$1"><span class="wb-inv">${labels.footnote} </span>$1</a></sup>`
        )
        .replace(/ <sup id="fn/g, "<sup id=\"fn")
        .replace(
            /<p>(?=<a href="#_ftnref1")/g,
            `<aside class="wb-fnote" role="note">\n\t<h2 id="fn">${labels.footnotes}</h2>\n\t<dl><p>`
        )
        .replace(
            /_ftn(\d)*">(<sup>)*(\[\d*\])(<\/sup>)*/g,
            "_ftn$1\">$3"
        )
        .replace(
            /<p><a href="#_ftnref(\d*)" name="_ftn(\d*)">\[(\d*)\]<\/a>((.|\n)*?)((?=<p><a href=)|(?=<\/dl>))/g,
            `\n\t\t<dt>${labels.footnote} $1</dt>\n\t\t<dd id="fn$1">\n\t\t\t<p>$4\t\t\t<p class="fn-rtn"><a href="#fn$1-rf"><span class="wb-inv">${labels.returnRef} </span>$1${labels.footnoteRef}</a></p>\n\t\t</dd>`
        )
        .replace(/<p> /g, "<p>")
        .replace(/(\n*)<\/dl>\n<\/aside>/g, "\n\t</dl>\n</aside>")
        .replace(/<div>\n(\s)*<hr>\n<div id="ftn1">/g, "")
        .replace(/<\/div>\n<div id="ftn(\d)*">/g, "")
        .replace(/<\/div>\n<\/div>\s*(?=<p class="fn-rtn">)/g, "")
        .replace(/<p>&nbsp;/g, "<p>");
}