"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateFuelRequired_1 = require("../src/01.01/calculateFuelRequired");
const chai_1 = require("chai");
const test = (mass, fuel) => {
    it(`${mass} of mass will require ${fuel} fuel`, () => {
        chai_1.expect(calculateFuelRequired_1.calculateFuelRequired(mass)).to.equal(fuel);
    });
};
describe("Day 01 - First Puzzle", () => {
    test(12, 2);
    test(14, 2);
    test(1969, 654);
    test(100756, 33583);
});
//# sourceMappingURL=test-01.01.js.map