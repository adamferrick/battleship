const Ship = require('../src/Ship');

test('a ship with no length should be sunk', () => {
  const ship = Ship(0);
  expect(ship.isSunk()).toBe(true);
});

test('an undamaged ship should not be sunk', () => {
  const ship = Ship(1);
  expect(ship.isSunk()).toBe(false);
});

test('a partially damaged ship should not be sunk', () => {
  const ship = Ship(2);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});

test('a completely damaged ship should be sunk', () => {
  const ship = Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('a ship damaged past the point of sinking should still be sunk', () => {
  const ship = Ship(2);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
