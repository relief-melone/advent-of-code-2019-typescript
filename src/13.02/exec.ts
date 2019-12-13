import IntCodeComputer from '../shared/intComputer/IntComputer';
import Input, { NumberList } from '../shared/new/input';
import { Coordinates, Coordinate } from '../shared/new/grid';
import keypress from 'keypress';

const keyInputMaps = {
  up: 0,
  left: -1,
  right: 1
};

const allowedKeys = Object.keys(keyInputMaps);

const keyStringMap = {
  0: ' ',
  1: '\u258D',
  2: '\u2588',
  3: '\u2580',
  4: '\u26BD'
};

export const getProgramFromInputData = (FilenameOrRawData: string, isRawData = false): NumberList =>{
  const rawInput = new Input(FilenameOrRawData, isRawData);
  return rawInput.byCommas().toNumberList();
};

export const runStep = async (arcade: IntCodeComputer, printEveryOutput = false, timePerStep: number): Promise<{
  arcade: IntCodeComputer; 
  coords: Coordinates;
  score: number;
}> => {  
  const coords = new Coordinates();
  let score = 0;
  let ballCoord: Coordinate = new Coordinate();
  let paddleCoord: Coordinate = new Coordinate();
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
      const coord = coords.add(x,y,tileId);
      coords.printCoordinateMapped({
        stringMap: keyStringMap,        
      }, coord);

      if(tileId === 4){
        await processKeyInputs(arcade, timePerStep);
        ballCoord = new Coordinate(x,y,true);
      
        coords.printGrid({
          stringMap: keyStringMap,
        });
      } 
      if(tileId === 3) paddleCoord = new Coordinate(x,y,true);
    }  
  }
  if(!printEveryOutput){
    coords.printGrid({
      stringMap: keyStringMap,
      clearConsoleFirst: true,
      additionalText: `
      Score: ${score} 
      Blocks Left:        (${coords.countValues(2)})
      Ball Coordinates:   (${ballCoord.x},${ballCoord.y})
      Paddle Coordinates: (${paddleCoord.x},${paddleCoord.y})
      `
    });
  }

  return { 
    arcade,
    coords,
    score
  };
};

export const runProgramAndReturnBlockTileCount = async (program: NumberList, timePerStep = 50): Promise<number> => {
  console.clear();
  const stdin: any = process.stdin;
  keypress(stdin);
  stdin.setRawMode(true);
  stdin.resume();

  program.items[0] = 2;     
  const arcade = new IntCodeComputer(program.items);  
  
  let blocksLeft = Infinity;
  let _score = 0;
  let timesRun = 0;
  
  console.log(`
  ${'-'.repeat(10)}CONTROLS${'-'.repeat(10)}
  UP     - DO NOTHING
  LEFT   - MOVE PADDLE LEFT
  RIGHT  - MOVE PADDLE RIGHT
  ESC    - QUIT GAME

  Press any key to start...
`);
  while(blocksLeft !== 0){    
    const { coords, score } = await runStep(arcade, timesRun !== 0, timePerStep);    
    _score = score;
    arcade.resetProgram();
    // console.log('You missed! Try again? Push any key...');
    // await awaitSpace(stdin);
    blocksLeft = coords.countValues(2);
    timesRun++;
  }
  return _score;  
};

export const processKeyInputs = (arcade: IntCodeComputer, TimePerStep = 50): Promise<void> => {  

  return new Promise((resolve) => {
    const P1 = new Promise(resolve => {
      process.stdin.once('keypress', function (ch, key) {
        if(key.name === 'escape'){
          console.clear();
          process.exit();
        } 
        if(allowedKeys.indexOf(key.name)){
          resolve(keyInputMaps[key.name]);       
        }    
      });
    });

    const P2 = new Promise(resolve => {
      setTimeout(() => {
        process.stdin.removeAllListeners('keypress');
        resolve(0);
      }, TimePerStep);
    });
    
    Promise.race([P1,P2]).then(result => {
      arcade.addInput(result);
      resolve();
    });
  });
};