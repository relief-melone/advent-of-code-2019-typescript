import { disassembleOpValue, solveInput } from '../src/05.01/exec';
import { expect } from 'chai';

describe.only('Day 5 - First Puzzle', () => {
  it('will correctly disassemble the first value of the array', () => {
    expect(disassembleOpValue(1002)).to.deep.equal([2,0,1,0]);
  });

  it('will return the correct output', () => {
    expect(solveInput(['1002','4','3','4','33'])).to.equal();
  });
  
});