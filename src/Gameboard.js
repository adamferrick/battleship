const Ship = require('./Ship');
const { xyToIdx, idxToXy } = require('./coords');

const _Square = () => {
  return { ship: null, receivedAttack: false };
}

// shuffles an array in place.
function _shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const Gameboard = (size = 10) => {
  const _ships = [];
  const board = new Array(size * size).fill().map(e => _Square());

  function validShipPlace(length, x, y, vertical = true) {
    if ((vertical ? y : x) + length > size) {
      // the ship spills off the board
      return false;
    }
    for (let offset = 0; offset < length; offset++) {
      const idx = xyToIdx(
        !vertical ? x + offset : x,
        vertical ? y + offset : y,
        size,
      );
      if (board[idx].ship !== null) {
        return false;
      }
    }
    return true;
  }

  function placeShip(length, x, y, vertical = true) {
    if (!validShipPlace(length, x, y, vertical)) {
      throw new Error(`length: ${length}, x: ${x}, y: ${y}, vertical: ${vertical} is an invalid ship location`);
    }
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

  // 'lengths' is an array of numbers, representing the lengths of individual ships in the fleet.
  function placeRandomFleet(lengths) {
    let candidates = new Array(size * size).fill().map((e, i) => i);
    _shuffle(candidates);
    lengths.forEach(e => {
      const vertical = Math.random() < 0.5;
      for (let i = 0; i < candidates.length; i++) {
        const xy = idxToXy(candidates[i], size);
        if (validShipPlace(e, xy.x, xy.y, vertical)) {
          placeShip(e, xy.x, xy.y, vertical);
          break;
        } else if (validShipPlace(e, xy.x, xy.y, !vertical)) {
          placeShip(e, xy.x, xy.y, !vertical);
          break;
        }
      }
    });
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

  return { board, validShipPlace, placeShip, placeRandomFleet, receiveAttack, allShipsSunk };
}

module.exports = Gameboard;
