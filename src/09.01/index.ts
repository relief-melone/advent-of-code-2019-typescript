import { solveInput } from './exec';
import Input from '../shared/input';
import getCommaSeparatedList from '../shared/getCommaSeparatedList';
import genereateUniqueSequence from '../shared/genereateUniqueSequence';

const input = new Input('input.09.01.txt');

console.log(`Highest Thruster Signal Possible: ${solveInput(input)}`);