# HTML Cleaner for VS Code

Clean and review Canada.ca and MySSC+ HTML directly in Visual Studio Code. The
extension provides the approved transformations from the HTML Cleaner web app,
including HTML cleanup, footnotes, Canada.ca links, details/summary blocks, and
English or French diagnostics.

## Before you begin

You need:

- [Visual Studio Code](https://code.visualstudio.com/) version 1.125 or later.
- An extension package file ending in `.vsix`. Ask the person who provided this
  project for the package if you do not have one.

> This extension is installed from a `.vsix` file. It will not appear in the
> VS Code Extensions Marketplace unless it is separately published there.

## Install the extension from a VSIX file

1. Save the `.vsix` file somewhere you can find easily, such as your Downloads
   folder. Do not unzip it.
2. Open Visual Studio Code.
3. Select the **Extensions** icon in the left-side Activity Bar. Its icon is
   four small squares.
4. Select the **...** menu at the top of the Extensions view.
5. Select **Install from VSIX...**.
6. Select the `.vsix` file you saved in step 1, then select **Install**.
7. When VS Code asks you to reload, select **Reload**.

The HTML Cleaner commands are ready after VS Code reloads.

## Use HTML Cleaner

1. Open an HTML file in VS Code, or create a new file and paste in your HTML.
2. Save a copy before running a transformation if you may need the original.
3. Press `Ctrl+Shift+P` on Windows or Linux, or `Cmd+Shift+P` on macOS, to open
   the Command Palette.
4. Type `HTML Cleaner` and choose the command you need.

| Command | What it does |
| --- | --- |
| **Clean HTML EN** | Cleans HTML using English conventions and reports English-link issues. |
| **Clean HTML FR** | Cleans HTML using French spacing conventions and reports English-link issues. |
| **Remove UTM Codes** | Removes `?utm...` tracking parameters from links. |
| **Canada.ca Links** | Converts full Canada.ca English and French links to `/content/canadasite/...` paths. |
| **Canada.ca H1 to URL** | Creates a Canada.ca-style URL slug from the first H1, title, or text line and copies it to the clipboard. |
| **H2 to Details/Summary EN/FR** | Converts H2 sections into WET-compatible expandable details sections. |
| **Analyze HTML EN/FR** | Reports common markup and language-link issues without changing the file. |
| **Footnotes EN/FR** | Converts Word-style footnotes into WET footnotes. |
| **Footnotes MySSC+** | Converts Word-style footnotes to the MySSC+ footnote format. |
| **Copy Code** | Copies the full active document to the clipboard. |

Commands replace the contents of the active editor. Use **Edit: Undo** with
`Ctrl+Z` or `Cmd+Z` immediately if a result is not what you expected.

## Create a VSIX package from this project

Use these steps if you received the source code rather than a `.vsix` file.
They require a current [Node.js LTS](https://nodejs.org/) installation.

1. Open a terminal in the project folder.
2. Install the project dependencies:

   ```sh
   npm install
   ```

3. Compile the extension:

   ```sh
   npm run compile
   ```

4. Create the installable package:

   ```sh
   npm run package
   ```

5. Find the newly created `.vsix` file in the project folder.
6. Follow [Install the extension from a VSIX file](#install-the-extension-from-a-vsix-file).

## Test changes during development

To test an edited copy without creating a VSIX package:

1. Open this project folder in VS Code.
2. Press `F5`.
3. A new **Extension Development Host** window opens.
4. In that new window, open an HTML file and use the HTML Cleaner commands.

Stop the development session by closing the Extension Development Host window.

## Uninstall

1. Open the **Extensions** view in VS Code.
2. Search for **HTML Cleaner**.
3. Select the gear icon beside the extension and select **Uninstall**.
4. Reload VS Code when prompted.

## Troubleshooting

- **“Install from VSIX...” is missing:** open the Extensions view first, then
  select its **...** menu rather than the main VS Code menu.
- **No HTML Cleaner commands appear:** reload VS Code, then confirm the
  extension is enabled in the Extensions view.
- **A command changes the wrong content:** HTML Cleaner always works on the
  currently active editor tab. Click the intended HTML document first.
