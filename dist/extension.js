"use strict";
// src/extension.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const commands_1 = require("./commands");
function activate(context) {
    (0, commands_1.registerCommands)(context);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map