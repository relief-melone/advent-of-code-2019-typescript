import EventEmitter from 'events';

export class IntCodeComputer {
  program: number[];
  currentInstruction: number[];
  currentIndex: number;
  nextIndex: number;
  currentOpCode: number;
  inputs: number[];  
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
    this.inputs = inputs;
    this.phaseHasBeenSet =false;
    this.parameterModes = [];
    this.output = [];
    this.iterations =0;
    this.emitter = new EventEmitter();
    this.status = 'running';
    this.relativeBase = 0;
  }

  get input(): number{
    if(!this.phaseHasBeenSet){
      this.phaseHasBeenSet = true;
      return this.inputs[0];
    } else {
      return this.inputs[this.inputs.length -1];
    }    
  }

  get lastOutput(): number{
    return this.output[this.output.length -1];
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
    const param1 = this.getParameter(0) || 0;
    const param2 = this.getParameter(1) || 0;
    const param3 = this.getParameter(2) || 0;
    switch(this.currentOpCode){
      case 1:        
        this.program[this.currentInstruction[3]] = param1+param2;
        break;
      case 2:        
        this.program[this.currentInstruction[3]] = param1*param2;
        break;
      case 3:
        this.program[param1] = this.input;
        break;
      case 4:
        this.output.push(this.program[param1]);
        this.emitter.emit('output', this.program[param1]);
        break;
      case 5:        
        if(param1) this.nextIndex = param2;
        break;
      case 6:        
        if(!param1) this.nextIndex = param2;
        break;
      case 7:
        this.program[this.currentInstruction[3]] = param1 < param2 ? 1 : 0;
        break;
      case 8:
        this.program[this.currentInstruction[3]] = param1 === param2 ? 1 : 0;
        break;
      case 9:
        this.relativeBase = this.relativeBase + param1;
        break;
      default:
        throw `Unkown Method: ${this.currentOpCode}`;
    }
  }

  getParameter(parameterIndex: number): number{
    const returnIndex = parameterIndex+1;
    switch(this.parameterModes[parameterIndex]){
      case 0: 
        return this.program[this.currentInstruction[returnIndex]];
      case 1:
        return this.currentInstruction[returnIndex];
      case 2:
        if(!this.relativeBase) return this.getParameter(parameterIndex);
        return this.currentInstruction[returnIndex] + this.relativeBase;
      default:
        throw `Unkown Parameter Mode: ${this.parameterModes[parameterIndex]}`;
    }
  }
  disassembleOpValue = (values: number): void => {
    const strSeries = values.toString();
    this.currentOpCode = parseInt(strSeries.slice(strSeries.length-2));
    this.parameterModes = [
      parseInt(strSeries.slice(strSeries.length-3,strSeries.length-2) || '0'),
      parseInt(strSeries.slice(strSeries.length-4,strSeries.length-3) || '0'),
      parseInt(strSeries.slice(strSeries.length-5,strSeries.length-4) || '0')
    ];
  };
  
  cleanProgram(): void{
    for(let i =0;i<this.program.length; i++){
      if(this.program[i] === undefined) this.program[i] = 0;
    }
  }

  executeUntilOutput(): void{
    let outputGenerated = false;
    this.emitter.once('output', () => outputGenerated=true);
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


// export const getOutputForSequence = (
//   sequence: number[], 
//   program: number[],
//   initialInput = 0
// ): number => {
//   let output = initialInput;
//   const amplifiers: Amplifier[] = [];  
//   let oneAmpFinished = false;
  
//   while(!oneAmpFinished){
//     for(let i=0; i<sequence.length; i++){
//       const phase = sequence[i];
//       if(!amplifiers[i]) amplifiers[i] = new Amplifier(program, [phase, output]);
//       const amp = amplifiers[i];
//       amp.inputs[1] = output;      
//       amp.executeUntilOutput();      
//       if(amp.status === 'finished') oneAmpFinished = true;
//       output = amp.lastOutput;
//     }
//   }
  
//   return output;
// };

export const solveInput = (program: number[]): number[] => {
  const intComputer = new IntCodeComputer(program, [0]);
  intComputer.executeAll();
  return intComputer.output;
};