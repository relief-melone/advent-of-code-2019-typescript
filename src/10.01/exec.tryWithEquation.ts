export const getPitchBetweenTwoPoints = (
  Point1: [number,number], 
  Point2: [number,number]
): number => {
  return (Point2[1]- Point1[1])/(Point2[0]-Point1[0]);
};

export const getYSection = (
  Point: [number, number],
  Pitch: number
): number => {
  return (Point[1]-Point[0]*Pitch);
};

export const getLinearEquationFromTwoPoints = (
  Point1: [number,number], 
  Point2: [number,number]
): [number, number] => {
  const pitch = getPitchBetweenTwoPoints(Point1, Point2);
  const ySection = getYSection(Point1, pitch);
  return [pitch, ySection];
};

export const pointIsDirectlyBetween2Points = (
  Point1: [number,number],
  Point2: [number,number],
  PointInBetween: [number,number]
): boolean => {
  // Vertical Line Exception
  if(Point1[0] === Point2[0] && Point1[0] === PointInBetween[0]){
    return ([Point1[1],Point2[1]].filter(a => a < PointInBetween[1]).length === 1);
  }
  // Horizontal Line Exception
  if(Point1[1] === Point2[1] && Point1[1] === PointInBetween[1]){
    return ([Point1[0],Point2[0]].filter(a => a < PointInBetween[0]).length === 1);
  }
  // Any other Line
  const equation = getLinearEquationFromTwoPoints(Point1,Point2);
  return (PointInBetween[1] === equation[0]*PointInBetween[0] + equation[1])
  && ([Point1[0],Point2[0]].filter(a => a<PointInBetween[0]).length === 1)
  && ([Point1[1],Point2[1]].filter(a => a<PointInBetween[1]).length === 1);
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

export const checkHowManyInSight = (StationCandidate: [number,number], Locations: [number,number][]): number => {
  let asteroidsInSight = 0;
  
  for(let li = 0; li<Locations.length; li++){    
    const location = Locations[li];
    if(twoAreNotEqual(StationCandidate, location)){      
      let thisOneInSight = true;

      potetiallyInSight: for(let j =0; j<Locations.length; j++){        
        const locationInBetween = Locations[j];
        if(
          twoAreNotEqual(locationInBetween, StationCandidate) &&
          twoAreNotEqual(locationInBetween, location) &&
          pointIsDirectlyBetween2Points(StationCandidate, location, locationInBetween)
        ){          
          thisOneInSight = false;
          break potetiallyInSight;        
        }
      }
      if(thisOneInSight) asteroidsInSight++;
    }  
  }
  return asteroidsInSight;
};