import { expect } from 'chai';
import { calculateNrOfLayers, splitInputIntoLayers, countDigitsInLayer } from '../src/08.01/exec';

describe('Day 8 - Second Puzzle', () => {
  it('return number of layers', () => {
    expect(calculateNrOfLayers([1,2,3,4,5,6,7,8,9,0,1,2],3,2)).to.equal(2);
  });
  it('correctly splits input into layers', () => {
    expect(splitInputIntoLayers([1,2,3,4,5,6,7,8,9,0,1,2],3,2)).to.deep.equal([
      [1,2,3,4,5,6],
      [7,8,9,0,1,2]
    ]);
  });
  it('correctly counts digits', () => {
    expect(countDigitsInLayer([1,2,0,0,1,2,3,6])).to.deep.equal({
      0: 2,
      1: 2,
      2: 2,
      3: 1,
      6: 1
    });
  });
});