const Ship = (length) => {
  let _numHits = 0;

  function hit() {
    _numHits++;
  }

  function isSunk() {
    return _numHits >= length;
  }

  return { hit, isSunk };
}

module.exports = Ship;
