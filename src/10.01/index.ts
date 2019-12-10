import getLines from '../shared/getLines';
import { getAsteroidLocations, checkHowManyInSight } from './exec';

const input = getLines('input.10.01.txt').map(a => a.split(''));
const coordinates = getAsteroidLocations(input);

const asteroidsInSight = coordinates.map(a => {
  return {
    location: a,
    inSight: checkHowManyInSight(a,coordinates)
  };
});

// console.log(asteroidsInSight);
console.log(asteroidsInSight);
console.log(asteroidsInSight.sort((a,b) => b.inSight-a.inSight)[0]);