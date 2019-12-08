import { expect } from 'chai';
import { getObjectListFromInput, setPartentsInList, countParents } from '../src/06.01/exec';

describe.only('Day 6 - First Puzzle', () => {
  it('return correct object list from input', () => {
    expect(getObjectListFromInput([
      'COM)B',
      'B)C',
      'C)D',
      'D)E'
    ])).to.deep.equal({
      'COM': null,
      'B': null,
      'C': null,
      'D': null,
      'E': null,
    });
  });

  it('will assign the correct parents to a list', () => {
    expect(setPartentsInList([
      'COM)B',
      'B)C',
      'C)D',
      'D)E'
    ], {
      'COM': null,
      'B': null,
      'C': null,
      'D': null,
      'E': null,
    })).to.deep.equal({
      'COM' : null,
      'B' : 'COM',
      'C' : 'B',
      'D' : 'C',
      'E' : 'D'
    });
  });

  it('will correctly count the parents of one item', () => {
    expect(countParents('E', {
      'COM' : null,
      'B' : 'COM',
      'C' : 'B',
      'D' : 'C',
      'E' : 'D'
    })).to.equal(4);
  });
});