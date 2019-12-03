export interface ListObject {
  position: string;
}

export interface Crossing {
  position: string
  runningSum?: number
}

export const getPositionsListFromInstruction = (
  instruction: string,
  currentPositonList:  Array<ListObject>
): Array<ListObject> => {
  const direction = instruction.slice(0, 1);
  const distance = parseInt(instruction.slice(1));

  const isHorizontalMovement = direction == "R" || direction === "L" ? 0 : 1;
  const isMovementInNegativeDirection =  direction === "D" || direction === "L";

  let index:number;
  let positions:Array<{position:string}> = (currentPositonList) ? currentPositonList : [];

  let from = (currentPositonList && currentPositonList.length > 0) ? currentPositonList[currentPositonList.length-1].position.split(",").map(s => parseInt(s)) : [0,0]

  for(
    index = from[isHorizontalMovement];
    isMovementInNegativeDirection
      ? index > from[isHorizontalMovement] - distance
      : index < from[isHorizontalMovement] + distance;
    isMovementInNegativeDirection ? index-- : index++
  ){
    const insetedIndex = isMovementInNegativeDirection ? index -1 : index+1;
    positions.push({
      position: !isHorizontalMovement ? `${insetedIndex},${from[1]}` : `${from[0]},${insetedIndex}`
    });
  }

  return positions;
}

export const findCrossingsBetweenTwoWires = (
  positionLists: [ListObject[], ListObject[]]
): Array<Crossing> => {    
  const positions1 = positionLists[0].map(p => p.position);
  const positions2 = positionLists[1].map(p => p.position);
  const foundCrossings = positions1
  .filter(p => positions2.includes(p))
  .map(p => {return {position: p }});
  return foundCrossings;
};

export const getClosestDistance = (
  foundCrossings: Crossing[]
): number => {
  let closestDistance = Infinity;
  for (let crossing of foundCrossings) {
    let positions = crossing.position.split(",").map(s => parseInt(s));
    const currentDistance = Math.abs(positions[0]) + Math.abs(positions[1]);
    closestDistance = closestDistance > currentDistance ? currentDistance : closestDistance;
  }
  return closestDistance;
};

export const solveInput = (WiresInstructions: [Array<string>,Array<string>]): number => {  
  let wire1Positions:ListObject[] = [];
  WiresInstructions[0].flatMap(instruction => wire1Positions = getPositionsListFromInstruction(instruction, wire1Positions));
  
  let wire2Positions:ListObject[] = [];
  WiresInstructions[1].flatMap(instruction => wire2Positions = getPositionsListFromInstruction(instruction, wire2Positions));
  
  const crossings = findCrossingsBetweenTwoWires([wire1Positions, wire2Positions]);  
  const closestDistance = getClosestDistance(crossings);  
  return closestDistance;
};
