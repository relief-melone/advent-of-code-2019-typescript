export class IntCodeComputer {
  program: number[];
  currentInstruction: number[];
  currentIndex: number;
  nextIndex: number;
  currentOpCode: number;
  input: number;
  parameterModes: number[];
  output: number[];


  constructor(program: number[], input:number){
    this.program = program;
    this.currentIndex = 0;
    this.nextIndex = 0;
    this.currentInstruction = [];
    this.currentOpCode = 0;
    this.input = input;
    this.parameterModes = [];
    this.output = [];
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
      case 99:
        return false;
      default:        
        return false;        
    }

    this.nextIndex = this.currentIndex + stepGap;
    this.currentInstruction = this.program.slice(this.currentIndex, this.nextIndex);
    
    return true;
  }
  
  execute(): void{
    switch(this.currentOpCode){
      case 1:
        const summand1 = this.parameterModes[0] ? this.currentInstruction[1] : this.program[this.currentInstruction[1]];
        const summand2 = this.parameterModes[1] ? this.currentInstruction[2] : this.program[this.currentInstruction[2]];
        this.program[this.currentInstruction[3]] = summand1+summand2
        break;
      case 2:
        const factor1 = this.parameterModes[0] ? this.currentInstruction[1]: this.program[this.currentInstruction[1]];
        const factor2 = this.parameterModes[1] ?  this.currentInstruction[2]: this.program[this.currentInstruction[2]];
        this.program[this.currentInstruction[3]] = factor1*factor2;
        break;
      case 3:
        this.program[this.currentInstruction[1]] = this.input;
        break;
      case 4:
        this.output.push(this.program[this.currentInstruction[1]]);
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
}


export const solveInput = (inputs: number[],input:number) => {
  const intComupter = new IntCodeComputer(inputs, 1);
  while(intComupter.loadNextInstruction()){
    intComupter.execute();
  }
  return intComupter;
};