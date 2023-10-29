const Ui = require('./Ui');
const Gameboard = require('./Gameboard');
const { Player, AiPlayer } = require('./Player');

const Game = (size = 10) => {
  const _player1Gameboard = Gameboard(size);
  _player1Gameboard.placeShip(1, 0, 0);
  const _player2Gameboard = Gameboard(size);
  _player2Gameboard.placeShip(1, 0, 0);

  const _player1 = Player(_player2Gameboard);
  const _player2 = AiPlayer(_player1Gameboard);

  function update() {
    _ui.updateGrids(_player1Gameboard.board, _player2Gameboard.board);
  }

  function _attackSelected(x, y) {
    _player1.attackSquare(x, y);
    update();
    _player2.attack();
    update();
  }

  const _ui = Ui('#player1 .grid', '#player2 .grid', _attackSelected, size);
  update();

  return { update };
}

module.exports = Game;