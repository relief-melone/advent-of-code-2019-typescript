import getRaw from './getRawInput';
import deepEquals from 'deep-equal';
import { isObject } from 'util';
import { stringify } from 'querystring';

export default class Input {
  raw: string;

  constructor(inputStringOrFile: string, isRaw = false){
    this.raw = isRaw ? inputStringOrFile : getRaw(inputStringOrFile).replace(/\r\n/g, '\n');
  }

  byLines(): StringList{
    return new StringList(this.raw, '\n');
  }

  byCommas(): StringList{
    return new StringList(this.raw, ','); 
  }
}

export class StringList {
  items: string[];

  constructor(raw: string, splitter: string){
    this.items = raw.split(splitter);
  }

  toNumberList(): NumberList{
    return new NumberList(
      this.items
        .map(a => parseInt(a))
        .filter(a => typeof a === 'number' && a === a)
    );
  }

  removeDuplicates(): StringList {removeDuplicates(this.items); return this;}
  intersect(list: string[]): StringList{ this.items = intersect(this.items, list); return this;}
  getChunks(chunkSize: number): string[][]{return getChunks(this.items,chunkSize);}
}

export class NumberList {
  items: number[];

  constructor(numbers: number[]){
    this.items = numbers;
  }

  removeDuplicates(): NumberList { removeDuplicates(this.items); return this;}
  intersect(list: number[]): NumberList{ this.items = intersect(this.items, list); return this;}
  getChunks(chunkSize: number): number[][]{return getChunks(this.items,chunkSize);}
}

export const intersect = <T>(input1: T[], input2: T[]): T[] => {
  const intersection: T[] = [];
  
  for(let i = 0; i < input1.length; i++){
    switch(typeof(input1[i])){
      case 'object':
        if(input2.filter(item => deepEquals(item,input1[i])).length !== 0) intersection.push(input1[i]);
        break;
      default:
        if(input2.indexOf(input1[i]) !== -1) intersection.push(input1[i]);
        break;
    }
  }

  return intersection;
};

export const removeDuplicates = <T>(input: T[]): T[] => {
  const uniqueList: T[] = [];

  return input.filter(item => {
    switch(typeof(item)){
      case 'object':        
        if(!uniqueList.filter(uItem => deepEquals(uItem, item)).length){
          uniqueList.push(item);
          return true;
        }
        return false;
      default:
        if(uniqueList.indexOf(item) === -1){
          uniqueList.push(item);
          return true;
        }
        return false;
    }
  });  
};

export const getChunks = <T>(input: T[], chunkSize: number): Array<T>[] => {
  const result: Array<T>[] = [];

  for(let i = 0; i < input.length; i++){
    const chunk: T[] = [];
    for(let j = 0; j < chunkSize; j++){
      chunk.push(input[i]);
      i++;
    }
    result.push(chunk);
  }

  return result;
};



