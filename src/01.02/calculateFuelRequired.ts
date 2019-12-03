import getLinesAsNumber from '../shared/getLinesAsNumber';

export const calculateFuelRequired = (mass: number): number => {
  if (mass <= 0) return 0;

  const fuelRequired =
    Math.floor(mass / 3) - 2 >= 0 ? Math.floor(mass / 3) - 2 : 0;

  const fuelForFuel = calculateFuelRequired(fuelRequired);

  return fuelForFuel !== 0
    ? calculateFuelRequired(fuelRequired) + fuelRequired
    : fuelRequired;
};

export default calculateFuelRequired;

export const solvePuzzle = (filename: string): void => {
  const input = getLinesAsNumber(filename);
  const fuelRequired = input
    .map(m => calculateFuelRequired(m))
    .reduce((total, current) => total + current);
  console.log(`Total Fuel Required for all Modules: ${fuelRequired}`);
};
