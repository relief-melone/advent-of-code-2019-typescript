"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calculateFuelRequired_1 = require("../src/01.02/calculateFuelRequired");
const chai_1 = require("chai");
const test = (mass, fuel) => {
    it(`${mass} of mass will require ${fuel} fuel`, () => {
        chai_1.expect(calculateFuelRequired_1.calculateFuelRequired(mass)).to.equal(fuel);
    });
};
describe("Day 01 - Second Puzzle", () => {
    test(1, 0);
    test(14, 2);
    test(1969, 966);
    test(100756, 50346);
});
//# sourceMappingURL=test-01.02.js.map