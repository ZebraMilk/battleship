// import ship from '../src/ship';
const shipStuff = require('../src/ship');
const ship = shipStuff;

it('Has a length', () => {
  expect(ship(3).length).toBe(3);
});

it('Has a length that corresponds to argument value', () => {
  expect(ship(5).length).toBe(5);
  expect(ship(7).length).toBe(7);
});

it('Throws an error if invalid ship length', () => {
  expect(() => ship(-1)).toThrow();
  expect(() => ship(0)).toThrow();
  expect(() => ship('A')).toThrow();
});

// counter is initialized to 0 whenever a ship is made
it('Has a hit count', () => {
  expect(ship(5).hitCount).toBe(0);
  expect(ship(7).hitCount).toBe(0);
});

it('Is sunk or not', () => {
  expect(ship(3).isSunk).toBe(false);
});

const newShip = ship(3);
it('Can get hit', () => {
  expect(newShip.hit()).toBe(1);
  expect(newShip.hit()).toBe(2);
  expect(newShip.hit()).toBe(3);
});

it('Can only get hit until it is sunk', () => {
  expect(newShip.hit()).toBe(3);
  expect(newShip.checkIfSunk()).toBe(true);
  expect(newShip.hit()).toBe(3);
});

it('Can be sunk', () => {
  expect(newShip.checkIfSunk()).toBe(true);
  newShip.checkIfSunk();
  expect(newShip.isSunk).toBe(true);
});
