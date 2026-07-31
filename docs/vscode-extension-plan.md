# HTML Cleaner VS Code Extension - Design & Implementation Plan

## Overview

The objective is to provide the functionality of the existing HTML Cleaner web application directly inside Visual Studio Code through a native VS Code extension.

The extension will be distributed internally as a `.vsix` package and will not be published to the Visual Studio Marketplace.

The existing GitHub Pages web application will continue to exist and will consume the same cleaning engine as the VS Code extension.

***

# Architecture Decisions

## Goals

* Maintain a single source of truth for all HTML transformations.
* Avoid duplicating code between the website and VS Code.
* Allow future expansion without impacting users.
* Support offline usage.
* Distribute through VSIX files only.

***

## Target Architecture

```text
html-cleaner/
│
├── docs/
│   └── vscode-extension-plan.md
│
├── website/
│   ├── index.html
│   ├── styles.css
│   └── scripts.js
│
├── core/
│   ├── cleaner.ts
│   ├── footnotes.ts
│   ├── canada.ts
│   ├── details-summary.ts
│   ├── utm.ts
│   └── issues.ts
│
└── vscode-extension/
    ├── src/
    │   ├── extension.ts
    │   ├── commands.ts
    │   └── services/
    │
    ├── package.json
    ├── tsconfig.json
    └── README.md
```

***

## Single Source of Truth

All transformation logic must be moved from:

```text
website/scripts.js
```

into:

```text
core/
```

The Website and VS Code Extension will both consume the Core modules.

Example:

```typescript
import { cleanHtml } from "../core/cleaner";
```

This prevents maintenance duplication.

***

# Migration Plan

## Phase 1 - Core Refactoring

### Extract functions from scripts.js

Refactor all business logic into standalone functions.

Replace:

```javascript
function cleanHTML(language) {
    let html = $("#textareaID").val();
    ...
}
```

With:

```typescript
export function cleanHtml(
    html: string,
    language: "eng" | "fra"
): string {
    ...
    return html;
}
```

***

## Phase 2 - Build Core Library

Create modules:

```text
core/
├── cleaner.ts
├── footnotes.ts
├── myssc-footnotes.ts
├── details-summary.ts
├── canada.ts
├── utm.ts
└── issues.ts
```

***

## Phase 3 - Update Website

Modify:

```text
scripts.js
```

to call:

```typescript
cleanHtml(html, "eng");
```

instead of containing the full implementation.

***

## Phase 4 - Build VS Code Extension

Implement VS Code commands.

Commands will:

1. Read editor content.
2. Execute the selected operation.
3. Replace document content.
4. Display notifications if required.

***

## Phase 5 - Internal Distribution

Generate:

```text
html-cleaner-x.x.x.vsix
```

Store internally:

* GitHub Releases
* SharePoint
* Teams Files
* GCdocs

***

# Command List

The commands must closely match the website button labels.

## Clean

```text
HTML Cleaner: Clean HTML EN
HTML Cleaner: Clean HTML FR
```

***

## Footnotes

```text
HTML Cleaner: Footnotes EN
HTML Cleaner: Footnotes FR
HTML Cleaner: Footnotes MySSC+
```

***

## Details / Summary

```text
HTML Cleaner: H2 to Details/Summary EN
HTML Cleaner: H2 to Details/Summary FR
```

***

## Canada.ca

```text
HTML Cleaner: Canada.ca Links (only for Canada.ca pages)
HTML Cleaner: Canada.ca H1 to URL (only for Canada.ca pages)
```

***

## Other Actions

```text
HTML Cleaner: Remove UTM Codes
HTML Cleaner: Copy Code
```

***

## Diagnostics

Future integration of:

```javascript
findIssues()
```

as VS Code Problems.

Examples:

```text
EM tag detected
U tag detected
French links detected in EN content
English links detected in FR content
Table detected without THEAD
```

***

# VSIX Deployment Process

## Development Environment

Recommended stack:

```text
Node.js 20+
npm
TypeScript
esbuild
VSCE
```

***

## Build Extension

Compile:

```bash
npm install
npm run compile
```

***

## Package

Create VSIX:

```bash
vsce package
```

Output:

```text
html-cleaner-1.0.0.vsix
```

***

## Version Releases

Version convention:

```text
1.0.0
1.1.0
1.2.0
2.0.0
```

Recommended workflow:

```text
Develop
↓
Test
↓
Build VSIX
↓
Upload Release
↓
User Installation
```

***

# User Installation Guide

## Prerequisites

Only:

```text
Visual Studio Code
```

is required.

Users do NOT need:

```text
Node.js
npm
Git
```

***

## Installation Steps

### Step 1

Download:

```text
html-cleaner-x.x.x.vsix
```

from the internal repository.

***

### Step 2

Open VS Code.

***

### Step 3

Open Extensions.

Shortcut:

```text
Ctrl + Shift + X
```

***

### Step 4

Open the Extensions menu.

```text
⋮
Install from VSIX...
```

***

### Step 5

Select:

```text
html-cleaner-x.x.x.vsix
```

***

### Step 6

Restart VS Code.

***

# Usage Guide

Open any HTML file.

Press:

```text
Ctrl + Shift + P
```

Search:

```text
HTML Cleaner
```

Choose the desired command.

Examples:

```text
HTML Cleaner: Clean HTML EN

HTML Cleaner: Footnotes FR

HTML Cleaner: Remove UTM Codes
```

The file is updated immediately.

***

# Future Enhancements Roadmap

## Version 1.0

### Core Functionality

```text
✅ Clean HTML EN
✅ Clean HTML FR
✅ Footnotes EN
✅ Footnotes FR
✅ Footnotes MySSC+
✅ H2 to Details/Summary EN
✅ H2 to Details/Summary FR
✅ Remove UTM Codes
✅ Canada.ca Links
✅ Canada.ca H1 to URL
✅ Copy Code
```

***

## Version 1.1

### Editor Improvements

```text
✅ Clean Selection
✅ Clean Entire Document
✅ Success Notifications
✅ Clipboard Integration
```

***

## Version 1.2

### VS Code Integration

```text
✅ Context Menu Commands
✅ Keyboard Shortcuts
✅ Command Categories
```

***

## Version 2.0

### Diagnostics

Convert findIssues() into:

```text
Problems Panel
```

Examples:

```text
Warning:
EM tag found

Warning:
Table found without THEAD

Warning:
French links detected
```

***

## Version 2.1

### Settings

```json
{
  "htmlCleaner.defaultLanguage": "eng",
  "htmlCleaner.cleanOnSave": false,
  "htmlCleaner.enableDiagnostics": true
}
```

***

## Version 3.0

### Automation

```text
Auto Clean On Save
Auto Diagnostics
Workspace Settings
```

***

## Version 4.0

### Advanced Features

```text
HTML Preview Diff

Before / After Comparison

Transformation Report

Batch Folder Processing
```

***

# Success Criteria

The project will be considered successful when:

* All existing website actions are available inside VS Code.
* The website and extension share the same underlying code.
* Users install and update through a VSIX file.
* No Node.js or npm is required on end-user workstations.
* The extension can be maintained from the existing GitHub repository as a single source of truth.
