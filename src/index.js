import './style.css';
import ui from './Ui.js';
import Gameboard from './Gameboard';
import { Player, AiPlayer } from './Player';

const player1Gameboard = Gameboard();
player1Gameboard.placeShip(1, 0, 0);
const player2Gameboard = Gameboard();
player2Gameboard.placeShip(1, 0, 0);

player1 = Player(player2Gameboard);
player2 = AiPlayer(player1Gameboard);

ui(
  { sel: '#player1 .grid', board: player1Gameboard.board, actor: player1 },
  { sel: '#player2 .grid', board: player2Gameboard.board, actor: player2 },
);
