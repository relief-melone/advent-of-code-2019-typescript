import EventEmitter from 'events';
import Input, { NumberList } from '../shared/new/input';

export class IntCodeComputer {
  program: number[];
  currentInstruction: number[];
  currentIndex: number;
  nextIndex: number;
  currentOpCode: number;
  inputQueue: number[];  
  parameterModes: number[];
  output: number[];
  iterations: number;
  emitter: EventEmitter;
  status: string;
  relativeBase: number;


  constructor(program: number[]){
    this.program = [...program];
    this.currentIndex = 0;
    this.nextIndex = 0;
    this.currentInstruction = [];
    this.currentOpCode = 0;
    this.inputQueue = [];
    this.parameterModes = [];
    this.output = [];
    this.iterations = 0;
    this.emitter = new EventEmitter();
    this.status = 'running';
    this.relativeBase = 0;
  }

  get lastOutput(): number{
    return this.output[this.output.length - 1];
  }

  spliceOutputs(nrToSplice: number): number[]{
    return this.output.splice(0,nrToSplice);
  }

  addInput(number): void{
    this.inputQueue.push(number);
  }

  loadNextInstruction(): boolean{
    this.currentIndex = this.nextIndex;
    this.disassembleOpValue(this.program[this.currentIndex]);
    let stepGap;
    switch(this.currentOpCode){
      // Add
      case 1:
      case 2:
        stepGap = 4;        
        break;
      case 3:
      case 4:
        stepGap = 2;        
        break;  
      case 5:
      case 6:
        stepGap = 3;     
        break;
      case 7:
      case 8:
        stepGap = 4;
        break;
      case 9:
        stepGap = 2;
        break;
      case 99:
        this.emitter.emit('finished');
        this.status = 'finished';
        return false;
      default:        
        throw `Unkown Op Code: ${this.currentOpCode}`;       
    }

    this.nextIndex = this.currentIndex + stepGap;
    this.currentInstruction = this.program.slice(this.currentIndex, this.nextIndex);
    
    return true;
  }
  
  execute(): void{
    this.iterations++;
    if(this.currentOpCode === 99){
      this.status = 'finished';
      return;
    }
    switch(this.currentOpCode){
      case 1:        
        this.program[this.getSaveParameter(2)] 
        = this.getParameter(0) + this.getParameter(1);        
        break;
      case 2:        
        this.program[this.getSaveParameter(2)] 
        = this.getParameter(0) * this.getParameter(1);        
        break;
      case 3:
        this.program[this.getSaveParameter(0)] = this.inputQueue.shift() || 0;      
        this.cleanProgram();  
        break;
      case 4:
        this.output.push(this.getParameter(0));
        this.emitter.emit('output', this.program[this.getParameter(0)]);
        break;
      case 5:        
        if(this.getParameter(0)) this.nextIndex = this.getParameter(1);
        break;
      case 6:        
        if(!this.getParameter(0)) this.nextIndex = this.getParameter(1);
        break;
      case 7:
        this.program[this.getSaveParameter(2)] 
        = this.getParameter(0) < this.getParameter(1) ? 1 : 0;
        break;
      case 8:
        this.program[this.getSaveParameter(2)] 
        = this.getParameter(0) === this.getParameter(1) ? 1 : 0;
        break;
      case 9:
        this.relativeBase = this.relativeBase + this.getParameter(0);
        break;
      default:
        throw `Unkown Method: ${this.currentOpCode}`;
    }
  }

  getSaveParameter(parameterIndex: number): number{
    const returnIndex = parameterIndex + 1;
    const parameterMode = this.parameterModes[parameterIndex];

    switch(parameterMode){
      case 0:
        return this.currentInstruction[returnIndex];
      case 1:
        return this.currentInstruction[returnIndex];
      case 2:
        if(!this.relativeBase) return this.currentInstruction[returnIndex] || 0;
        return this.currentInstruction[returnIndex] + this.relativeBase;
      default:
        throw 'getSaveParameter: No known parameterMode';
    }
  }

  getParameter(parameterIndex: number): number{
    const returnIndex = parameterIndex + 1;
    const parameterMode = this.parameterModes[parameterIndex];    
    switch(parameterMode){
      case 0: 
        return this.program[this.currentInstruction[returnIndex]];
      case 1:
        return this.currentInstruction[returnIndex];
      case 2:        
        return this.program[this.currentInstruction[returnIndex] + this.relativeBase];
      default:
        throw `getParameter - no known ParameterMode: ${this.parameterModes[parameterIndex]}`;
    }
  }
  disassembleOpValue = (values: number, minlength = 4): void => {
    const strSeries = values.toString();
    this.currentOpCode = parseInt(strSeries.slice(strSeries.length - 2));
    this.parameterModes = [];
    for(let i = 2; i <= minlength; i++){
      this.parameterModes.push(
        parseInt(strSeries.slice(strSeries.length - i - 1, strSeries.length - i) || '0')
      );
    }
  };
  
  cleanProgram(): void{
    for(let i = 0;i < this.program.length; i++){
      if(this.program[i] === undefined) this.program[i] = 0;
    }
  }

  executeUntilOutput(numberOfOutputs = 1): void{
    let outputsGenerated = 0;
    this.emitter.on('output', () => outputsGenerated++);
    while(
      this.status !== 'finished' && 
      outputsGenerated < numberOfOutputs
    ){
      this.loadNextInstruction();      
      this.execute();
    }
    this.emitter.removeAllListeners();
  }

  executeAll(): void{
    while(this.status !== 'finished'){
      this.loadNextInstruction();     
      this.execute();
    }
  }
}

class TilePaintInfo {  
  NrOfTimesPainted: number;
  Color: 0 | 1;

  constructor(){    
    this.NrOfTimesPainted = 0;
    this.Color = 0;
  }
}

export class PaintRobot{
  currentDirection: [number,number];
  currentPosition: [number,number];
  intComputer: IntCodeComputer;
  
  workInfo: Record<string, TilePaintInfo>;

  constructor(program: number[]){
    this.currentDirection = [0,1];
    this.currentPosition = [0,0];
    this.workInfo = {};
    this.intComputer = new IntCodeComputer(program);
  }

  getPaintedTiles(): number{
    return Object.keys(this.workInfo).length;
  }

  processOneStep(): void{
    this.intComputer.executeUntilOutput(2);
    const input = this.intComputer.spliceOutputs(2) as [0|1,0|1];
    this.paint(input[0]); 
    this.turnAndMove(input[1]);
    this.intComputer.addInput(this.currentColor);
  }

  executeProgram(): void{
    while(this.intComputer.status !== 'finished'){
      this.processOneStep();
    }
  }

  get currentColor(): 0|1{
    return this.workInfo[this.posKey] ? this.workInfo[this.posKey].Color : 0;
  }

  get posKey(): string{
    return `${this.currentPosition[0]}|${this.currentPosition[1]}`;
  }  

  paint(paintInput: 0 | 1): void {
    if(!this.workInfo[this.posKey]) this.workInfo[this.posKey] = new TilePaintInfo();
    const tileInfo = this.workInfo[this.posKey];
    tileInfo.Color = paintInput;
    tileInfo.NrOfTimesPainted++;
  }

  turnAndMove(moveOutput: 0 | 1): void{
    const savedDirection = [...this.currentDirection];
    if(moveOutput === 0){
      this.currentDirection[0] = this.currentDirection[0] ? 0 : -savedDirection[1];
      this.currentDirection[1] = this.currentDirection[1] ? 0 : savedDirection[0];
    } else {
      this.currentDirection[0] = this.currentDirection[0] ? 0 : savedDirection[1];
      this.currentDirection[1] = this.currentDirection[1] ? 0 : -savedDirection[0];
    }
    this.currentPosition[0] += this.currentDirection[0];
    this.currentPosition[1] += this.currentDirection[1];    
  }
}

export const solveInput = (programInput: Input): number => {
  const program = programInput.byCommas().toNumberList().items;  
  const robot = new PaintRobot(program);
  robot.executeProgram();
  return robot.getPaintedTiles();  
};