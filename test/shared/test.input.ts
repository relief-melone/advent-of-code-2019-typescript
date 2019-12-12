import { removeDuplicates, intersect, getPairs } from '../../src/shared/new/input';
import { expect } from 'chai';

describe('Shared', () => {
  describe('RemoveDuplicates', () => {
    it('will correctly remove duplicates from string array', () => {
      expect(removeDuplicates(['Hello','World','I','Say','Hello'])).to.deep.equal(['Hello','World','I','Say',]);      
    });

    it('will correctly remove duplicate numbers', () => {
      expect(removeDuplicates([1,2,3,5,2,2,3,1,15])).to.deep.equal([1,2,3,5,15]);
    });

    it('will correctly remove duplicate objects', () => {
      expect(removeDuplicates([
        { a : '15',
          b: 3 },
        { b: 5,
          c: '3' },
        { a: 23,
          b: 12 },
        { a : '15',
          b: 3 },
      ])).to.deep.equal([
        { a : '15',
          b: 3 },
        { b: 5,
          c: '3' },
        { a: 23,
          b: 12 }
      ]);
    });
  });

  describe('Intersect', () => {
    it('will correctly intersect number lists', () => {
      expect(intersect([1,2,3,4,5],[12,2,5,3,4,7,5])).to.deep.equal([2,3,4,5]);
    });
    it('will correctly intersect string lists', () => {
      expect(intersect(
        ['Hello', 'World', 'Waddup', 'Yaw'],
        ['Hello', 'World', 'Foo', 'Yaw']
      )).to.deep.equal( ['Hello', 'World', 'Yaw']);
    });
    it('will correctly intersect object lists', () => {
      expect(intersect(
        [{ 
          a: 1,
          b: '12' 
        },{ 
          b: 3,
          c: '15' 
        },{ 
          a: 2,
          b: 3 
        }],
        [{ 
          a: 1,
          b: '12' 
        },{ 
          b: 3,
          c: '16' 
        },{ 
          a: 2,
          b: 3 
        }],
      )).to.deep.equal([
        { a: 1,
          b: '12' 
        },{ 
          a: 2,
          b: 3 
        }]
      );
    });
  });

  describe('getPairs', () => {
    it('will return the correct pairs from an input', () => {
      expect(getPairs([0,1,2,3])).to.deep.equal([
        [0,1],[0,2],[0,3],[1,2],[1,3],[2,3]
      ]);
    });
  });
});