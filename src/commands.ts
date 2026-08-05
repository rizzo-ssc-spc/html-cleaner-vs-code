import * as vscode from "vscode";

import { cleanHtml } from "./core/cleaner";
import { removeUtmCodes } from "./core/utm";
import { convertCanadaLinks, buildCanadaUrlFromHtml } from "./core/canada";
import { detailsSummary } from "./core/details-summary";
import { findIssues } from "./core/diagnostics";
import { convertMySSCFootnotes } from "./core/myssc-footnotes";
import { convertWetFootnotes } from "./core/footnotes";
import { Language } from "./core/types";

async function transformDocument(
    transform: (html: string) => string
): Promise<string | undefined> {

    const editor =
        vscode.window.activeTextEditor;

    if (!editor) {
        return;
    }

    const text =
        editor.document.getText();

    const output =
        transform(text);

    const range =
        new vscode.Range(
            editor.document.positionAt(0),
            editor.document.positionAt(text.length)
        );

    const applied = await editor.edit(builder => {
        builder.replace(range, output);
    });

    return applied
        ? output
        : undefined;
}

function showIssues(
    html: string,
    language: Language
) {
    const issues = findIssues(html, language);

    if (issues.length === 0) {
        vscode.window.showInformationMessage("No issues found.");
        return;
    }

    vscode.window.showWarningMessage(
        issues.map(issue => issue.message).join("\n")
    );
}

export function registerCommands(
    context: vscode.ExtensionContext
) {

    context.subscriptions.push(

        vscode.commands.registerCommand(
            "htmlCleaner.cleanEn",
            async () => {
                const html = await transformDocument(
                    input => cleanHtml(input, "eng")
                );

                if (html) {
                    showIssues(html, "eng");
                }
            }
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.cleanFr",
            async () => {
                const html = await transformDocument(
                    input => cleanHtml(input, "fra")
                );

                if (html) {
                    showIssues(html, "fra");
                }
            }
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.removeUtm",
            () =>
                transformDocument(
                    removeUtmCodes
                )
        ),
        vscode.commands.registerCommand(
            "htmlCleaner.convertCanadaLinks",
            () =>
                transformDocument(
                    convertCanadaLinks
                )
        ),
        vscode.commands.registerCommand(
            "htmlCleaner.canadaUrl",

            async () => {

                const editor =
                    vscode.window.activeTextEditor;

                if (!editor) {
                    return;
                }

                const html =
                    editor.document.getText();

                const url =
                    buildCanadaUrlFromHtml(
                        html
                    );

                if (!url) {

                    vscode.window.showWarningMessage(
                        "Could not generate Canada.ca URL."
                    );

                    return;
                }

                await vscode.env.clipboard.writeText(
                    url
                );

                vscode.window.showInformationMessage(
                    `URL copied: ${url}`
                );
            }
        ),
                
        vscode.commands.registerCommand(
            "htmlCleaner.copyCode",
            async () => {

                const editor =
                    vscode.window.activeTextEditor;

                if (!editor) {
                    return;
                }

                await vscode.env.clipboard.writeText(
                    editor.document.getText()
                );

                vscode.window.showInformationMessage(
                    "Code copied."
                );
            }
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.detailsEn",

            () =>
                transformDocument(
                    html =>
                        detailsSummary(
                            html,
                            "eng"
                        )
                )
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.detailsFr",

            () =>
                transformDocument(
                    html =>
                        detailsSummary(
                            html,
                            "fra"
                        )
                )
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.analyze",

            async () => {

                const editor =
                    vscode.window.activeTextEditor;

                if (!editor) {
                    return;
                }

                const html =
                    editor.document.getText();

                showIssues(html, "eng");
            }
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.mysscFootnotes",

            () =>
                transformDocument(
                    html => convertMySSCFootnotes(
                        convertWetFootnotes(
                            html,
                            "eng"
                        )
                    )
                )
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.footnotesEn",

            () =>
                transformDocument(
                    html =>
                        convertWetFootnotes(
                            html,
                            "eng"
                        )
                )
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.footnotesFr",

            () =>
                transformDocument(
                    html =>
                        convertWetFootnotes(
                            html,
                            "fra"
                        )
                )
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.analyzeFr",

            async () => {

                const editor =
                    vscode.window.activeTextEditor;

                if (!editor) {
                    return;
                }

                showIssues(
                    editor.document.getText(),
                    "fra"
                );
            }
        ),

    );
}