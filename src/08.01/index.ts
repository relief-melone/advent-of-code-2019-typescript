import { solveInput } from './exec';
import getLines from '../shared/getLines';

const input = getLines('input.08.01.txt')[0].split('').filter(a => a).map(a => parseInt(a));
console.log(solveInput(input));