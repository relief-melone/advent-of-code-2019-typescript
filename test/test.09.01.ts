import { expect } from 'chai';
import { solveInput } from '../src/09.01/exec';


const test = (program, expected): void => {
  it('will match the expected',done=> {    
    setTimeout(() => {
      expect(solveInput(
        program,
      )).to.deep.equal(expected);  
      done();
    },200);
    
    
  });
};

describe.only('Day 9 - First Puzzle',  () => {
  test([109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99], [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99]);

  // it('will match the expected', ()=> {    
  //   const result = solveInput([1102,34915192,34915192,7,4,7,99,0]);
  //   expect(result.length).to.equal(16);  
  // });

  
  // test([104,1125899906842624,99],[1125899906842624]);
  
});