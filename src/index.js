import './style.css';

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
