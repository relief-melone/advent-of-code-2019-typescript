"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getLines_1 = __importDefault(require("./getLines"));
exports.default = (filename) => {
    const lines = getLines_1.default(filename);
    return lines
        .map(a => parseInt(a))
        .filter(a => typeof a === "number" && a === a);
};
//# sourceMappingURL=getLinesAsNumber.js.map