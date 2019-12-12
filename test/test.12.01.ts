import { expect } from 'chai';
import { lineToThreeDCoords, solveForText } from '../src/12.01/exec';


const testLineToThreeDCoord = (line, expectedCoordinate): void => {
  it(`will correctly parse ${line}`, () => {
    expect(lineToThreeDCoords(line)).to.deep.equal(expectedCoordinate);
  });
};

const testWithInput = (input: string, nrOfRuns: number, expectedEnergy: number): void => {
  it(`will return the correct total energy of ${expectedEnergy}`, () => {
    expect(solveForText(input, true, nrOfRuns)).to.equal(expectedEnergy);
  });
};

describe.only('Day 12 - First Puzzle', () => {
  testLineToThreeDCoord('<x=-10, y=0, z=20>', {
    x: -10,
    y: 0,
    z: 20
  });

  testWithInput(
    `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`,10,179
  );

  testWithInput(
    `<x=-8, y=-10, z=0>
  <x=5, y=5, z=10>
  <x=2, y=-7, z=3>
  <x=9, y=-8, z=-3>`,100,1940
  );


});