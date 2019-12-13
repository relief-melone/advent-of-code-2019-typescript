import IntCodeComputer from '../shared/intComputer/IntComputer';
import Input, { NumberList } from '../shared/new/input';
import { Coordinates } from '../shared/new/grid';

export const getProgramFromInputData = (FilenameOrRawData: string, isRawData = false): NumberList =>{
  const rawInput = new Input(FilenameOrRawData, isRawData);
  return rawInput.byCommas().toNumberList();
};

export const runProgramAndReturnBlockTileCount = (program: NumberList): number => {
  const arcade = new IntCodeComputer(program.items);
  const coords = new Coordinates();

  while(arcade.status !== 'finished'){
    arcade.executeUntilOutput(3);
    const output = arcade.spliceOutputs(3);
    const x = output[0];
    const y = output[1];
    const tileId = output[2];

    coords.add(x,y,tileId);    
  }
  return coords.countValues(2);
};