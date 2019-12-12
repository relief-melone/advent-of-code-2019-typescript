import { expect } from 'chai';
import { PaintRobot } from '../src/11.01/exec';

const testMoveRobot = (MoveInput,CurrentPositon, CurrentDirection, expectedPositon, expectedDirection): void => {
  it('will correctly calculate the movement', () => {
    const robot = new PaintRobot([]);
    robot.currentPosition = CurrentPositon;
    robot.currentDirection = CurrentDirection;
    robot.turnAndMove(MoveInput);

    expect(robot.currentPosition).to.deep.equal(expectedPositon);
    expect(robot.currentDirection).to.deep.equal(expectedDirection);
  });
};


describe('Day 11 - First Puzzle', () => {
  testMoveRobot(0,[0,0],[0,1],[-1,0],[-1,0]);
  testMoveRobot(1,[0,0],[0,1],[1,0],[1,0]);
  testMoveRobot(0,[0,0],[1,0],[0,1],[0,1]);
  testMoveRobot(1,[0,0],[1,0],[0,-1],[0,-1]);
});