const computer = require('../src/computer');

it('Can make an attack on a board', () => {
  computer.makeAttack(1, 1);
  expect(computer.attacks[1][1]).toBe('Attack made');
});

it('Does not attack a previously attacked square', () => {
  computer.checkAttack(1, 1);
  expect(computer.checkAttack(1, 1)).toBe('Already attacked this square');
});

it('Chooses a coordinate at random between 0 and 9', () => {
  expect(computer.randomAttack().x).toBeLessThan(10);
  expect(computer.randomAttack().x).toBeGreaterThanOrEqual(0);
  expect(computer.randomAttack().y).toBeLessThan(10);
  expect(computer.randomAttack().y).toBeGreaterThanOrEqual(0);
});
