const Ship = require('./Ship');
const { xyToIdx } = require('./coords');

const _Square = () => {
  return { ship: null, receivedAttack: false };
}

const Gameboard = (size = 10) => {
  const _ships = [];
  const board = new Array(size * size).fill().map(e => _Square());

  function placeShip(length, x, y, vertical = true) {
    const ship = Ship(length)
    _ships.push(ship);
    for (let offset = 0; offset < length; offset++) {
      const idx = xyToIdx(
        !vertical ? x + offset : x,
        vertical ? y + offset : y,
        size,
      );
      board[idx].ship = ship;
    }
  }

  function receiveAttack(x, y) {
    const idx = xyToIdx(x, y, size)
    if (board[idx].receivedAttack) {
      throw new Error(`${x}, ${y} has already been attacked`);
    } else if (board[idx].ship !== null) {
      board[idx].ship.hit();
    }
    board[idx].receivedAttack = true;
  }

  function allShipsSunk() {
    return _ships.every(e => e.isSunk());
  }

  return { board, placeShip, receiveAttack, allShipsSunk };
}

module.exports = Gameboard;
