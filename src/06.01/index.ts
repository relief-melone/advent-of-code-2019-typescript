import { solveInput } from './exec';
import getLines from '../shared/getLines';

const lines = getLines('input.06.01.txt');
console.log(`Total number of Orbits: ${solveInput(lines)}`);