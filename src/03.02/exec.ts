import {
  ListObject,
  Crossing,
  getPositionsListFromInstruction,
  findCrossingsBetweenTwoWires,
} from "../03.01/exec";

export const calcWireLengthAtCrossing = (
  crossing:Crossing,
  wirePositions: ListObject[]
): number => {
  for(let ind = 0; ind < wirePositions.length; ind++){
    if(wirePositions[ind].position === crossing.position){
      return ind+1;
    }
  }

  throw "Not Found"
}

export const calculateRuningSum = (
  crossing: Crossing,
  wire1Positions: ListObject[],
  wire2Positions: ListObject[]
) => {
  const distanceOnWire1 = calcWireLengthAtCrossing(crossing, wire1Positions);
  const distanceOnWire2 = calcWireLengthAtCrossing(crossing, wire2Positions);  
  return distanceOnWire2+distanceOnWire1;
}

 export const solveInput = (WiresInstructions: [Array<string>,Array<string>]): number => {  
  
  let wire1Positions:ListObject[] = [];
  WiresInstructions[0].flatMap(instruction => getPositionsListFromInstruction(instruction, wire1Positions));
  
  let wire2Positions:ListObject[] = [];
  WiresInstructions[1].flatMap(instruction => getPositionsListFromInstruction(instruction, wire2Positions));
  
  const crossings = findCrossingsBetweenTwoWires([wire1Positions, wire2Positions])
  return crossings.map(crossing => 
    Object.assign(
      crossing, 
      {runningSum: calculateRuningSum(crossing, wire1Positions, wire2Positions)}
    )
  ).sort((a,b) => a.runningSum - b.runningSum)[0].runningSum;

};