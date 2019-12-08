export const calculateNrOfLayers =(input: number[], width: number, height: number): number => {
  return input.length/(width*height);
};

export const splitInputIntoLayers = (input: number[], width: number, height: number): number[][] => {
  const result: number[][] = [];
  const nrOfLayers = calculateNrOfLayers(input, width,height);
  const entriesPerLayer = input.length/nrOfLayers;
  for(let i =0; i<input.length; i += entriesPerLayer){
    const layer: number[] = [];
    for(let j=0; j<entriesPerLayer; j++){
      layer.push(input[i+j]);
    }
    result.push(layer);
  }
  return result;
};

export const countDigitsInLayer = (layer: number[]): Record<string,number>=> {
  const result = {};
  layer.forEach(a => {
    if(!result[a]) result[a] = 0;
    result[a]++;
  });
  return result;
};

export const solveInput = (input: number[]): number => {
  const vals = splitInputIntoLayers(input, 25,6)
    .map(l => countDigitsInLayer(l))
    .sort((a,b) => a['0'] - b['0'] );
  return vals[0]['1'] * vals[0]['2'];
};