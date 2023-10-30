const { xyToIdx, idxToXy } = require('./coords');

function _square(attackCb) {
  const square = document.createElement('div');
  square.classList = 'square unrevealed';
  square.appendChild(document.createElement('div'));
  square.appendChild(document.createElement('div'));
  if (attackCb !== undefined) {
    square.onclick = attackCb;
  }
  return square;
}

/*
* 'player1Sel' and 'player2Sel' are selector strings for each player's grid.
* 'attack' is a callback that takes x,y coordinates for the square on player 2's board that player 1 is attacking.
*/
const Ui = (player1Sel, player2Sel, victoryMessageSel, attack, boardSize = 10) => {
  const _player1Grid = document.querySelector(player1Sel);
  const _player2Grid = document.querySelector(player2Sel);
  const _victoryMessageBox = document.querySelector(victoryMessageSel);

  for (let i = 0; i < boardSize * boardSize; i++) {
    const player1Square = _square();
    const player2Square = _square(() => {
      // player 1 has attacked this square
      const coords = idxToXy(i);
      attack(coords.x, coords.y);
    });
    _player1Grid.appendChild(player1Square);
    _player2Grid.appendChild(player2Square);
  }

  function updateGrids(player1Board, player2Board) {
    _updateGrid(_player2Grid, player2Board, boardSize);
    _updateGrid(_player1Grid, player1Board, boardSize, reveal = true);
  }

  function player1Victory(message) {
    _victoryMessageBox.textContent = message;
  }

  function player2Victory(message) {
    _victoryMessageBox.textContent = message;
  }

  return { updateGrids, player1Victory, player2Victory };
}

function _updateGrid(grid, board, boardSize = 10, reveal = false) {
  for (let i = 0; i < boardSize * boardSize; i++) {
    if (board[i].receivedAttack) {
      grid.children[i].classList.remove('unrevealed');
      grid.children[i].classList.remove('has-own-ship');
      if (board[i].ship !== null) {
        grid.children[i].classList.add('hit');
      } else {
        grid.children[i].classList.add('miss');
      }
    } else if (reveal && board[i].ship !== null) {
      grid.children[i].classList.add('has-own-ship');
    }
  }
}

module.exports = Ui;
