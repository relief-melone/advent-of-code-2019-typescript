import IntCodeComputer from '../shared/intComputer/IntComputer';
import Input, { NumberList } from '../shared/new/input';
import { Coordinates, Coordinate } from '../shared/new/grid';
import keypress from 'keypress';

const keyInputMaps = {
  up: 0,
  left: -1,
  right: 1
};
const keyStringMap = {
  0: ' ',
  1: '|',
  2: '\u2588',
  3: '-',
  4: 'B'
};

export const getProgramFromInputData = (FilenameOrRawData: string, isRawData = false): NumberList =>{
  const rawInput = new Input(FilenameOrRawData, isRawData);
  return rawInput.byCommas().toNumberList();
};

export const runStep = (program: NumberList, input: number, printEveryOutput = false): {
  arcade: IntCodeComputer; 
  coords: Coordinates;
  score: number;
} => {
  console.clear();
  const arcade = new IntCodeComputer(program.items);
  const coords = new Coordinates();
  let score = 0;
  let ballCoord: Coordinate = new Coordinate();
  let paddleCoord: Coordinate = new Coordinate();
  arcade.addInput(input);
  while(arcade.status !== 'finished'){
    arcade.executeUntilOutput(3);
    const output = arcade.spliceOutputs(3);
    const x = output[0];
    const y = output[1];
    let tileId;
    if(x === -1 && y === 0){
      score = score > output[2] ? score : output[2];
    } 
    else {
      tileId = output[2];
      coords.add(x,y,tileId);

      if(tileId === 4) ballCoord = new Coordinate(x,y,true);
      if(tileId === 3) paddleCoord = new Coordinate(x,y,true);
    }  
  }
  coords.printMappedGrid({
    stringMap: keyStringMap,
    transposed: true
  });
  console.log(`Score: ${score} 
Blocks Left:        (${coords.countValues(2)})
Ball Coordinates:   (${ballCoord.x},${ballCoord.y})
Paddle Coordinates: (${paddleCoord.x},${paddleCoord.y})
`); 
  return { 
    arcade,
    coords,
    score
  };
};

export const runProgramAndReturnBlockTileCount = async (program: NumberList): Promise<number> => {
  program.items[0] = 2;     
  const stdin: any = process.stdin;
  keypress(stdin);
  stdin.setRawMode(true);
  stdin.resume();

  let blocksLeft = Infinity;
  let _score = 0;
  
  console.log(`
  ${'-'.repeat(10)}CONTROLS${'-'.repeat(10)}
  UP     - DO NOTHING
  LEFT   - MOVE PADDLE LEFT
  RIGHT  - MOVE PADDLE RIGHT
  ESC    - QUIT GAME

  Press any key to start...
`);
  while(blocksLeft !== 0){
    const key = await waitForKeyPress(stdin);
    const input = keyInputMaps[key];
    const { arcade, coords, score } = runStep(program, input);    
    _score = score;
    program = new NumberList(arcade.program);     
    blocksLeft = coords.countValues(2);
  }
  return _score;  
};

export const waitForKeyPress = (stdin: any): Promise<any> => {
  return new Promise( (resolve) => {
    
    
    
    // listen for the "keypress" event
    stdin.once('keypress', function (ch, key) {
      if(key.name === 'escape') process.exit();
      resolve(key.name);
    });
  });
};