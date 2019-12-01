"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getLinesAsNumber_1 = __importDefault(require("../shared/getLinesAsNumber"));
exports.calculateFuelRequired = (mass) => {
    return Math.floor(mass / 3) - 2;
};
exports.default = (filename) => {
    const input = getLinesAsNumber_1.default(filename);
    const fuelRequired = input
        .map(m => exports.calculateFuelRequired(m))
        .reduce((total, current) => total + current);
    console.log(`Total Fuel Required for all Modules: ${fuelRequired}`);
};
//# sourceMappingURL=calculateFuelRequired.js.map