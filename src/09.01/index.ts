import { solveInput } from './exec';
import getCommaSeparatedList from '../shared/getCommaSeparatedList';
import genereateUniqueSequence from '../shared/genereateUniqueSequence';

const program = getCommaSeparatedList('input.09.01.txt').map(a=> parseInt(a));

console.log(`Highest Thruster Signal Possible: ${solveInput(program)}`);