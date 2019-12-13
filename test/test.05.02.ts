import { solveInput } from '../src/05.02/exec';
import { expect } from 'chai';

describe('Day 5 - Second Puzzle', () => {
  it('Is Equal to 8 - position mode', () => {
    const intComputer = solveInput([3,9,8,9,10,9,4,9,99,-1,8], 8);
    expect(intComputer.output).to.deep.equal([1]);
  });

  it('Is not Equal to 8 - position mode', () => {
    const intComputer = solveInput([3,9,8,9,10,9,4,9,99,-1,8], 25);
    expect(intComputer.output).to.deep.equal([0]);
  });

  it('Is less than 8 - position mode', () => {
    const intComputer = solveInput([3,9,7,9,10,9,4,9,99,-1,8], 2);
    expect(intComputer.output).to.deep.equal([1]);
  });

  it('Is not less than 8 - position mode', () => {
    const intComputer = solveInput([3,9,7,9,10,9,4,9,99,-1,8], 15);
    expect(intComputer.output).to.deep.equal([0]);
  });

  it('Is equal to 8 - immediate mode', () => {
    const intComputer = solveInput([3,3,1108,-1,8,3,4,3,99], 8);
    expect(intComputer.output).to.deep.equal([1]);
  });

  it('Is not equal to 8 - immediate mode', () => {
    const intComputer = solveInput([3,3,1108,-1,8,3,4,3,99], 2);
    expect(intComputer.output).to.deep.equal([0]);
  });

  it('Is less than 8 - immediate mode', () => {
    const intComputer = solveInput([3,3,1107,-1,8,3,4,3,99], 2);
    expect(intComputer.output).to.deep.equal([1]);
  });

  it('Is not less than 8 - immediate mode', () => {
    const intComputer = solveInput([3,3,1107,-1,8,3,4,3,99], 15);
    expect(intComputer.output).to.deep.equal([0]);
  });

  it('will correctly output 0 for input 0, position mode', () => {
    const intComputer = solveInput([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 0);
    expect(intComputer.output).to.deep.equal([0]);
  });
  it('will correctly output 1 for non-zero, position mode', () => {
    const intComputer = solveInput([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 2);
    expect(intComputer.output).to.deep.equal([1]);
  });
  it('will correctly output 0 for input 0, immediate mode', () => {
    const intComputer = solveInput([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 0);
    expect(intComputer.output).to.deep.equal([0]);
  });
  it('will correctly output 1 for non-zero, immediate mode', () => {
    const intComputer = solveInput([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 2);
    expect(intComputer.output).to.not.deep.equal([0]);
  });

  it('Will correctly output 999 for less than', () => {
    const intComputer = solveInput([
      3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
    ],2);

    expect(intComputer.output).to.deep.equal([999]);
  });

  it('Will correctly output 1000 for equal 8', () => {
    const intComputer = solveInput([
      3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
    ],8);

    expect(intComputer.output).to.deep.equal([1000]);
  });

  it('Will correctly output 1001 for greater 8', () => {
    const intComputer = solveInput([
      3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
      1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
      999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
    ],35);

    expect(intComputer.output).to.deep.equal([1001]);
  });
  
});