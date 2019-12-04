import { isAscendingNumberList } from '../04.01/exec';

export const twoAjacentNoLargerGroup = (numbers: number[]): boolean => {
  const digitsEncountered: number[] = [];
  for(let i = 0; i<numbers.length; i++){
    const n = numbers[i];
    if(!digitsEncountered[n]) digitsEncountered[n] = 0;
    digitsEncountered[n]++;
  }
  return digitsEncountered.indexOf(2) !== -1;
};

export const solveInput = (numbers: number[]): number => {

  return numbers
    .filter(n => n.toString().length === 6)
    .filter(n => 
      isAscendingNumberList(n.toString().split('').map(n => parseInt(n))))
    .filter(n => twoAjacentNoLargerGroup(n.toString().split('').map(n => parseInt(n))))
    .length;
};