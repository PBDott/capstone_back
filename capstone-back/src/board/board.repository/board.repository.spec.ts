import { BoardRepository } from './board.repository';

describe('BoardRepository', () => {
  it('should be defined', () => {
    expect(new BoardRepository()).toBeDefined();
  });
});
