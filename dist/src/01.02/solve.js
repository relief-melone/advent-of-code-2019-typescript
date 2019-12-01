"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const getLinesAsNumber_1 = __importDefault(require("../shared/getLinesAsNumber"));
const input = getLinesAsNumber_1.default("01.01.txt");
const fuelRequired = input
    .map(m => index_1.calculateFuelRequired(m))
    .reduce((total, current) => total + current);
console.log(`Total Fuel Required for all Modules: ${fuelRequired}`);
//# sourceMappingURL=solve.js.map