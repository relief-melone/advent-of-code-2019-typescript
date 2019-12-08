import { splitInputIntoLayers } from '../08.01/exec';

export const mergeLayers = (layers: number[][]):  number[] => {
  const mergedLayer: number[] = [];
  for(let i=0; i<layers.length; i++){
    const layer = layers[i];
    for(let j=0; j<layer.length; j++){
      if(mergedLayer[j] !== 1 && mergedLayer[j] !== 0){
        mergedLayer[j] = layer[j];
      }
    }
  }
  return mergedLayer;
};

export const layerToGrid = (layer: number[], width: number, height: number): number[][] => {
  const result: number[][] = [];
  let layerIndex = 0;
  for(let i=0; i<height; i++){
    result[i] = [];
    for(let j=0; j<width; j++){
      result[i][j] = layer[layerIndex++];
    }
  }
  return result;
};

const printGrid = (grid: number[][]): void => {
  for(let w = 0; w< grid.length; w++){
    let line = '';
    for(let h=0;h<grid[w].length;h++){
      line+= grid[w][h] ? '\u2B1C' : ' ';
    }
    console.log(line);
  }
};

export const solveInput = (input: number[]): void => {
  const mergedLayer = mergeLayers(splitInputIntoLayers(input, 25,6));
  printGrid(layerToGrid(mergedLayer,25,6));
};