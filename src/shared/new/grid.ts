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

  printBoolGrid(options: {
    trueString?: string;
    falseString?: string;
    transposed?: boolean;
    reversed?: boolean;
    silent?: boolean;
  }): string[]{
    const transposed = options.transposed !== undefined ? options.transposed : false;
    const trueString = options.trueString !== undefined ? options.trueString : '\u25A1';
    const falseString = options.falseString !== undefined ? options.falseString : ' ';
    const reversed = options.reversed !== undefined ? options.reversed : false;
    const silent = options.silent !== undefined ? options.silent : false;

    const grid = this.getGrid(transposed);
    const p1 = transposed ? 'y' : 'x';
    const p2 = transposed ? 'x' : 'y';
    
    const lines: string[] = [];
    for(let _p1 = 0; _p1 < this.width[p1]; _p1++){
      let line = '';
      for(let _p2 = 0; _p2 < this.width[p2]; _p2++){
        line += grid[_p1][_p2] ? trueString : falseString;
      }
      lines.push(line);      
    }

    if(!silent)
      if(!reversed) lines.forEach(l => console.log(l));
      else [...lines].reverse().forEach(l => console.log(l));
    
    return lines;
  }


}