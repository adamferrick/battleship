const { Player, AiPlayer } = require('../src/Player');

test('a player should attack its opponent\'s board', () => {
  const grid = { receiveAttack: jest.fn() };
  const player = Player(grid);
  player.attackSquare(0, 0);
  expect(grid.receiveAttack.mock.calls).toHaveLength(1);
  expect(grid.receiveAttack.mock.calls[0][0]).toBe(0);
  expect(grid.receiveAttack.mock.calls[0][1]).toBe(0);
});

function hasDuplicates(arr) {
  const set = new Set();
  arr
    .map(e => JSON.stringify(e))
    .forEach(e => set.add(e));
  return set.size !== arr.length;
}

test('an AI player should never attack the same square twice', () => {
  const grid = { receiveAttack: jest.fn() };
  const aiPlayer = AiPlayer(grid, 2);
  for (let i = 0; i < 4; i++) {
    aiPlayer.attack();
  }
  expect(grid.receiveAttack.mock.calls).toHaveLength(4);
  expect(hasDuplicates(grid.receiveAttack.mock.calls)).toBe(false);
});

test('continuing to attack an entirely attacked board should be an error', () => {
  const grid = { receiveAttack: jest.fn() };
  const aiPlayer = AiPlayer(grid, 1);
  aiPlayer.attack();
  expect(aiPlayer.attack).toThrow(Error);
});
