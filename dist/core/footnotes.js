"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertWetFootnotes = convertWetFootnotes;
function getLabels(language) {
    if (language === "fra") {
        return {
            footnote: "Note de bas de page",
            footnotes: "Notes de bas de page",
            returnRef: "Retour à la référence de la note de bas de page",
            footnoteRef: ""
        };
    }
    return {
        footnote: "Footnote",
        footnotes: "Footnotes",
        returnRef: "Return to footnote",
        footnoteRef: '<span class="wb-inv"> referrer</span>'
    };
}
function normalizeFootnoteRefs(html, footnoteLabel) {
    return html
        .replace(/#_ftn(\d*)="_ftnref\d*"><strong>\[\d*\]<\/strong><\/a>/g, `<sup id="fn$1-rf">#fn$1<span class="wb-inv">${footnoteLabel} </span>$1</a></sup>`)
        .replace(/_ftn(\d*)" name="_ftnref\d*">\[\d*\]<\/a>/g, `<sup id="fn$1-rf">$1"><span class="wb-inv">${footnoteLabel} </span>$1</a></sup>`);
}
function buildFootnoteBlock(html, labels) {
    return html.replace(/<p>#_ftnref(\d*)\[(\d*)\]<\/a>((.|\n)*?)((?=<p>\/dl>))/g, `
        <dt>${labels.footnote} $1</dt>
        <dd id="fn$1">
            <p>$4
            <p class="fn-rtn">
                $1-rf">
                    <span class="wb-inv">
                        ${labels.returnRef}
                    </span>
                    $1${labels.footnoteRef}
                </a>
            </p>
        </dd>
        `);
}
function convertWetFootnotes(html, language) {
    const count = (html.match(/ftn/g) || []).length;
    if (count === 0) {
        return html;
    }
    const labels = getLabels(language);
    html =
        normalizeFootnoteRefs(html, labels.footnote);
    html =
        buildFootnoteBlock(html, labels);
    return html;
}
//# sourceMappingURL=footnotes.js.map