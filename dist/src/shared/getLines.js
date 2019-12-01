"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const getLines = (filename) => {
    const raw = fs.readFileSync(`${__dirname}/../../../data/${filename}`, "utf-8");
    const lines = raw.split("\r\n");
    return lines;
};
exports.default = getLines;
//# sourceMappingURL=getLines.js.map