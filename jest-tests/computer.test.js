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

it('Only makes attack choices that have not been guessed yet', () => {
  // How to test this? makeChoice should return x, y coords.
  // Need to check if it's valid?
  // Compare the result against the public attackResults
  populateResultsExceptOneOne(computer.attackResults);
  const attempt = computer.makeChoice();
  expect(attempt.x).toBe(1);
  expect(attempt.y).toBe(1);
  expect(computer.attackResults[1][1]).toEqual(undefined);
  expect(computer.attackResults[2][1]).toBe('miss');
  expect(computer.attackResults[2][2]).toBe('miss');

  function populateResultsExceptOneOne(resultsArr) {
    for (let i = 0; i < resultsArr.length; i++) {
      for (let j = 0; j < resultsArr.length; j++) {
        resultsArr[i][j] = 'miss';
      }
    }
    resultsArr[1][1] = undefined;
  }
});
