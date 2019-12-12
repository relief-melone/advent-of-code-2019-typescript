import getLines from '../shared/getLines';
import { getAsteroidLocations, checkHowManyInSight } from './exec';
import { StopWatch } from '../shared/stopWatch';

const sw = new StopWatch().start();
const input = getLines('input.10.01.txt').map(a => a.split(''));
const coordinates = getAsteroidLocations(input);

const asteroidsInSight = coordinates.map(a => {
  return {
    location: a,
    inSight: checkHowManyInSight(a,coordinates)
  };
});

console.log(asteroidsInSight.sort((a,b) => b.inSight - a.inSight)[0]);
console.log(`Running Time: ${sw.runningMs} ms`);
