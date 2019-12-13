import IntCodeComputer from '../shared/intComputer/IntComputer';

export const solveInput = (inputs: number[],input: number): IntCodeComputer => {
  const intComupter = new IntCodeComputer(inputs);
  intComupter.addInput(input);
  intComupter.executeAll();
  return intComupter;
};