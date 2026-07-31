import * as vscode from "vscode";

import { cleanHtml } from "./core/cleaner";
import { removeUtmCodes } from "./core/utm";
import { convertCanadaLinks, buildCanadaUrlFromHtml } from "./core/canada";
import { detailsSummary } from "./core/details-summary";
import { findIssues } from "./core/diagnostics";
import { convertMySSCFootnotes } from "./core/myssc-footnotes";
import { convertWetFootnotes } from "./core/footnotes";

async function transformDocument(
    transform: (html: string) => string
) {

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

    await editor.edit(builder => {
        builder.replace(range, output);
    });
}

export function registerCommands(
    context: vscode.ExtensionContext
) {

    context.subscriptions.push(

        vscode.commands.registerCommand(
            "htmlCleaner.cleanEn",
            () =>
                transformDocument(
                    html => cleanHtml(
                        html,
                        "eng"
                    )
                )
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.cleanFr",
            () =>
                transformDocument(
                    html => cleanHtml(
                        html,
                        "fra"
                    )
                )
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

                const issues =
                    findIssues(
                        html,
                        "eng"
                    );

                if (
                    issues.length === 0
                ) {

                    vscode.window
                        .showInformationMessage(
                            "No issues found."
                        );

                    return;
                }

                vscode.window
                    .showWarningMessage(
                        issues
                            .map(i => i.message)
                            .join("\n")
                    );
            }
        ),

        vscode.commands.registerCommand(
            "htmlCleaner.mysscFootnotes",

            () =>
                transformDocument(
                    convertMySSCFootnotes
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

    );
}