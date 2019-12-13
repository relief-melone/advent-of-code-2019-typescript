import { getProgramFromInputData, runProgramAndReturnBlockTileCount } from './exec';
import { StopWatch } from '../shared/stopWatch';


const sw = (new StopWatch).start();
const input = getProgramFromInputData('input.13.01.txt');
const countBlockTiles = runProgramAndReturnBlockTileCount(input);

console.log(`Running Time: ${sw.runningMs} ms`);
console.log(`Nr of BlockTiles: ${countBlockTiles}`);