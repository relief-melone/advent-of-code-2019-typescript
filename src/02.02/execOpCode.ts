import getCommaSeparatedList from "../shared/getCommaSeparatedList";
import clone from "clone-deep";

export const addOperation = (
  OpCodeQuadruple: Array<number>,
  Program: Array<number>
): void => {
  Program[OpCodeQuadruple[3]] =
    Program[OpCodeQuadruple[1]] + Program[OpCodeQuadruple[2]];
};

export const multiplyOperation = (
  OpCodeQuadruple: Array<number>,
  Program: Array<number>
): void => {
  Program[OpCodeQuadruple[3]] =
    Program[OpCodeQuadruple[1]] * Program[OpCodeQuadruple[2]];
};

export const solveInput = (input: Array<number>): string => {
  forLoop: for (let i = 0; i < input.length - 3; i += 4) {
    let codeQuadruple = [input[i], input[i + 1], input[i + 2], input[i + 3]];

    switch (codeQuadruple[0]) {
      case 1:
        addOperation(codeQuadruple, input);
        break;
      case 2:
        multiplyOperation(codeQuadruple, input);
        break;
      case 99:
        break forLoop;
      default:
        throw "Unkown Op Code";
    }
  }
  return input.join(",");
};

export const solvePuzzle = (
  inputfile: string,
  desiredValue: number = 19690720
) => {
  let input = getCommaSeparatedList(inputfile)
    .map(s => parseInt(s))
    .filter(i => i === i);

  let noun = 0;
  let verb = 0;

  nounLoop: for (noun = 0; noun <= 99; noun++) {
    for (verb = 0; verb <= 99; verb++) {
      let clonedInput = clone(input);
      clonedInput[1] = noun;
      clonedInput[2] = verb;
      let currentOutput = parseInt(solveInput(clonedInput));
      if (currentOutput === desiredValue) break nounLoop;
    }
  }

  let result = 100 * noun + verb;
  console.log(`Current Value on Position 0: ${input[0]}`);
  console.log(`Noun: ${noun}, Verb: ${verb}, Result: ${result}`);
};
