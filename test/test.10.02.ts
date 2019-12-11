import { expect } from 'chai';
import { getConnectingVector, vectorsAreLinearDependentAndInSameDirection, getLongerLinearDependentVector, getAsteroidLocations } from '../src/10.01/exec';
import { calculateDegreeAgainstVertical } from '../src/10.02/exec';

const testCalculateDegree = (Vector,expectedDegree): void => {
  it(`will calculate the correct Angle of [${Vector[0]},${Vector[1]}]`, () => {
    expect(calculateDegreeAgainstVertical(Vector)).to.equal(expectedDegree);
  });
};


describe.only('Day 10 - Second Puzzle', () => {
  // Top Right Sector
  testCalculateDegree([0,-1],0);
  testCalculateDegree([1,-1],45);
  // Bottom Right Sector
  testCalculateDegree([1,0],90);
  testCalculateDegree([1,1],135);
  testCalculateDegree([0,1],180);
  // Bottom Left Sector
  testCalculateDegree([-1,1],315);
  testCalculateDegree([-1,0],270);
  

});