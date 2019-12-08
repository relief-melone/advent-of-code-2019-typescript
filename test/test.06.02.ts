import { expect } from 'chai';
import { getPathToRoot, solveInput } from '../src/06.02/exec';
import findFirstEqualElementIn2Arrays from '../src/shared/findFirstEqualElementIn2Arrays';

describe('Day 6 - Second Puzzle', () => {
  it('return correct path to root orbit', () => {
    expect(getPathToRoot('E', {
      'COM' : null,
      'B' : 'COM',
      'C' : 'B',
      'D' : 'C',
      'E' : 'D'
    })).to.deep.equal([
      'D', 'C', 'B', 'COM'
    ]);
  });
  
  it('will correctly output the indices for 2 found elements', () => {
    expect(findFirstEqualElementIn2Arrays(
      ['YOU', 'K', 'J', 'E','D','C','B','COM'],
      ['SAN', 'I', 'D', 'C', 'B', 'COM']
    )).to.deep.equal([4,2,'D']);
  });

  it('will correctly solve the test input', () => {
    expect(solveInput(
      ['COM)B',
        'B)C',
        'C)D',
        'D)E',
        'E)F',
        'B)G',
        'G)H',
        'D)I',
        'E)J',
        'J)K',
        'K)L',
        'K)YOU',
        'I)SAN'
      ],
    )).to.equal(4);
  });
});