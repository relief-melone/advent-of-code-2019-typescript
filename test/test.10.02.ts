import { expect } from 'chai';
import { calculateDegreeAgainstVertical, solveInput } from '../src/10.02/exec';
import Input from '../src/shared/input';

const testCalculateDegree = (Vector,expectedDegree): void => {
  it(`will calculate the correct Angle of [${Vector[0]},${Vector[1]}]`, () => {
    expect(calculateDegreeAgainstVertical(Vector)).to.equal(expectedDegree);
  });
};

const testSolveInput = (asteroidsToShoot, expected): void => {
  it(`will calculate the correct solution ${expected} for the input`, () => {
    const input = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;
    expect(solveInput(new Input(input, true),asteroidsToShoot)).to.equal(expected);
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
  testCalculateDegree([-1,1],225);
  testCalculateDegree([-1,0],270);
  testCalculateDegree([-1,-1],315);

  testSolveInput(1,1112);
  testSolveInput(2,1201);
  testSolveInput(3,1202);
  testSolveInput(10,1208);
  testSolveInput(20,1600);
  testSolveInput(50,1609);
  testSolveInput(100,1016);
  testSolveInput(199,906);
  testSolveInput(200,802);
  testSolveInput(201,1009);
  testSolveInput(299,1101);

  

});