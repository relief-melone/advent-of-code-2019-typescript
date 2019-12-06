export class IntCodeComputer {
  program: number[];
  currentInstruction: number[];
  currentIndex: number;
  nextIndex: number;
  currentOpCode;

  constructor(input: number[]){
    this.program = input;
    this.currentIndex = 0;
    this.nextIndex = 0;
    this.currentInstruction = [];
    this.currentOpCode = 0;
  }

  loadNextInstruction(): void{
    this.currentIndex = this.nextIndex;
    let stepGap;
    switch(this.program[this.currentIndex]){
      // Add
      case 1:
      case 2:
        stepGap = 4;        
        break;
      // Multiply
      case 3:
        stepGap = 2;        
        break;       
      case 4:
        break;
      case 99:
        return;
        break;
      default:        
        throw 'Unknown Op Code';
        
    }
    this.nextIndex = this.currentIndex +4;
    this.currentInstruction = this.program.slice(this.currentIndex, this.nextIndex-1);
  }
  
  execute(Method: string): void{
    switch(Method){
      case 'Add':
        break;
      default:
        throw 'No known Method';
    }
  }
}



export const disassembleOpValue = (values: number): number[] => {
  const strSeries = values.toString();
  const result: number[] = [];
  result[0] = parseInt(strSeries.slice(strSeries.length-2));
  result[1] = parseInt(strSeries.slice(strSeries.length-3,strSeries.length-2) || '0');
  result[2] = parseInt(strSeries.slice(strSeries.length-4,strSeries.length-3) || '0');
  result[3] = parseInt(strSeries.slice(strSeries.length-5,strSeries.length-4) || '0');

  return result;
};

export const getInstructions = (index: number, Program: number[]): number[] => {

};

export const getParameters = (Instructon: number[]): number[] => {
  
};

export const executeInstruction = (Instruction: number[], Program: number[]): void => {
  const opSet = disassembleOpValue(Instruction[0]);
  opCodeLoop: switch(opSet[0]){
    // Add
    case 1:      
      break;
    // Multiply
    case 2:
      break;
    // Store Input
    case 3:
      break;
    // Ouput
    case 4:
      break;
    case 99:
      break opCodeLoop;
    default:
      throw 'Unknown Op Code';
  }
};

export const solveInput = (input: string[]) => {


};