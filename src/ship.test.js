import ship from './ship';
// const ship = require('./ship');

it('Has a length', () => {
  expect(ship(3).length).toBe(3);
});

it('Has a length that corresponds to argument value', () => {
  expect(ship(5).length).toBe(5);
  expect(ship(7).length).toBe(7);
});
