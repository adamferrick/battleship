const { xyToIdx, idxToXy } = require('./coords');

function _square(attackCb) {
  const square = document.createElement('div');
  square.classList = 'square unknown';
  square.appendChild(document.createElement('div'));
  square.appendChild(document.createElement('div'));
  if (attackCb !== undefined) {
    square.onclick = attackCb;
  }
  return square;
}

/*
* player1 and player2 are objects with fields 'sel' and 'board', and 'actor'.
* 'sel' is a selector for the player's own grid.
* 'board' is the 'board' field for the player's Gameboard object.
* 'actor' is the Player object associated with that player
*/
const ui = (player1, player2, boardSize = 10) => {
  const player1Grid = document.querySelector(player1.sel);
  const player2Grid = document.querySelector(player2.sel);

  for (let i = 0; i < boardSize * boardSize; i++) {
    const player1Square = _square();
    const player2Square = _square(() => {
      // player 1 has attacked this square
      const coords = idxToXy(i);
      player1.actor.attackSquare(coords.x, coords.y);
      _updateGrid(player2Grid, player2.board, boardSize);
      // TODO: check if player 2 is sunk
      // player 2 should retaliate
      player2.actor.attack();
      _updateGrid(player1Grid, player1.board, boardSize);
      // TODO: check if player 1 is sunk
    });
    player1Grid.appendChild(player1Square);
    player2Grid.appendChild(player2Square);
  }
}

function _updateGrid(grid, board, boardSize = 10) {
  for (let i = 0; i < boardSize * boardSize; i++) {
    if (board[i].receivedAttack) {
      grid.children[i].classList.remove('unknown');
      if (board[i].ship !== null) {
        grid.children[i].classList.add('hit');
      } else {
        grid.children[i].classList.add('miss');
      }
    }
  }
}

module.exports = ui;
