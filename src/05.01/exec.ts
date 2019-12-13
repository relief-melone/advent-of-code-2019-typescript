
import IntCodeComputer from '../shared/intComputer/IntComputer';

export const solveInput = (inputs: number[], firstInput: number): IntCodeComputer => {
  const intComupter = new IntCodeComputer(inputs);
  intComupter.addInput(firstInput);
  intComupter.executeAll();
  
  return intComupter;
};