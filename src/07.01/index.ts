import { solveInput } from './exec';
import getCommaSeparatedList from '../shared/getCommaSeparatedList';
import genereateUniqueSequence from '../shared/genereateUniqueSequence';

const program = getCommaSeparatedList('input.07.01.txt').map(a=> parseInt(a));
const sequences = genereateUniqueSequence(1234,43210,[5,6,7,8,9]);

console.log(`Highest Thruster Signal Possible: ${solveInput(sequences, program)}`);