import { solveInput } from '../src/04.02/exec';
import { expect } from 'chai';

describe('Day 4 - Second Puzzle', () => {
  it('will correctly recognice 112233', () => {
    expect(solveInput([112233])).to.equal(1);
  });
  it('will correctly recognice 123444', () => {
    expect(solveInput([123444])).to.equal(0);
  });
  it('will correctly recognice 111122', () => {
    expect(solveInput([111122])).to.equal(1);
  });
});