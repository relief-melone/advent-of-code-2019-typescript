import { solveInput } from '../src/05.01/exec';
import { expect } from 'chai';

describe.only('Day 5 - First Puzzle', () => {
  it('will correctly disassemble the first value of the array', () => {
    const intComputer = solveInput([1002,4,3,4,33], 1);
    expect(intComputer.program).to.deep.equal([1002,4,3,4,99])
  });

  // it('will return the correct output', () => {
  //   expect(solveInput(['1002','4','3','4','33'])).to.equal();
  // });
  
});