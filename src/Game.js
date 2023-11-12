const Ui = require('./Ui');
const Gameboard = require('./Gameboard');
const { Player, AiPlayer } = require('./Player');

const Game = (size = 10, shipLengths = [5, 4, 3, 3, 2]) => {
  const _player1Gameboard = Gameboard(size);
  _player1Gameboard.placeRandomFleet(shipLengths);
  const _player2Gameboard = Gameboard(size);
  _player2Gameboard.placeRandomFleet(shipLengths);

  const _player1 = Player(_player2Gameboard);
  const _player2 = AiPlayer(_player1Gameboard);

  const _player1VictoryClass = 'player1-message victory';
  const _player2VictoryClass = 'player2-message victory';

  let _placing = 0;
  let _placingVertical = false;
  let _gameOver = false;

  function update() {
    _ui.updateGrids(_player1Gameboard.board, _player2Gameboard.board);
    if (_player2Gameboard.allShipsSunk()) {
      _gameOver = true;
      console.log('Player 1 wins!');
      _ui.print('Player 1 wins!', _player1VictoryClass);
    } else if (_player1Gameboard.allShipsSunk()) {
      _gameOver = true;
      console.log('Player 2 wins!');
      _ui.print('Player 2 wins!', _player2VictoryClass);
    }
  }

  function _attackSelected(x, y) {
    if (!_gameOver) {
      _player1.attackSquare(x, y);
      update();
    }
    if (!_gameOver) {
      _player2.attack();
      update();
    }
  }

  function _previewSelected(x, y) {
    if (_placing >= shipLengths.length) {
      return;
    }
    update();
    _ui.previewShip(
      shipLengths[_placing],
      x,
      y,
      _placingVertical,
      _player1Gameboard.validShipPlace(shipLengths[_placing], x, y, _placingVertical) ? 'square unrevealed has-own-ship' : 'square hit',
    );
  }

  const _ui = Ui('#player1 .grid', '#player2 .grid', '#message-box', _attackSelected, _previewSelected, size);
  update();

  return { update };
}

module.exports = Game;
