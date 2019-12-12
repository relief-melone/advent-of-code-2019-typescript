import Input from '../shared/new/input';

export const getConnectingVector = (
  Point1: [number, number], 
  Point2: [number, number]
): [number, number ] => {
  return [Point2[0] - Point1[0],Point2[1] - Point1[1]];  
};

export const vectorsAreLinearDependentAndInSameDirection = (
  Vector1: [number, number],
  Vector2: [number, number]
): boolean => {  
  if(
    (Vector1[0] === 0 && Vector2[0] === 0 && Vector1[1] / Vector2[1] > 0) ||
    (Vector1[1] === 0 && Vector2[1] === 0 && Vector1[0] / Vector2[0] > 0)
  ) return true;
    
  const coefficient = Vector2[0] / Vector1[0];
  return (Vector2[1] === coefficient * Vector1[1]) && (coefficient > 0);
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
    for(let x = 0; x < input[y].length; x++){
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

interface AstroidSpecifications {
  LineOfSight: [number,number];
  Coordinates: [number,number]; 
  LineOfSightInDeg: number;
  Distance: number;
  id: number;
}

export const sortByDegree = (
  StationCoordinates: [number, number],
  Locations: [number, number][]
): AstroidSpecifications[] => {
  const result =  Locations
    .filter(currentLocation => twoAreNotEqual(StationCoordinates, currentLocation))
    .map((currentLocation, ind) => {
      const lineOfSight = getConnectingVector(StationCoordinates, currentLocation);
      const result = { 
        Coordinates: currentLocation,
        LineOfSight: lineOfSight,
        LineOfSightInDeg: calculateDegreeAgainstVertical(lineOfSight),
        Distance: Math.sqrt(Math.pow(lineOfSight[0],2) + Math.pow(lineOfSight[1],2)),
        id: ind
      };
      return result;
    })
    .sort((a,b) => a.LineOfSightInDeg - b.LineOfSightInDeg);
  return result;
};

export const calculateDegreeAgainstVertical = (Vector: [number,number]): number => {  
  return Vector[0] >= 0 
    ? 180 - Math.round(180 / Math.PI * Math.acos(Vector[1] / (Math.sqrt(Math.pow(Vector[0],2) + Math.pow(Vector[1],2)))) * 100) / 100
    : 360 - Math.round(180 / Math.PI * Math.acos(-Vector[1] / (Math.sqrt(Math.pow(Vector[0],2) + Math.pow(Vector[1],2)))) * 100) / 100 ;

  
};

export const shootAsteroidsAndReturnLastShot = (
  StationCoordinates: [number, number],
  Locations: [number, number][],
  CountToShoot: number
): AstroidSpecifications[] => {
  const asteroidsSorted = sortByDegree(StationCoordinates, Locations);
  let asteroidsShot = 0;
  let index = 0;

  const shotDownAsteroids: AstroidSpecifications[] = [];
  let currentDirection: [number,number] = [0,-1];
  
  whileLoop: while(asteroidsShot < CountToShoot){
    const asteroidsInThatDirection = asteroidsSorted
      .filter(a => vectorsAreLinearDependentAndInSameDirection(a.LineOfSight, currentDirection))
      .sort((a,b) => a.Distance - b.Distance);
    
    const nearestAsteroidInThatDirection = asteroidsInThatDirection[0];    

    shotDownAsteroids.push(
      asteroidsSorted.splice(asteroidsSorted.findIndex(a => a.id === nearestAsteroidInThatDirection.id),1)[0]
    );
    asteroidsShot++;
    if(asteroidsSorted.length === 0) break whileLoop;
    const indexOfThatDirectionInReversedArray = [...asteroidsSorted].reverse().findIndex(a => vectorsAreLinearDependentAndInSameDirection(currentDirection, a.LineOfSight));
    
    index = indexOfThatDirectionInReversedArray === -1 || indexOfThatDirectionInReversedArray === 0
      ? (index < asteroidsSorted.length ? index : 0)
      : (asteroidsSorted.length) - indexOfThatDirectionInReversedArray;    

    currentDirection = [asteroidsSorted[index].LineOfSight[0], asteroidsSorted[index].LineOfSight[1]];
  }

  return shotDownAsteroids;
};

export const solveInput = (input: Input, nrOfAsteroidsToShoot: number, positionOfStation: [number, number] = [31,20]): number => {
  
  const characters = input.byLines().items.map(l => l.split(''));
  const coordinates = getAsteroidLocations(characters);
  const shotDown = shootAsteroidsAndReturnLastShot(positionOfStation,coordinates,nrOfAsteroidsToShoot);
  const lastShotDown = shotDown[shotDown.length - 1];
  return lastShotDown.Coordinates[0] * 100 + lastShotDown.Coordinates[1];
};