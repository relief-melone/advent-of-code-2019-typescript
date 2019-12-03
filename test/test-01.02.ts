import { calculateFuelRequired } from '../src/01.02/calculateFuelRequired';
import { expect } from 'chai';

const test = (mass, fuel): void => {
  it(`${mass} of mass will require ${fuel} fuel`, () => {
    expect(calculateFuelRequired(mass)).to.equal(fuel);
  });
};

describe('Day 01 - Second Puzzle', () => {
  test(1, 0);
  test(14, 2);
  test(1969, 966);
  test(100756, 50346);
});
