const Gameboard = require('../src/Gameboard');

test('an empty board should have all ships sunk', () => {
  const board = Gameboard(1);
  expect(board.allShipsSunk()).toBe(true);
});

test('a board with no received attacks should not have all ships sunk', () => {
  const board = Gameboard(1);
  board.placeShip(1, 0, 0);
  expect(board.allShipsSunk()).toBe(false);
});

test('a board with its only ship sunk should have all ships sunk', () => {
  const board = Gameboard(1);
  board.placeShip(1, 0, 0);
  board.receiveAttack(0, 0);
  expect(board.allShipsSunk()).toBe(true);
});

test('a board with one of two ships sunk should not have all ships sunk', () => {
  const board = Gameboard(2);
  board.placeShip(1, 0, 0);
  board.placeShip(1, 1, 1);
  board.receiveAttack(0, 0);
  expect(board.allShipsSunk()).toBe(false);
});

test('a board with two of two ships sunk should have all ships sunk', () => {
  const board = Gameboard(2);
  board.placeShip(1, 0, 0);
  board.placeShip(1, 1, 1);
  board.receiveAttack(0, 0);
  board.receiveAttack(1, 1);
  expect(board.allShipsSunk()).toBe(true);
});

test('error if a square receives more than one attack', () => {
  const board = Gameboard(1);
  board.receiveAttack(0, 0);
  expect(() => board.receiveAttack(0, 0)).toThrow(Error);
});
