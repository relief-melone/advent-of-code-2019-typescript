import getRaw from './getRawInput';

export default class Input {
  raw: string;

  constructor(inputStringOrFile: string, isRaw=false){
    this.raw = isRaw ? inputStringOrFile : getRaw(inputStringOrFile).replace(/\r\n/g, '\n');
  }

  byLines(): List{
    return new List(this.raw, '\n');
  }

  byCommas(): List{
    return new List(this.raw, ','); 
  }
}

export class List {
  items: string[];

  constructor(raw: string, splitter: string){
    this.items = raw.split(splitter);
  }

  toNumber(): number[]{
    return this.items
      .map(a => parseInt(a))
      .filter(a => typeof a === 'number' && a === a);
  }

}