import { solveInput, isAscendingNumberList, hasTwoAdjacentDigits } from '../src/04.01/exec';
import { expect } from 'chai';

describe('Day 4 - First Puzzle', () => {
  it('will correctly recognice 111111', () => {
    expect(solveInput([111111])).to.equal(1);
  });
  it('will correctly tell false if not asencing Number List', () => {
    expect(isAscendingNumberList([1,2,3,2,1])).to.be.false;
  });
  it('will correctly return true if the list is ascending', () => {
    expect(isAscendingNumberList([2,3,4,4,5])).to.be.true;
  });
  it('will correctly tell it encountered at least 2 adjacent digits', () => {
    expect(hasTwoAdjacentDigits([1,2,3,4,4,5])).to.be.true;
  });
  it('will correctly return false as no two adjacent digits were encountered', () => {
    expect(hasTwoAdjacentDigits([1,2,3,4,5,6])).to.be.false;
  });
  it('will correclty filter out 223450', () => {
    expect(solveInput([111111,223450,222222])).to.equal(2);
  });
  it('will correctly filter out 123789', () => {
    expect(solveInput([123789])).to.equal(0);
  });
});