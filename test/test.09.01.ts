import { expect } from 'chai';
import { solveInput } from '../src/09.01/exec';
import Input from '../src/shared/input';


const test = (input, expected): void => {
  it('will match the expected', ()=> {    
    expect(solveInput(new Input(input, true))).to.deep.equal(expected);  
    
  });
};

describe.only('Day 9 - First Puzzle', async () => {
  test('109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99', [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]);
  test('1102,34915192,34915192,7,4,7,99,0',[1234]);
  test('104,1125899906842624,99',[1125899906842624]);
  
  

  // it('correctly converts a layer into a grid', () => {
  //   expect(layerToGrid([1,2,3,4,5,6],3,2)).to.deep.equal([
  //     [1,2,3],
  //     [4,5,6]
  //   ]);
  // });
  
});