import getCommaSeparatedList from '../shared/getCommaSeparatedList';
import clone from 'clone-deep';
import { solveInput } from '../02.01/execOpCode';


export const solvePuzzle = (
  inputfile: string,
  desiredValue = 19690720
): void => {
  const input = getCommaSeparatedList(inputfile)
    .map(s => parseInt(s))
    .filter(i => i === i);

  let noun = 0;
  let verb = 0;

  nounLoop: for (noun = 0; noun <= 99; noun++) {
    for (verb = 0; verb <= 99; verb++) {
      const clonedInput = clone(input);
      clonedInput[1] = noun;
      clonedInput[2] = verb;
      const currentOutput = parseInt(solveInput(clonedInput));
      if (currentOutput === desiredValue) break nounLoop;
    }
  }

  const result = 100 * noun + verb;
  console.log(`Current Value on Position 0: ${input[0]}`);
  console.log(`Noun: ${noun}, Verb: ${verb}, Result: ${result}`);
};
