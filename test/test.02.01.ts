import { solveInput } from "../src/02.01/execOpCode";
import { expect } from "chai";

const test = (input, result) => {
  it(`will return the correct output for ${input}`, () => {
    expect(solveInput(input)).to.equal(result);
  });
};

describe("Day 02 - First Puzzle", () => {
  test([1, 0, 0, 0, 99], "2,0,0,0,99");
  test([2, 3, 0, 3, 99], "2,3,0,6,99");
  test([2, 4, 4, 5, 99, 0], "2,4,4,5,99,9801");
  test([1, 1, 1, 4, 99, 5, 6, 0, 99], "30,1,1,4,2,5,6,0,99");
});
