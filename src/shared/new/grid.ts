import deepEqual from 'deep-equal';
import { isPrimitive } from 'util';
import ansi from 'ansi';

const cursor = ansi(process.stdout);

export class Coordinate {
  coordAndVal: [number, number, any];
  
  constructor(x = 0,y = 0, val: any = null){
    this.coordAndVal = [x,y,val];
  }
  get x(): number{
    return this.coordAndVal[0];
  }
  get y(): number{
    return this.coordAndVal[1];
  }
  get val(): any{
    return this.coordAndVal[2];
  }

  importFromCoordKey(key: string, val: any = null, separator = '|',): Coordinate{
    const splitKey = key.split(separator);
    if(splitKey.length !== 2) throw 'Coordinate: Invalid CoordinateKey';
    this.coordAndVal = [parseInt(splitKey[0]), parseInt(splitKey[1]), val];
    return this;
  };
}

export class Coordinates {
  values: Coordinate[];

  getLimitValue(Coordinates: Coordinate[], Axis: 'x' | 'y', limit: 'min' | 'max' = 'min'): number{
    const coordIndex = Axis === 'x' ? 0 : 1;
    if(limit === 'min')
      return Coordinates.map(C => C.coordAndVal[coordIndex]).reduce( (min,val) => min > val ? val : min);
    else
      return Coordinates.map(C => C.coordAndVal[coordIndex]).reduce( (max,val) => max < val ? val : max);
  }
  
  constructor(coordinates: Coordinate[] = []){
    this.values = coordinates;
  }

  get min(): ({x: number;y: number}){
    return {
      x: this.getLimitValue(this.values, 'x'),
      y: this.getLimitValue(this.values, 'y')
    };
  }
  get max(): ({x: number;y: number}){
    return {
      x: this.getLimitValue(this.values, 'x', 'max'),
      y: this.getLimitValue(this.values, 'y', 'max')
    };
  }

  get width(): ({x: number;y: number}){
    return {
      x: this.max.x - this.min.x + 1,
      y: this.max.y - this.min.y + 1
    };
  }

  get gridOffset(): ({x: number;y: number}){
    return {
      x: -this.getLimitValue(this.values, 'x'),
      y: -this.getLimitValue(this.values, 'y')
    };
  }

  add(x,y,val: any): Coordinate{
    const ind = this.values.findIndex(c => c.x === x && c.y === y);
    const coord = new Coordinate(x,y,val);
    if(ind !== -1) this.values[ind] = coord;
    else this.values.push(coord);
    return coord;
  }

  remove(x,y): boolean{
    const ind = this.values.findIndex(c => c.x === x && c.y === y);
    if(ind === -1) return false;
    else this.values.splice(ind,1);
    return true;
  }

  getByXAndY(x,y): any{
    return this.values.filter(coord => coord.x === x && coord.y === y)[0] || null;
  }

  countValues(val: any): number{
    
    const filterFunc = isPrimitive(val)
      ? v => v.val === val
      : v => deepEqual(v.val,val);

    return this.values.filter(filterFunc).length;

  }

  getGrid(transpose = false, undefinedReplacement: any = null): any[][]{
    const grid: any[][] = [];
    const p1 = transpose ? 'y' : 'x';
    const p2 = transpose ? 'x' : 'y';
    
    this.values.map(c => {
      if(!grid[c[p1] + this.gridOffset[p1]]) grid[c[p1] + this.gridOffset[p1]] = [];
      grid [c[p1] + this.gridOffset[p1]] [c[p2] + this.gridOffset[p2]] = c.val;      
    });
    
    for(let _p1 = 0; _p1 < this.width[p1]; _p1++){
      if(!grid[_p1]) grid[_p1] = [];
      for(let _p2 = 0; _p2 < this.width[p2]; _p2++){
        if(grid[_p1][_p2] === undefined) grid[_p1][_p2] = undefinedReplacement;
      }
    }    
    return grid;
  }

  transpose(): Coordinates{
    return new Coordinates(
      this.values.map(coord => {
        return new Coordinate(coord.y, coord.x, coord.val);
      })
    );
  }

  reverse(): Coordinates{
    return new Coordinates(
      this.values.map(coord => {
        return new Coordinate(coord.x,-coord.y, coord.val);
      })
    );
  }

  printGrid(options: {
    stringMap: Record<string,string>;
    clearConsoleFirst?: boolean;
    defaultOffset?: {
      x: number;
      y: number;
    };
    additionalText?: string;
  }): void{
    if(!options.stringMap) throw 'Please provide a string map';
    const clearConsoleFirst = options.clearConsoleFirst !== undefined ? options.clearConsoleFirst : false;
    const defaultOffset = options.defaultOffset !== undefined ? options.defaultOffset : { 
      x: 2,
      y: 2 
    };
    const additionalText = options.additionalText !== undefined ? options.additionalText : '';

    const stringMap = options.stringMap;
    const emptyString = stringMap.empty || '';            

    const xOff = this.gridOffset.x + defaultOffset.x;
    const yOff = this.gridOffset.y + defaultOffset.y;
    
    let endOfCommand = this.width.y;

    if(clearConsoleFirst) console.clear();
    this.values.map(coord => {
      const x = coord.x + xOff;
      const y = coord.y + yOff;

      if(coord.val){
        cursor
          .goto(x,y)
          .write(coord.val ? stringMap[coord.val] : emptyString);
      }      
    });

    if(additionalText){
      cursor
        .goto(1,endOfCommand + 5)
        .write(additionalText);
      endOfCommand += additionalText.split('\n').length;
    }

    cursor.goto(0,endOfCommand + 5);
  }

  printCoordinateMapped(
    options: {
      stringMap: Record<string,string>;
      defaultOffset?: {
        x: number;
        y: number;
      };
    },
    coord: Coordinate
  ): void{
    if(!options.stringMap) throw 'Please provide a string map';
    const defaultOffset = options.defaultOffset !== undefined ? options.defaultOffset : { 
      x: 2,
      y: 2 
    };
    
    const stringMap = options.stringMap;
    const emptyString = stringMap.empty || ' ';            

    const xOff = this.gridOffset.x + defaultOffset.x;
    const yOff = this.gridOffset.y + defaultOffset.y;

    const x = coord.x + xOff;
    const y = coord.y + yOff;

    cursor
      .goto(x,y)
      .write(coord.val ? stringMap[coord.val] : emptyString);

    cursor.reset;
  }
}