import './style.css';
import Ui from './Ui.js';

const ui = Ui('#player1 .grid', '#player2 .grid');

document.querySelectorAll('.square').forEach(e => {
  e.onclick = () => {
    e.classList.remove('unknown');
    if (Math.random() > 0.5) {
      e.classList.add('hit');
    } else {
      e.classList.add('miss');
    }
  }
});
