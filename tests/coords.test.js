const { xyToIdx, idxToXy } = require('../src/coords');

test('test a few coordinate pairs', () => {
  expect(xyToIdx(0, 0, 2)).toBe(0);
  expect(xyToIdx(1, 1, 2)).toBe(3);
  expect(xyToIdx(0, 0, 1)).toBe(0);
});

test('x or y out of bounds should be an error', () => {
  expect(() => xyToIdx(2, 0, 2)).toThrow(Error);
  expect(() => xyToIdx(0, 2, 2)).toThrow(Error);
  expect(() => xyToIdx(-1, 0, 2)).toThrow(Error);
  expect(() => xyToIdx(0, -1, 2)).toThrow(Error);
});

test('test a few indexes', () => {
  expect(idxToXy(0, 2)).toEqual({ x: 0, y: 0 });
  expect(idxToXy(3, 2)).toEqual({ x: 1, y: 1 });
  expect(idxToXy(0, 1)).toEqual({ x: 0, y: 0 });
});

test('idx out of bounds should be an error', () => {
  expect(() => idxToXy(4, 2)).toThrow(Error);
  expect(() => idxToXy(-1, 2)).toThrow(Error);
});
