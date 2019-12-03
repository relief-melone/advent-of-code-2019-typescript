import {
  solveInput,
  placeWire,
  findCrossings,
  getClosestDistance
} from "../src/03.01/exec";
import { expect } from "chai";

const testSolveInput = (input: Array<Array<string>>, output: number) => {
  it(`Will correctly calculate a distance of ${output} for ${JSON.stringify(
    input
  ).slice(0, 10)}...`, () => {
    expect(solveInput(input)).to.equal(output);
  });
};

const testPlaceWire = (
  from,
  instruction,
  grid,
  wireNumber,
  expectedEndPosition,
  expectedGrid
) => {
  it.only(`Will correctly place wire for instruction ${instruction}`, () => {
    const endPosition = placeWire(from, instruction, grid, wireNumber);
    expect(endPosition).to.deep.equal(expectedEndPosition);
    expect(grid).to.deep.equal(expectedGrid);
  });
};

const testFindCrossing = (
  inputGrid: Array<Array<number>>,
  expectedCrossings: Array<[number, number]>
) => {
  it(`will determine the correct ${expectedCrossings.length} crossings`, () => {
    expect(findCrossings(inputGrid)).to.have.deep.members(expectedCrossings);
  });
};

const testGetClosestDistance = (
  crossings: Array<[number, number]>,
  expectedDistance: number
) => {
  it(`will calculate the correct distance of ${expectedDistance}`, () => {
    expect(getClosestDistance(crossings)).to.equal(expectedDistance);
  });
};

describe("Day 03 - First Puzzle", () => {
  testPlaceWire([0, 0], "R4", {}, 1, [4, 0], {
    "1,0": [1],
    "2,0": [1],
    "3,0": [1],
    "4,0": [1]
  });

  testPlaceWire(
    [4, 0],
    "U4",
    {
      "1,0": [1],
      "2,0": [1],
      "3,0": [1],
      "4,0": [1]
    },
    1,
    [4, 4],
    {
      "1,0": [1],
      "2,0": [1],
      "3,0": [1],
      "4,0": [1],
      "4,1": [1],
      "4,2": [1],
      "4,3": [1],
      "4,4": [1]
    }
  );
  // testPlaceWire(
  //   [2, 3],
  //   "D3",
  //   [
  //     [0, 0, 0, 0, 0],
  //     [1, 0, 0, 0, 0],
  //     [1, 0, 0, 1, 0],
  //     [1, 0, 0, 1, 0],
  //     [1, 1, 1, 1, 0]
  //   ],
  //   [2, 0],
  //   [
  //     [0, 0, 0, 0, 0],
  //     [1, 0, 0, 0, 0],
  //     [2, 1, 1, 1, 0],
  //     [1, 0, 0, 1, 0],
  //     [1, 1, 1, 1, 0]
  //   ]
  // );

  testFindCrossing(
    [
      [0, 1, 1, 1, 1],
      [0, 0, 0, 1, 1],
      [0, 2, 1, 1, 1],
      [0, 1, 0, 0, 1],
      [0, 1, 1, 1, 1]
    ],
    [[2, 1]]
  );
  testFindCrossing(
    [
      [0, 2, 1, 1, 1],
      [0, 1, 0, 1, 1],
      [0, 2, 1, 1, 1],
      [0, 1, 0, 0, 1],
      [0, 1, 1, 1, 1]
    ],
    [
      [2, 1],
      [0, 1]
    ]
  );

  testGetClosestDistance(
    [
      [10, 2],
      [16, 2],
      [5, 5]
    ],
    10
  );

  testSolveInput(
    [
      ["R10", "U10", "L10", "D2"],
      ["U2", "R10"]
    ],
    12
  );

  testSolveInput(
    [
      ["R10", "U10", "L10", "D2"],
      ["U2", "R12", "U2", "L10", "D3"]
    ],
    4
  );

  testSolveInput(
    [
      ["R10", "U10", "L10", "D2", "L2", "D10"],
      ["U2", "R12", "U2", "L13", "D5", "L3"]
    ],
    3
  );

  testSolveInput(
    [
      ["R75", "D30", "R83", "U83", "L12", "D49", "R71", "U7", "L72"],
      ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"]
    ],
    159
  );

  testSolveInput(
    [
      [
        "R98",
        "U47",
        "R26",
        "D63",
        "R33",
        "U87",
        "L62",
        "D20",
        "R33",
        "U53",
        "R51"
      ],
      ["U98", "R91", "D20", "R16", "D67", "R40", "U7", "R15", "U6", "R7"]
    ],
    135
  );
});
