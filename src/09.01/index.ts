import { solveInput } from './exec';
import getCommaSeparatedList from '../shared/getCommaSeparatedList';
import genereateUniqueSequence from '../shared/genereateUniqueSequence';

const program = getCommaSeparatedList('input.07.01.txt').map(a=> parseInt(a));
const sequences = genereateUniqueSequence(56789,98765,[0,1,2,3,4]);

console.log(`Highest Thruster Signal Possible: ${solveInput(sequences, program)}`);