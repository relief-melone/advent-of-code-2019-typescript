import getLines from '../shared/getLines';
import { solveInput } from './exec';

const input = getLines('input.03.01.txt').map(l => l.split(','));
const minimumDistance = solveInput([input[0], input[1]]);

console.log(`Minimum Distance to fist Intersection: ${minimumDistance}`);
