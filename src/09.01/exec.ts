import EventEmitter from 'events';
import Input from '../shared/input';

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

  private phaseHasBeenSet: boolean;

  constructor(program: number[], inputs: number[]){
    this.program = [...program];
    this.currentIndex = 0;
    this.nextIndex = 0;
    this.currentInstruction = [];
    this.currentOpCode = 0;
    this.inputQueue = inputs;
    this.phaseHasBeenSet = false;
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
    this.cleanProgram();
    
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
        this.program[this.getParameter(2, true)] 
        = this.getParameter(0) + this.getParameter(1);
        console.log(`Adding ${this.getParameter(0)} and ${this.getParameter(1)} and saving to address ${this.getParameter(2)}`);
        break;
      case 2:        
        this.program[this.getParameter(2, true)] 
        = this.getParameter(0) * this.getParameter(1);
        console.log(`Multiplying ${this.getParameter(0)} and ${this.getParameter(1)} and saving to address ${this.getParameter(2)}`);
        break;
      case 3:
        this.program[this.getParameter(0, true)] = this.inputQueue.shift() || 0;
        console.log(`Saving input ${this.program[this.getParameter(0, true)]} to ${this.getParameter(0)}`);
        break;
      case 4:
        this.output.push(this.getParameter(0));
        this.emitter.emit('output', this.program[this.getParameter(0)]);
        console.log(`Outputting ${this.getParameter(0)}`);
        break;
      case 5:        
        if(this.getParameter(0)) this.nextIndex = this.getParameter(1);
        
        break;
      case 6:        
        if(!this.getParameter(0)) this.nextIndex = this.getParameter(1);
        break;
      case 7:
        this.program[this.getParameter(2, true)] 
        = this.getParameter(0) < this.getParameter(1) ? 1 : 0;
        break;
      case 8:
        this.program[this.getParameter(2, true)] 
        = this.getParameter(0) === this.getParameter(1) ? 1 : 0;
        break;
      case 9:
        this.relativeBase = this.relativeBase + this.currentInstruction[1];
        break;
      default:
        throw `Unkown Method: ${this.currentOpCode}`;
    }
  }

  getParameter(parameterIndex: number, actionIsWrite = false): number{
    const returnIndex = parameterIndex + 1;
    const parameterMode = this.parameterModes[parameterIndex];
    if(parameterMode === 1 && actionIsWrite) return this.program[this.currentInstruction[returnIndex]];
    switch(parameterMode){
      case 0: 
        return this.program[this.currentInstruction[returnIndex]] || 0;
      case 1:
        return this.currentInstruction[returnIndex] || 0;
      case 2:
        if(!this.relativeBase) return this.program[this.currentInstruction[returnIndex]] || 0;
        return this.currentInstruction[returnIndex] + this.relativeBase;
      default:
        throw `Unkown Parameter Mode: ${this.parameterModes[parameterIndex]}`;
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

  executeUntilOutput(): void{
    let outputGenerated = false;
    this.emitter.once('output', () => outputGenerated = true);
    while(
      this.status !== 'finished' && 
      !outputGenerated
    ){
      this.loadNextInstruction();      
      this.execute();
       
    }
  }

  executeAll(): void{
    while(this.status !== 'finished'){
      this.loadNextInstruction();     
      this.execute();
    }
  }
}


export const solveInput = (input: Input): number[] => {
  const program = input.byCommas().toNumber();
  const intComputer = new IntCodeComputer(program, [0]);
  intComputer.executeAll();
  return intComputer.output;
};