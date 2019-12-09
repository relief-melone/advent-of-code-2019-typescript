import { expect } from 'chai';
import { mergeLayers, layerToGrid } from '../src/08.02/exec';

describe('Day 8 - Second Puzzle', () => {
  it('correctly merges layers', () => {
    expect(mergeLayers([
      [0,2,2,2],
      [1,1,2,2],
      [2,2,1,2],
      [0,0,0,0]
    ])).to.deep.equal(
      [0,1,1,0]
    );
  });

  it('correctly converts a layer into a grid', () => {
    expect(layerToGrid([1,2,3,4,5,6],3,2)).to.deep.equal([
      [1,2,3],
      [4,5,6]
    ]);
  });
  
});