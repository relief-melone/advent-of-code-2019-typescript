import getLines from '../shared/getLines';
import { StopWatch } from '../shared/stopWatch';
import { solveInput } from './exec';

const watch = new StopWatch().start();
const input = getLines('input.03.01.txt').map(l => l.split(','));
const combinedLength = solveInput([input[0], input[1]]);
watch.stop();
console.log(`Total calculation Time: ${watch.runningMs} s`);
console.log(`Minimal combined length: ${combinedLength}`);
