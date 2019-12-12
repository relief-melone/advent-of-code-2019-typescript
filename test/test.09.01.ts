import { expect } from 'chai';
import { solveInput } from '../src/09.01/exec';
import Input from '../src/shared/new/input';


const testSolveInput = (input: string, expected: number[]): void => {
  it(`will match the expected output with ${input}`, ()=> {    
    expect(solveInput(new Input(input, true))).to.deep.equal(expected);  
    
  });
};

describe('Day 9 - First Puzzle', async () => {
  // testSolveInput('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99', [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]);  
  testSolveInput('104,1125899906842624,99',[1125899906842624]); 
  
  it('will return 16 digit number from input 1102,34915192,34915192,7,4,7,99,0', () => {
    const result = solveInput(new Input('1102,34915192,34915192,7,4,7,99,0', true));
    expect(result[0].toString().length).to.equal(16);
  });

  it('Is Equal to 8 - position mode', () => {
    const result = solveInput(new Input('3,9,8,9,10,9,4,9,99,-1,8', true), 8);
    expect(result).to.deep.equal([1]);
  });

  it('Is not Equal to 8 - position mode', () => {
    const result = solveInput(new Input('3,9,8,9,10,9,4,9,99,-1,8', true), 25);
    expect(result).to.deep.equal([0]);
  });

  it('Is less than 8 - position mode', () => {    
    const result = solveInput(new Input('3,9,7,9,10,9,4,9,99,-1,8', true), 2);
    expect(result).to.deep.equal([1]);
  });

  it('Is not less than 8 - position mode', () => {
    const result = solveInput(new Input('3,9,7,9,10,9,4,9,99,-1,8', true), 15);
    expect(result).to.deep.equal([0]);
  });

  it('Is equal to 8 - immediate mode', () => {
    const result = solveInput(new Input('3,3,1108,-1,8,3,4,3,99', true), 8);    
    expect(result).to.deep.equal([1]);
  });

  it('Is not equal to 8 - immediate mode', () => {
    const result = solveInput(new Input('3,3,1108,-1,8,3,4,3,99', true), 2);      
    expect(result).to.deep.equal([0]);
  });

  it('Is less than 8 - immediate mode', () => {
    const result = solveInput(new Input('3,3,1107,-1,8,3,4,3,99', true), 2);      
    expect(result).to.deep.equal([1]);
  });

  it('Is not less than 8 - immediate mode', () => {
    const result = solveInput(new Input('3,3,1107,-1,8,3,4,3,99', true), 15);   
    expect(result).to.deep.equal([0]);
  });

  it('will correctly output 0 for input 0, position mode', () => {
    const result = solveInput(new Input('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', true), 0);   
    expect(result).to.deep.equal([0]);
  });
  it('will correctly output 1 for non-zero, position mode', () => {
    const result = solveInput(new Input('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', true), 2);       
    expect(result).to.deep.equal([1]);
  });
  it('will correctly output 0 for input 0, immediate mode', () => {
    const result = solveInput(new Input('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', true), 0);     
    expect(result).to.deep.equal([0]);
  });
  it('will correctly output 1 for non-zero, immediate mode', () => {
    const result = solveInput(new Input('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', true), 2);     
    expect(result).to.not.deep.equal([0]);
  });

  it('Will correctly output 999 for less than', () => {
    const result = solveInput(new Input(
      '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99', true), 
    2);

    expect(result).to.deep.equal([999]);
  });

  it('Will correctly output 1000 for equal 8', () => {
    const result = solveInput(new Input(
      ' 3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99', true),
    8);
    
    expect(result).to.deep.equal([1000]);
  });

  it('Will correctly output 1001 for greater 8', () => {
    const result = solveInput(new Input(
      '3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99', true),
    35);    

    expect(result).to.deep.equal([1001]);
  });
});