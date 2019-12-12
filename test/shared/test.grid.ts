import { Coordinate, Coordinates } from '../../src/shared/new/grid';
import { expect } from 'chai';

describe('Coordinate', () => {
  it('will correctly initialize', () => {
    const coord = new Coordinate(1,4,{ a:12 });
    expect(coord.coordAndVal).to.deep.equal([
      1,4,{ a:12 }
    ]);
    expect(coord.x).to.equal(1);
    expect(coord.y).to.equal(4);
    expect(coord.val).to.deep.equal({ a:12 });
  });

  it('will correctly import from Key, without separator', () => {
    const coord = new Coordinate();
    coord.importFromCoordKey('15|2', 12);
    expect(coord.coordAndVal).to.deep.equal([
      15,2,12
    ]);
  });

  it('will correctly import from Key, with custom separator', () => {
    const coord = new Coordinate();
    coord.importFromCoordKey('15;2', 12, ';');
    expect(coord.coordAndVal).to.deep.equal([
      15,2,12
    ]);
  });
});

describe('Coordinates', () => {
  it('will correctly initialize', () => {
    const coords = new Coordinates([
      new Coordinate(1,2,3),
      new Coordinate(4,5,6),
      new Coordinate(7,8,9)
    ]);

    expect(coords.values).to.deep.equal([
      new Coordinate(1,2,3),
      new Coordinate(4,5,6),
      new Coordinate(7,8,9)
    ]);
  });

  it('will correctly use getters for min and max vals', () => {
    const coords = new Coordinates([
      new Coordinate(1,2,3),
      new Coordinate(4,5,6),
      new Coordinate(7,8,9)
    ]);

    expect(coords.min.x).to.equal(1);
    expect(coords.max.x).to.equal(7);
    expect(coords.min.y).to.equal(2);
    expect(coords.max.y).to.equal(8);
  });

  it('will correctly determine the width', () => {
    const coords = new Coordinates([
      new Coordinate(-2,2,3),
      new Coordinate(4,5,6),
      new Coordinate(7,8,9)
    ]);

    expect(coords.width.x).to.equal(10);
    expect(coords.width.y).to.equal(7);
  });

  it('will correctly determine the gridOffset', () => {
    const coords = new Coordinates([
      new Coordinate(-2,2,3),
      new Coordinate(4,5,6),
      new Coordinate(7,8,9)
    ]);

    expect(coords.gridOffset.x).to.equal(2);
    expect(coords.gridOffset.y).to.equal(-2);
  });

  it('will return a correct grid with no defined replacement for undefined values', () => {
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9)
    ]);

    expect(coords.getGrid()).to.deep.equal([
      [3,6,null,null],
      [null,null,null,9]
    ]);
  
  });

  it('will return a correct grid with 0 as replacement for undefined values', () => {
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9)
    ]);

    expect(coords.getGrid(false, 0)).to.deep.equal([
      [3,6,0,0],
      [0,0,0,9]
    ]);  
  });

  it('will return a correct grid with 0 as replacement for undefined values and transposed', () => {
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9)
    ]);

    expect(coords.getGrid(true, 0)).to.deep.equal([
      [3,0],
      [6,0],
      [0,0],
      [0,9]
    ]);  
  });

  
  it('will print bool grid', () => {
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9)
    ]);

    expect(coords.printBoolGrid({ 
      transposed: false,
      trueString: 'x',
      falseString: '-',
      silent: true
    })).to.deep.equal([
      'xx--',
      '---x'
    ]);

    it('will print bool grid transposed', () => {
      const coords = new Coordinates([
        new Coordinate(1,0,3),
        new Coordinate(1,1,6),
        new Coordinate(2,3,9)
      ]);

      expect(coords.printBoolGrid({ 
        transposed: true,
        trueString: 'x',
        silent: true
      })).to.deep.equal([
        'x ',
        'x ',
        '  ',
        ' x'
      ]);
  
    });
  });
});