import { getProgramFromInputData, runProgramAndReturnBlockTileCount } from './exec';
import { StopWatch } from '../shared/stopWatch';

const main = async (): Promise<void> => {
  const sw = (new StopWatch).start();
  const input = getProgramFromInputData('input.13.01.txt');
  const score = await runProgramAndReturnBlockTileCount(input);

  console.log(`Running Time: ${sw.runningMs} ms`);
  console.log(`Final Score: ${score}`);
  process.exit();
};

main();