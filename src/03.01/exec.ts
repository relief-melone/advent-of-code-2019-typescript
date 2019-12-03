export const placeWire = (
  from: [number, number],
  instruction: string,
  grid: Record<string, any>,
  wireNumber: number
): [number, number] => {
  const direction = instruction.slice(0, 1);
  const distance = parseInt(instruction.slice(1));

  const directionIndex = direction == "R" || direction === "L" ? 0 : 1;
  const reverse = direction === "D" || direction === "L";

  let pos;
  for (
    pos = from[directionIndex];
    reverse
      ? pos > from[directionIndex] - distance
      : pos < from[directionIndex] + distance;
    reverse ? pos-- : pos++
  ) {
    const endPos = reverse ? pos - 1 : pos + 1;
    if (directionIndex === 0) {
      grid[`${endPos},${from[1]}`] = !grid[`${endPos},${from[1]}`]
        ? [wireNumber]
        : grid[`${endPos},${from[1]}`].push(wireNumber);
    } else {
      grid[`${from[0]},${endPos}`] = !grid[`${from[0]},${endPos}`]
        ? [wireNumber]
        : grid[`${from[0]},${endPos}`].push(wireNumber);
    }
  }
  return directionIndex === 0 ? [pos, from[1]] : [from[0], pos];
};

export const cleanGrid = (grid: Array<Array<number>>): void => {
  let maxI = grid.length - 1;
  let maxJ = 0;

  for (let i = 0; i < grid.length; i++) {
    if (!grid[i]) grid[i] = [];
    maxJ = maxJ < grid[i].length ? grid[i].length : maxJ;
  }

  for (let i = 0; i < maxI; i++) {
    for (let j = 0; j < maxJ; j++) {
      if (!grid[i][j]) grid[i][j] = 0;
    }
  }
};

export const findCrossings = (
  grid: Array<Array<number>>
): Array<[number, number]> => {
  const foundCrossings: Array<[number, number]> = [];
  for (let i = 0; i <= grid.length; i++) {
    let arr = grid[i];
    if (arr) {
      for (let j = 0; j < arr.length; j++) {
        if (grid[i][j] >= 2) foundCrossings.push([i, j]);
      }
    }
  }
  return foundCrossings;
};

export const getClosestDistance = (
  foundCrossings: Array<[number, number]>
): number => {
  let closestDistance;
  for (let crossing of foundCrossings) {
    const currentDistance =
      Math.abs(crossing[0] - 300) + Math.abs(crossing[1] - 300);
    if (!closestDistance || closestDistance > currentDistance) {
      closestDistance = currentDistance;
    }
  }
  return closestDistance;
};
export const solveInput = (WiresInstructions: Array<Array<string>>): number => {
  const grid = [[]];
  let currentPosition: [number, number];

  for (let i = 0; i < WiresInstructions.length; i++) {
    const instructions = WiresInstructions[i];
    currentPosition = [300, 300];

    for (let j = 0; j < instructions.length; j++) {
      const instruction = instructions[j];
      currentPosition = placeWire(currentPosition, instruction, grid, i);
    }
    cleanGrid(grid);
  }

  const crossings = findCrossings(grid);
  const closestDistance = getClosestDistance(crossings);
  console.log(`Closest Distance to Port: ${closestDistance}`);
  return closestDistance;
};
