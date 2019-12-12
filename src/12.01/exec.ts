import Input, { getPairs } from '../shared/new/input';

interface ThreeDCoord{
  x: number;
  y: number;
  z: number;
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

export const solveInput = (input: ThreeDCoord[], nrOfRuns = 1000): number => {
  const moons: Moon[] = [];
  const moonNames = ['Io', 'Europa', 'Ganymede','Callisto'];

  input.forEach((val,ind) => {
    moons.push(new Moon(moonNames[ind],val.x,val.y,val.z, ind));
  });

  const pairs = getPairs(moons);

  for(let i = 0; i < nrOfRuns; i++){
    pairs.forEach((pair) => {
      [[0,1],[1,0]].forEach(val => {
        pair[val[0]].applyGravity(pair[val[1]]);
      });
    });

    moons.forEach(moon => {
      moon.updatePosition();
    });
    moons;
  }

  const totalEnergyOfSystem = moons.map(m => m.totalEnergy).reduce((prev,cur) => prev + cur);
  return totalEnergyOfSystem;
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

export const solveForText = (textOrFilename: string, isRaw = false, nrOfRuns = 1000): number => {
  const input = new Input(textOrFilename,isRaw).byLines().items.map(l =>
    lineToThreeDCoords(l)
  );
  return solveInput(input, nrOfRuns);
};