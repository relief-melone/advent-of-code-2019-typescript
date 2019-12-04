import { solveInput } from './exec';

const input: number[] = [];
for(let i = 307237; i<=769058; i++){
  input.push(i);
}

const passwordsMatchingCriteria = solveInput(input);

console.log(`${passwordsMatchingCriteria} are matching the criteria`);