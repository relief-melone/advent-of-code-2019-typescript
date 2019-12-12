import { solveInput } from './exec';
import Input from '../shared/input';
import { StopWatch } from '../shared/stopWatch';

const sw = new StopWatch().start();
const input = new Input('input.10.01.txt');

console.log(`Solution: ${solveInput(input, 200)}`);
console.log(`Running Time: ${sw.runningMs} ms`);