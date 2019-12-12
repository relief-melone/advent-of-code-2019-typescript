import Input, { getPairs, getLeastCommonMultiple } from '../shared/new/input';
import clone from 'clone-deep';
import deepEquals from 'fast-deep-equal';

interface ThreeDCoord{
  x: number;
  y: number;
  z: number;
}

interface State{
  _velocity: [number, number, number];
  _position: [number, number, number];
}


export class Moon {
  name: string;
  _velocity: [number, number, number];
  _position: [number, number, number];
  id: number;

  constructor(name: string, x: number,y: number,z: number, id: number){
    this.name = name;
    this._velocity = [0,0,0];
    this._position = [x,y,z];
    this.id = id;
  }

  getState(): string{
    return `${this.position.x}|${this.position.y}|${this.position.z}||${this.velocity.x}|${this.velocity.y}|${this.velocity.z}`;
  }

  get velocity(): ThreeDCoord{
    return {
      x: this._velocity[0],
      y: this._velocity[1],
      z: this._velocity[2]
    };
  }

  get position(): ThreeDCoord{
    return {
      x: this._position[0],
      y: this._position[1],
      z: this._position[2]
    };
  }

  get potentialEnergy(): number{
    return this._position.reduce((prev, cur) => Math.abs(prev) + Math.abs(cur));
  }

  get kineticEnergy(): number{
    return this._velocity.reduce((prev, cur) => Math.abs(prev) + Math.abs(cur));
  }

  get totalEnergy(): number{
    return this.potentialEnergy * this.kineticEnergy;
  }

  applyGravity(Moon: Moon): void{
    ['x','y','z'].forEach((dir, ind) => {
      if(this.position[dir] > Moon.position[dir]) this._velocity[ind]--;
      if(this.position[dir] < Moon.position[dir]) this._velocity[ind]++;
    });
  }

  updatePosition(): void{
    ['x','y','z'].forEach((val,ind) => {
      this._position[ind] += this.velocity[val];
    });
  }
}



export const solveInput = (input: ThreeDCoord[]): number => {
  const moons: Moon[] = [];
  const moonNames = ['Io', 'Europa', 'Ganymede','Callisto'];

  input.forEach((val,ind) => {
    moons.push(new Moon(moonNames[ind],val.x,val.y,val.z, ind));
  });

  const pairs = getPairs(moons);  

  const statesPerMoon: string[][] = moons.map(() => []);
  const foundRepitionCycles: number[] = [];
    
  let i = 0;
  searchCycle: while(true){    

    pairs.forEach((pair) => {
      [[0,1],[1,0]].forEach(val => {
        pair[val[0]].applyGravity(pair[val[1]]);
      });
    });

    moons.forEach(moon => {
      moon.updatePosition();
    });
    
    moons.forEach((moon, index) => {
      const moonSet = statesPerMoon[index];      
      const currentState = moon.getState();
      const stateIndex = moonSet.indexOf(currentState);
      if(stateIndex !== -1 && !foundRepitionCycles[index]){
        console.log(`${moon.name} Repitions: ${i - stateIndex}`);
        foundRepitionCycles[index] = i - stateIndex;
      } 
      statesPerMoon[index].push(moon.getState());
    });

    if(foundRepitionCycles.filter(a=> typeof(a) === 'number').length === moons.length) 
      return getLeastCommonMultiple(foundRepitionCycles);  
    i++;
  }
};

export const lineToThreeDCoords = (line: string): ThreeDCoord => {  
  const digits = line.match(/[+-]?\d{1,}/g);
  if(!digits) throw 'lineToThreeDCoords - invalid Coordinate Line';
  const coords: ThreeDCoord = {
    x: parseInt(digits[0]),
    y: parseInt(digits[1]),
    z: parseInt(digits[2])
  };
  return coords;
};

export const solveForText = (textOrFilename: string, isRaw = false): number => {
  const input = new Input(textOrFilename,isRaw).byLines().items.map(l =>
    lineToThreeDCoords(l)
  );
  return solveInput(input);
};