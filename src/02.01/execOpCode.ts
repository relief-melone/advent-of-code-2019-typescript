import getCommaSeparatedList from "../shared/getCommaSeparatedList";

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

export const solvePuzzle = (inputfile: string) => {
  let input = getCommaSeparatedList(inputfile)
    .map(s => parseInt(s))
    .filter(i => i === i);

  input[1] = 12;
  input[2] = 2;
  solveInput(input);

  console.log(`Current Value on Position 0: ${input[0]}`);
};
