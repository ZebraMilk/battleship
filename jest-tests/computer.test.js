const computer = require('../src/computer');

it('Does not attack a previously attacked square', () => {
  computer.updateAttackResults(1, 1, 'hit');
  expect(computer.canAttack(1, 1)).toBe(false);
});

it('Chooses a coordinate at random between 0 and 9', () => {
  expect(computer.randomAttack().x).toBeLessThan(10);
  expect(computer.randomAttack().x).toBeGreaterThanOrEqual(0);
  expect(computer.randomAttack().y).toBeLessThan(10);
  expect(computer.randomAttack().y).toBeGreaterThanOrEqual(0);
});

it('Select only attack choices that have not been guessed yet', () => {
  // How to test this? makeChoice should return x, y coords.
  // Need to check if it's valid?
  // Compare the result against the public attackResults
  const attempt = computer.makeChoice();
  const x = attempt.x;
  const y = attempt.y;
  expect(computer.attackResults[x][y]).toBe(undefined);
});
