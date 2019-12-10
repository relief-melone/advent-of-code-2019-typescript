import { expect } from 'chai';
import { getPitchBetweenTwoPoints, getYSection, getLinearEquationFromTwoPoints, pointIsDirectlyBetween2Points, getAsteroidLocations } from '../src/10.01/exec.tryWithEquation';

const testGetPitch = (Point1: [number,number], Point2: [number,number], expected: number): void => {
  it('will correctly calculate the pitch of a line', () => {
    expect(getPitchBetweenTwoPoints(Point1,Point2)).to.equal(expected);
  });
};

const testYSection = (Point: [number, number], Pitch: number, expected: number): void => {
  it('will correctly calculate the y section', () => {
    expect(getYSection(Point,Pitch)).to.equal(expected);
  });
};

const testLinearEquation = (Point1: [number,number], Point2: [number,number],expected: [number,number]): void => {
  it('will correctly determine the linear equation from 2 points', () => {
    expect(getLinearEquationFromTwoPoints(Point1,Point2)).to.deep.equal(expected);
  });
};

const testPointIsInBetween = (P1: [number,number], P2: [number,number],P3: [number,number], expected: boolean): void => {
  it('will correctly tell if point is in between', () => {
    expect(pointIsDirectlyBetween2Points(P1,P2,P3)).to.equal(expected);
  });
};

const testAsteroidLocations = (input: string[][], expected: [number,number][]): void => {
  it('will correctly get Locations of Asteroids by Input', () => {
    expect(getAsteroidLocations(input)).to.deep.include.members(expected);
  });
  
};

describe('Day 10 - Puzzle 1', () => {
  testGetPitch([3,1],[1,3],-1);
  testGetPitch([0,100],[-1,0],100);
  
  testYSection([3,1],-1,4);
  testYSection([1,3],-1,4);
  
  testLinearEquation([3,1],[1,3],[-1,4]);
  testLinearEquation([1,1],[2,1],[0,1]);

  testPointIsInBetween([1,0],[3,4],[2,2],true);
  testPointIsInBetween([1,0],[3,4],[2,0],false);
  testPointIsInBetween([2,2],[50,50],[1,1],false);
  testPointIsInBetween([4,2],[5,2],[6,2],false);
  testPointIsInBetween([0,1],[0,3],[0,2],true);
  testPointIsInBetween([0,2],[0,4],[0,3], true);
  testPointIsInBetween([0,2],[2,2],[1,2],true);

  testAsteroidLocations([
    ['.','#','.','.','#'],
    ['.','#','.','.','.']
  ],[
    [1,0],
    [4,0],
    [1,1]
  ]);
});