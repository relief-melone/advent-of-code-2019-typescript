// import { IntCodeComputer } from '../05.02/exec';

export class Amplifier {
  program: number[];
  currentInstruction: number[];
  currentIndex: number;
  nextIndex: number;
  currentOpCode: number;
  inputs: number[];  
  parameterModes: number[];
  output: number[];
  iterations: number;

  private inputIndex: number;


  constructor(program: number[], inputs: number[]){
    this.program = [...program];
    this.currentIndex = 0;
    this.nextIndex = 0;
    this.currentInstruction = [];
    this.currentOpCode = 0;
    this.inputs = inputs;
    this.inputIndex =0;
    this.parameterModes = [];
    this.output = [];
    this.iterations =0;
  }

  get input(): number{
    return this.inputs[this.inputIndex++%2];
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
        stepGap =  4;
        break;
      case 99:
        return false;
      default:        
        throw 'Unkown Op Code';       
    }

    this.nextIndex = this.currentIndex + stepGap;
    this.currentInstruction = this.program.slice(this.currentIndex, this.nextIndex);
    
    return true;
  }
  
  execute(): void{
    this.iterations++;
    const param1 = this.parameterModes[0] ? this.currentInstruction[1]: this.program[this.currentInstruction[1]];
    const param2 = this.parameterModes[1] ? this.currentInstruction[2]: this.program[this.currentInstruction[2]];
    switch(this.currentOpCode){
      // Add
      case 1:        
        this.program[this.currentInstruction[3]] = param1+param2;
        break;
      // Multiply
      case 2:        
        this.program[this.currentInstruction[3]] = param1*param2;
        break;
      // Input and Save To Address
      case 3:
        this.program[this.currentInstruction[1]] = this.input;
        break;
      case 4:
        this.output.push(this.program[this.currentInstruction[1]]);
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
      default:
        throw 'No known Method';
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

  executeAll(): void{
    while(this.loadNextInstruction()){
      this.execute();
    }
  }
}


export const getOutputForSequence = (
  sequence: number[], 
  program: number[],
  initialInput = 0
): number => {
  let output = initialInput;
  for(let i=0; i<sequence.length; i++){
    const phase = sequence[i];
    const amp = new Amplifier(program, [phase, output]);
    amp.executeAll();
    output = amp.lastOutput;
  }
  return output;
};

export const solveInput = (sequences: number[][], program: number[]): number => {
  const thrusterSignals: number[] = [];
  for(let i=0; i<sequences.length; i++){
    thrusterSignals.push(getOutputForSequence(sequences[i], program, 0));
  }
  return thrusterSignals.sort((a,b) => b-a)[0];
};