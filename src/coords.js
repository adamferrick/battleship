function xyToIdx(x, y, size = 10) {
  if (x >= size || y >= size || x < 0 || y < 0) {
    throw new Error(`x: ${x}, y: ${y}, size: ${size} is out of bounds`);
  }
  return y * size + x;
}

function idxToXy(idx, size = 10) {
  if (idx >= size * size || idx < 0) {
    throw new Error(`idx: ${idx}, size: ${size} is out of bounds`);
  }
  return { x: idx % size, y: Math.floor(idx / size) };
}

module.exports = { xyToIdx, idxToXy };
