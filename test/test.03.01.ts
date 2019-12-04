import {
  solveInput,
  getClosestDistance,
  getPositionsListFromInstruction,
  ListObject,
  Crossing,
  findCrossingsBetweenTwoWires
} from '../src/03.01/exec';
import { expect } from 'chai';

const testSolveInput = (input: [string[], string[]], output: number): void => {
  it(`will correctly calculate a distance of ${output} for ${JSON.stringify(
    input
  ).slice(0, 10)}...`, () => {
    expect(solveInput(input)).to.equal(output);
  });
};

const testGetPositionsListFromInstructions = (
  instruction: string,
  currentPositionList: any,
  expectedResult: any
): void => {
  it(`will return the correct list for instruction ${instruction}`, () => {
    const list = getPositionsListFromInstruction(instruction, currentPositionList);
    expect(list).to.deep.equal(expectedResult);
  });
};

const testFindCrossingsBetweenTwoWires = (
  positionList1: ListObject[],
  positionList2: ListObject[],
  expectedCrossings: Crossing[]
): void => {
  it(`will determine the correct crossings for 2 position lists as ${JSON.stringify(expectedCrossings)}`, () => {
    const crossings = findCrossingsBetweenTwoWires([positionList1, positionList2]);
    expect(crossings).to.deep.equal(expectedCrossings);
  });
};


const testGetClosestDistance = (
  crossings: Crossing[],
  expectedDistance: number
): void => {
  it(`will calculate the correct distance of ${expectedDistance}`, () => {
    expect(getClosestDistance(crossings)).to.equal(expectedDistance);
  });
};

describe('Day 03 - First Puzzle', () => {

  
  testGetPositionsListFromInstructions('R4',[],[
    { position: '1,0' },
    { position: '2,0' },
    { position: '3,0' },
    { position: '4,0' }, 
  ]);

  testGetPositionsListFromInstructions('U4',[
    { position: '1,0' },
    { position: '2,0' },
    { position: '3,0' },
    { position: '4,0' }, 
  ],[
    { position: '1,0' },
    { position: '2,0' },
    { position: '3,0' },
    { position: '4,0' }, 
    { position: '4,1' },
    { position: '4,2' },
    { position: '4,3' },
    { position: '4,4' },
  ]);

  testGetPositionsListFromInstructions('L6',[
    { position: '1,0' },
    { position: '2,0' },
    { position: '3,0' },
    { position: '4,0' }, 
    { position: '4,1' },
    { position: '4,2' },
    { position: '4,3' },
    { position: '4,4' },
  ],[
    { position: '1,0' },
    { position: '2,0' },
    { position: '3,0' },
    { position: '4,0' }, 
    { position: '4,1' },
    { position: '4,2' },
    { position: '4,3' },
    { position: '4,4' },
    { position: '3,4' },
    { position: '2,4' },
    { position: '1,4' },
    { position: '0,4' },
    { position: '-1,4' },
    { position: '-2,4' },
  ]);

  testFindCrossingsBetweenTwoWires([
    { position: '1,0' },
    { position: '2,0' },
    { position: '3,0' },
    { position: '4,0' }, 
    { position: '4,1' },
    { position: '4,2' },
    { position: '4,3' },
    { position: '4,4' },
  ],[
    { position: '0,1' },
    { position: '0,2' },
    { position: '1,2' },
    { position: '2,2' }, 
    { position: '3,2' },
    { position: '4,2' },
    { position: '5,2' },
    { position: '6,2' }
  ],[
    { position: '4,2' }
  ]);

  testFindCrossingsBetweenTwoWires([
    { position: '1,0' },
    { position: '2,0' },
    { position: '3,0' },
    { position: '4,0' }, 
    { position: '4,1' },
    { position: '4,2' },
    { position: '4,3' },
    { position: '4,4' },
  ],[
    { position: '0,1' },
    { position: '0,2' },
    { position: '1,2' },
    { position: '2,2' }, 
    { position: '3,2' },
    { position: '4,2' },
    { position: '5,2' },
    { position: '6,3' },
    { position: '5,3' },
    { position: '4,3' },
    { position: '3,3' },
  ],[
    { position: '4,2' },
    { position: '4,3' }
  ]);

 
  testGetClosestDistance([
    { position: '4,2' },
    { position: '4,3' }
  ], 6);
   
  testSolveInput(
    [
      ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'],
      ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83']
    ],
    159
  );

  testSolveInput(
    [
      [
        'R98',
        'U47',
        'R26',
        'D63',
        'R33',
        'U87',
        'L62',
        'D20',
        'R33',
        'U53',
        'R51'
      ],
      ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7']
    ],
    135
  );
});
