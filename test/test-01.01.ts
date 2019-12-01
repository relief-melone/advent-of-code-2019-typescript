import { calculateFuelRequired } from "../src/01.01/calculateFuelRequired";
import { expect } from "chai";

const test = (mass, fuel) => {
  it(`${mass} of mass will require ${fuel} fuel`, () => {
    expect(calculateFuelRequired(mass)).to.equal(fuel);
  });
};

describe("Day 01 - First Puzzle", () => {
  test(12, 2);
  test(14, 2);
  test(1969, 654);
  test(100756, 33583);
});
