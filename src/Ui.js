function _square() {
  const square = document.createElement('div');
  square.classList = 'square unknown';
  square.appendChild(document.createElement('div'));
  square.appendChild(document.createElement('div'));
  return square;
}

const Ui = (player1GridSel, player2GridSel, boardSize = 10) => {
  const player1Grid = document.querySelector(player1GridSel);
  const player2Grid = document.querySelector(player2GridSel);

  for (let i = 0; i < boardSize * boardSize; i++) {
    const player1Square = _square();
    const player2Square = _square();
    player1Grid.appendChild(player1Square);
    player2Grid.appendChild(player2Square);
  }

  function updateGrids(player1, player2) {
    // TODO
  }

  return { updateGrids };
}

module.exports = Ui;
