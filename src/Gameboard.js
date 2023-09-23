const Ship = require('./Ship');

const _Square = () => {
  return { ship: null, receivedAttack: false };
}

const Gameboard = (size) => {
  const _ships = [];
  const _board = new Array(size * size).fill().map(e => _Square());

  function _xyToIdx(x, y) {
    return y * size + x;
  }

  function placeShip(length, x, y, vertical = true) {
    const ship = Ship(length)
    _ships.push(ship);
    for (let offset = 0; offset < length; offset++) {
      const idx = _xyToIdx(
        !vertical ? x + offset : x,
        vertical ? y + offset : y,
      );
      _board[idx].ship = ship;
    }
  }

  function receiveAttack(x, y) {
    const idx = _xyToIdx(x, y)
    if (_board[idx].ship !== null && !_board[idx].receivedAttack) {
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
