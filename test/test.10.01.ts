import { expect } from 'chai';
import { getConnectingVector, vectorsAreLinearDependentAndInSameDirection, getLongerLinearDependentVector, getAsteroidLocations } from '../src/10.01/exec';

const testGetConnectingVector = (Point1,Point2,expectedVector): void => {
  it(`will calculate the correct connecting Vector between [${Point1[0]},${Point1[1]}] and [${Point2[0]},${Point2[1]}]`, () => {
    expect(getConnectingVector(Point1, Point2)).to.deep.equal(expectedVector);
  });
};

const testVectorsAreLinearDependent = (Vector1, Vector2, expected): void => {
  it(`will correctly tell if [${Vector1[0]},${Vector1[1]}] and [${Vector2[0]},${Vector2[1]}] are linear dependent: ${expected}`, () => {
    expect(vectorsAreLinearDependentAndInSameDirection(Vector1, Vector2)).to.deep.equal(expected);
  });
};

const testGetLongerLinearDependentVector = (Vector1, Vector2, expected): void => {
  it(`will correctly tell if [${Vector1[0]},${Vector1[1]}] or [${Vector2[0]},${Vector2[1]}] is longer`, () => {
    expect(getLongerLinearDependentVector(Vector1, Vector2)).to.deep.equal(expected);
  });
};

const testAsteroidLocations = (input: string[][], expected: [number,number][]): void => {
  it('will correctly get Locations of Asteroids by Input', () => {
    expect(getAsteroidLocations(input)).to.deep.include.members(expected);
  });
  
};

describe.only('Day 10 - First Puzzle', () => {
  // testGetConnectingVector([3,4],[4,4],[1,0]);
  // testGetConnectingVector([1,1],[-5,2],[-6,1]);

  // testVectorsAreLinearDependent([1,5],[2,6], false);
  // testVectorsAreLinearDependent([2,3],[4,6], true);
  // testVectorsAreLinearDependent([1,0],[5,0], true);
  // testVectorsAreLinearDependent([1,0],[5,0], true);
  // testVectorsAreLinearDependent([0,1],[0,5], true);
  // testVectorsAreLinearDependent([1,2],[-1,-2], false);

  // testVectorsAreLinearDependent([1,0],[0,-2], false);
  // testVectorsAreLinearDependent([1,0],[-3,-2], false);
  testVectorsAreLinearDependent([1,0],[-1,0], false);

  // testGetLongerLinearDependentVector([1,2],[2,4],[2,4]);
  // testGetLongerLinearDependentVector([3,8],[6,16],[6,16]);
  // testGetLongerLinearDependentVector([-3,-8],[-6,-16],[-6,-16]);
  // testGetLongerLinearDependentVector([-3,8],[-6,16],[-6,16]);

  // testAsteroidLocations([
  //   ['.','#','.','.','#'],
  //   ['.','#','.','.','.']
  // ],[
  //   [1,0],
  //   [4,0],
  //   [1,1]
  // ]);

});