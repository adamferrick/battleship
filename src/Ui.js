const { xyToIdx, idxToXy } = require('./coords');

function _square(cbs) {
  const square = document.createElement('div');
  square.classList = 'square unrevealed';
  square.appendChild(document.createElement('div'));
  square.appendChild(document.createElement('div'));
  if (cbs.click !== undefined) {
    square.onclick = cbs.click;
  }
  if (cbs.hover !== undefined) {
    square.onmouseenter = cbs.hover;
  }
  if (cbs.leave !== undefined) {
    square.onmouseleave = cbs.leave;
  }
  return square;
}

/*
* 'player1Sel' and 'player2Sel' are selector strings for each player's grid.
* 'attack' is a callback that takes x,y coordinates for the square on player 2's board that player 1 is attacking.
*/
const Ui = (player1Sel, player2Sel, messageBoxSel, switchOrientationSel, switchOrientation, attack, preview, erasePreview, place, boardSize = 10) => {
  const _player1Grid = document.querySelector(player1Sel);
  const _player2Grid = document.querySelector(player2Sel);
  const _messageBox = document.querySelector(messageBoxSel);
  const _switchOrientation = document.querySelector(switchOrientationSel);

  _switchOrientation.onclick = switchOrientation;

  for (let i = 0; i < boardSize * boardSize; i++) {
    const coords = idxToXy(i);
    const player1Square = _square({
      click: () => place(coords.x, coords.y),
      hover: () => preview(coords.x, coords.y),
      leave: () => erasePreview(),
    });
    const player2Square = _square({ click: () => attack(coords.x, coords.y)});
    _player1Grid.appendChild(player1Square);
    _player2Grid.appendChild(player2Square);
  }

  function updateGrids(player1Board, player2Board) {
    _updateGrid(_player2Grid, player2Board, boardSize);
    _updateGrid(_player1Grid, player1Board, boardSize, reveal = true);
  }

  function print(message, classes = '') {
    _messageBox.textContent = message;
    _messageBox.className = classes;
  }

  // applies classes to applicable squares on player 1's board.
  function previewShip(length, x, y, isVertical, classes) {
    let maxOffset = Math.min(length, boardSize - (isVertical ? y : x));
    for (let offset = 0; offset < maxOffset; offset++) {
      const idx = xyToIdx(
        isVertical ? x : x + offset,
        isVertical ? y + offset : y,
        boardSize,
      );
      _player1Grid.children[idx].className = classes;
    }
  }

  return { updateGrids, print, previewShip };
}

function _updateGrid(grid, board, boardSize = 10, reveal = false) {
  for (let i = 0; i < boardSize * boardSize; i++) {
    grid.children[i].className = 'square';
    if (board[i].receivedAttack) {
      if (board[i].ship !== null) {
        grid.children[i].classList.add('hit');
      } else {
        grid.children[i].classList.add('miss');
      }
    } else if (reveal && board[i].ship !== null) {
      grid.children[i].classList.add('unrevealed', 'has-own-ship');
    } else {
      grid.children[i].classList.add('unrevealed');
    }
  }
}

module.exports = Ui;
