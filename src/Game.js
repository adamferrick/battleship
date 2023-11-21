const Ui = require('./Ui');
const Gameboard = require('./Gameboard');
const { Player, AiPlayer } = require('./Player');

const Game = (size = 10, shipLengths = [5, 4, 3, 3, 2]) => {
  const _player1Gameboard = Gameboard(size);
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
    _ui.print('');
    if (_placing < shipLengths.length) {
      _ui.print(`Place a ship of length ${shipLengths[_placing]}`);
    } else if (_player2Gameboard.allShipsSunk()) {
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
    if (_player1Gameboard.validShipPlace(shipLengths[_placing], x, y, _placingVertical)) {
      _ui.previewShip(shipLengths[_placing], x, y, _placingVertical, 'square unrevealed has-own-ship');
    }
  }

  function _placeShip(x, y) {
    if (_placing < shipLengths.length && _player1Gameboard.validShipPlace(shipLengths[_placing], x, y, _placingVertical)) {
      _player1Gameboard.placeShip(shipLengths[_placing++], x, y, _placingVertical);
      update();
    }
  }

  const _ui = Ui(
    '#player1 .grid',
    '#player2 .grid',
    '#message-box',
    '#rotate', 
    () => _placingVertical = !_placingVertical,
    _attackSelected,
    _previewSelected,
    update,
    _placeShip,
    size,
  );
  update();

  return { update };
}

module.exports = Game;
