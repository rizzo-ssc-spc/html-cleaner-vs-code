"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCommands = registerCommands;
const vscode = __importStar(require("vscode"));
const cleaner_1 = require("./core/cleaner");
const utm_1 = require("./core/utm");
const canada_1 = require("./core/canada");
const details_summary_1 = require("./core/details-summary");
const diagnostics_1 = require("./core/diagnostics");
const myssc_footnotes_1 = require("./core/myssc-footnotes");
const footnotes_1 = require("./core/footnotes");
async function transformDocument(transform) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    const text = editor.document.getText();
    const output = transform(text);
    const range = new vscode.Range(editor.document.positionAt(0), editor.document.positionAt(text.length));
    const applied = await editor.edit(builder => {
        builder.replace(range, output);
    });
    return applied
        ? output
        : undefined;
}
function showIssues(html, language) {
    const issues = (0, diagnostics_1.findIssues)(html, language);
    if (issues.length === 0) {
        vscode.window.showInformationMessage("No issues found.");
        return;
    }
    vscode.window.showWarningMessage(issues.map(issue => issue.message).join("\n"));
}
function registerCommands(context) {
    context.subscriptions.push(vscode.commands.registerCommand("htmlCleaner.cleanEn", async () => {
        const html = await transformDocument(input => (0, cleaner_1.cleanHtml)(input, "eng"));
        if (html) {
            showIssues(html, "eng");
        }
    }), vscode.commands.registerCommand("htmlCleaner.cleanFr", async () => {
        const html = await transformDocument(input => (0, cleaner_1.cleanHtml)(input, "fra"));
        if (html) {
            showIssues(html, "fra");
        }
    }), vscode.commands.registerCommand("htmlCleaner.removeUtm", () => transformDocument(utm_1.removeUtmCodes)), vscode.commands.registerCommand("htmlCleaner.convertCanadaLinks", () => transformDocument(canada_1.convertCanadaLinks)), vscode.commands.registerCommand("htmlCleaner.canadaUrl", async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const html = editor.document.getText();
        const url = (0, canada_1.buildCanadaUrlFromHtml)(html);
        if (!url) {
            vscode.window.showWarningMessage("Could not generate Canada.ca URL.");
            return;
        }
        await vscode.env.clipboard.writeText(url);
        vscode.window.showInformationMessage(`URL copied: ${url}`);
    }), vscode.commands.registerCommand("htmlCleaner.copyCode", async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        await vscode.env.clipboard.writeText(editor.document.getText());
        vscode.window.showInformationMessage("Code copied.");
    }), vscode.commands.registerCommand("htmlCleaner.detailsEn", () => transformDocument(html => (0, details_summary_1.detailsSummary)(html, "eng"))), vscode.commands.registerCommand("htmlCleaner.detailsFr", () => transformDocument(html => (0, details_summary_1.detailsSummary)(html, "fra"))), vscode.commands.registerCommand("htmlCleaner.analyze", async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const html = editor.document.getText();
        showIssues(html, "eng");
    }), vscode.commands.registerCommand("htmlCleaner.mysscFootnotes", () => transformDocument(html => (0, myssc_footnotes_1.convertMySSCFootnotes)((0, footnotes_1.convertWetFootnotes)(html, "eng")))), vscode.commands.registerCommand("htmlCleaner.footnotesEn", () => transformDocument(html => (0, footnotes_1.convertWetFootnotes)(html, "eng"))), vscode.commands.registerCommand("htmlCleaner.footnotesFr", () => transformDocument(html => (0, footnotes_1.convertWetFootnotes)(html, "fra"))), vscode.commands.registerCommand("htmlCleaner.analyzeFr", async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        showIssues(editor.document.getText(), "fra");
    }));
}
//# sourceMappingURL=commands.js.map