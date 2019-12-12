
import Input from '../shared/new/input';
import { lineToThreeDCoords, solveInput } from './exec';
import { StopWatch } from '../shared/stopWatch';

const sw = (new StopWatch).start();
const input = new Input('input.12.01.txt').byLines().items.map(l =>
  lineToThreeDCoords(l)
);

console.log(solveInput(input));
console.log(`Running Time: ${sw.runningMs} ms`);