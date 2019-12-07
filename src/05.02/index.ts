import getCommaSeparatedList from '../shared/getCommaSeparatedList';
import { solveInput } from './exec';

const input = getCommaSeparatedList('input.05.01.txt').map(a=> parseInt(a));

const intComputer = solveInput(input,5);
// const intComputer = solveInput(input,1);
console.log(intComputer.output);