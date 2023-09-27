const Ship = require('./Ship');
const { xyToIdx } = require('./coords');

const _Square = () => {
  return { ship: null, receivedAttack: false };
}

const Gameboard = (size = 10) => {
  const _ships = [];
  const _board = new Array(size * size).fill().map(e => _Square());

  function placeShip(length, x, y, vertical = true) {
    const ship = Ship(length)
    _ships.push(ship);
    for (let offset = 0; offset < length; offset++) {
      const idx = xyToIdx(
        !vertical ? x + offset : x,
        vertical ? y + offset : y,
        size,
      );
      _board[idx].ship = ship;
    }
  }

  function receiveAttack(x, y) {
    const idx = xyToIdx(x, y, size)
    if (_board[idx].receivedAttack) {
      throw new Error(`${x}, ${y} has already been attacked`);
    } else if (_board[idx].ship !== null) {
      _board[idx].ship.hit();
    }
    _board[idx].receivedAttack = true;
  }

  function allShipsSunk() {
    return _ships.every(e => e.isSunk());
  }

  return { placeShip, receiveAttack, allShipsSunk };
}

module.exports = Gameboard;
