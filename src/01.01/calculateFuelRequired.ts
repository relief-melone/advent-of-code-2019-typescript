import getLinesAsNumber from '../shared/getLinesAsNumber';

export const calculateFuelRequired = (mass: number): number => {
  return Math.floor(mass / 3) - 2;
};

export default calculateFuelRequired;

export const solvePuzzle = (filename: string): void => {
  const input = getLinesAsNumber(filename);
  const fuelRequired = input
    .map(m => calculateFuelRequired(m))
    .reduce((total, current) => total + current);
  console.log(`Total Fuel Required for all Modules: ${fuelRequired}`);
};
