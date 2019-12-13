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

  it('will correctly add a new value that does not exist', () => {
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9)
    ]);

    coords.add(1,3,5);

    expect(coords.values).to.deep.equal([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9),
      new Coordinate(1,3,5)
    ]);
  });

  it('will correctly overwrite a value for existing coorinates', () => {
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9)
    ]);

    coords.add(1,1,8);

    expect(coords.values).to.deep.equal([
      new Coordinate(1,0,3),
      new Coordinate(1,1,8),
      new Coordinate(2,3,9)
    ]);
  });

  it('will correctly remove an existing coordinate and return true', () => {
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9)
    ]);

    const removed = coords.remove(1,1);

    expect(removed).to.be.true;
    expect(coords.values).to.deep.equal([
      new Coordinate(1,0,3),      
      new Coordinate(2,3,9)
    ]);
  });

  it('will correctly look for a non existing coordinate and return false', () => {
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9)
    ]);

    const removed = coords.remove(2,2);

    expect(removed).to.be.false;
    expect(coords.values).to.deep.equal([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),      
      new Coordinate(2,3,9)
    ]);
  });

  it('will correctly getACoordinate by its x and y Values', () =>{
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9)
    ]);

    const found = coords.getByXAndY(2,3);

    expect(found).to.deep.equal(    
      new Coordinate(2,3,9)
    );
  });

  it('will correctly search for a coordinate by its x and y values and return null for not found', () =>{
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9)
    ]);

    const found = coords.getByXAndY(3,3);

    expect(found).to.equal(null);
  });

  it('will correctly count primitive values', () => {
    const coords = new Coordinates([
      new Coordinate(1,0,3),
      new Coordinate(1,1,6),
      new Coordinate(2,3,9),
      new Coordinate(3,3,9)
    ]);

    expect(coords.countValues(9)).to.equal(2);
  });

  
  it('will correctly count non-primitive values', () => {
    const coords = new Coordinates([
      new Coordinate(1,0,{ a:15,
        b: 3 }),
      new Coordinate(1,1,{ a:15,
        c: 3 }),
      new Coordinate(2,3,{ a:12,
        b: 3 }),
      new Coordinate(3,3,{ a:15,
        b: 3 }),
      new Coordinate(3,3,{ a:15,
        b: 3 })
    ]);

    expect(coords.countValues({ 
      a: 15,
      b: 3 
    })).to.equal(3);
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
});