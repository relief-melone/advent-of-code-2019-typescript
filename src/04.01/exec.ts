export const isAscendingNumberList = (numbers: number[]): boolean => {
  let initialDigit = -1;
  for(let i = 0; i<numbers.length; i++){
    if(initialDigit > numbers[i]) return false;
    initialDigit = numbers[i];
  }
  return true;
};

export const hasTwoAdjacentDigits = (numbers: number[]): boolean => {
  const digitsEncountered: number[] = [];
  for(let i = 0; i<numbers.length; i++){
    if(digitsEncountered.indexOf(numbers[i]) !== -1) return true;
    digitsEncountered.push(numbers[i]);
  }
  return false;
};

export const solveInput = (numbers: number[]): number => {

  return numbers
    .filter(n => n.toString().length === 6)
    .filter(n => 
      isAscendingNumberList(n.toString().split('').map(n => parseInt(n))))
    .filter(n => hasTwoAdjacentDigits(n.toString().split('').map(n => parseInt(n))))
    .length;
};