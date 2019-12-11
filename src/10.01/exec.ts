import { solveInput } from '../02.01/execOpCode';

export const getConnectingVector = (
  Point1: [number, number], 
  Point2: [number, number]
): [number, number ] => {
  return [Point2[0]-Point1[0],Point2[1]-Point1[1]];  
};

export const vectorsAreLinearDependentAndInSameDirection = (
  Vector1: [number, number],
  Vector2: [number, number]
): boolean => {  
  if(
    (Vector1[0] === 0 && Vector2[0] === 0 && Vector1[1]/Vector2[1]>0) ||
    (Vector1[1] === 0 && Vector2[1] === 0 && Vector1[0]/Vector2[0]>0)
  ) return true;
    
  const coefficient = Vector2[0]/Vector1[0];
  return (Vector2[1] === coefficient*Vector1[1]) && (coefficient > 0);
};

export const getLongerLinearDependentVector = (
  Vector1: [number, number],
  Vector2: [number, number]
): [number, number] => {
  return Math.abs(Vector1[0]) > Math.abs(Vector1[0]) ? Vector1 : Vector2;
};

export const getAsteroidLocations = (input: string[][]): [number,number][] => {
  const locations: [number,number][] = [];
  for (let y = 0; y < input.length; y++){
    for(let x=0; x<input[y].length; x++){
      if(input[y][x] === '#') locations.push([x,y]);
    }
  }

  return locations;
};

export const twoAreNotEqual = (Point1: [number,number], Point2: [number,number]): boolean => {
  return !(Point1[0] === Point2[0] && Point1[1] === Point2[1]);
};


export const checkHowManyInSight = (
  StationCandidate: [number,number], 
  Locations: [number,number][]
): number => {
  const linearIndependetLinesOfSight: [number,number][] = [];
  return Locations
    .filter(currentAsteriod => twoAreNotEqual(StationCandidate, currentAsteriod))
    .map(currentAsteroid => getConnectingVector(StationCandidate, currentAsteroid))
    .filter(currentLineOfSight => {      
      if(
        linearIndependetLinesOfSight.filter(
          lineOfSight => 
            vectorsAreLinearDependentAndInSameDirection(currentLineOfSight, lineOfSight)
        ).length === 0
      ){
        linearIndependetLinesOfSight.push(currentLineOfSight);
        return true;
      } else {
        return false;
      }
    }).length;
};
