import getCommaSeparatedList from '../shared/getCommaSeparatedList';
import { solveInput } from './exec';

const input = getCommaSeparatedList('input.05.01.txt').map(a=> parseInt(a));

const intCodeComp = solveInput(input,1);

console.log(intCodeComp.lastOutput);