const { xyToIdx, idxToXy } = require('./coords');

const Player = (opponentGrid) => {
  function attackSquare(x, y) {
    opponentGrid.receiveAttack(x, y);
  }

  return { attackSquare };
}

const AiPlayer = (opponentGrid, size = 10) => {
  const _player = Player(opponentGrid);
  const _unAttacked = new Array(size * size).fill().map((e, i) => i);

  function attack() {
    if (_unAttacked.length === 0) {
      throw new Error('There are no squares left to attack');
    }
    const randomSelection = Math.floor(Math.random() * _unAttacked.length);
    const xy = idxToXy(_unAttacked[randomSelection], size);
    _player.attackSquare(xy.x, xy.y);
    _unAttacked.splice(randomSelection, 1);
  }

  return { attack };
}

module.exports = { Player, AiPlayer };
