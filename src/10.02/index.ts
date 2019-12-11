import getLines from '../shared/getLines';
import { getAsteroidLocations, checkHowManyInSight, sortByDegree, shootAsteroidsAndReturnLastShot } from './exec';

const input = getLines('input.10.01.txt').map(a => a.split(''));
const coordinates = getAsteroidLocations(input);

// console.log(sortByDegree([11,13],coordinates));
console.log(shootAsteroidsAndReturnLastShot([11,13],coordinates,11));