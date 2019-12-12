import { expect } from 'chai';
import { lineToThreeDCoords, solveForText } from '../src/12.02/exec';



const testWithInput = (input: string, expectedRuns: number): void => {
  it(`will return the correct total energy of ${expectedRuns}`, () => {
    expect(solveForText(input, true)).to.equal(expectedRuns);
  });
};

describe.only('Day 12 - Second Puzzle', () => {

  testWithInput(
    `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`,2772
  );

});