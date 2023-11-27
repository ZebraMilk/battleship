const game = require('../src/game');

it('Starts a game', () => {
  const testGame = game();
  expect(testGame.newGame()).toBe('Game started!');
});

it('Starts a game with two players', () => {
  const testGame = game();
  expect(testGame.playerOne).not.toBe(undefined);
  expect(testGame.playerTwo).not.toBe(undefined);
});

it('Updates and tracks the current player', () => {
  const testGame = game();
  expect(testGame.currentPlayer).toEqual(testGame.playerOne);
  testGame.switchTurns();
  expect(testGame.currentPlayer).toEqual(testGame.playerTwo);
  testGame.switchTurns();
  testGame.switchTurns();
  testGame.switchTurns();
  expect(testGame.currentPlayer).toEqual(testGame.playerOne);
});

describe('The game loop controller', () => {
  it("Gets the result of an attack on a player's board", () => {
    const testGame = game();
    const one = testGame.playerOne;
    const two = testGame.playerTwo;
    one.playerBoard.placeShip(1, 1, 'carrier', 'E');
    one.playerBoard.placeShip(1, 2, 'battleship', 'E');
    two.playerBoard.placeShip(1, 1, 'carrier', 'E');
    two.playerBoard.placeShip(1, 2, 'battleship', 'E');
    expect(testGame.makeAttack(one, two, 1, 1)).toBe('hit');
    expect(testGame.makeAttack(one, two, 2, 1)).toBe('hit');
    expect(testGame.makeAttack(one, two, 3, 1)).toBe('hit');
    expect(testGame.makeAttack(one, two, 4, 1)).toBe('hit');
    expect(testGame.makeAttack(one, two, 5, 1)).toBe('sunk');
    expect(testGame.makeAttack(one, two, 2, 3)).toBe('miss');
  });

  it("Logs the result of an attack in the attacker's result", () => {
    const testGame = game();
    const one = testGame.playerOne;
    const two = testGame.playerTwo;
    one.playerBoard.placeShip(1, 1, 'carrier', 'E');
    one.playerBoard.placeShip(1, 2, 'battleship', 'E');
    two.playerBoard.placeShip(1, 1, 'carrier', 'E');
    two.playerBoard.placeShip(1, 2, 'battleship', 'E');
    testGame.makeAttack(one, two, 0, 1);
    testGame.makeAttack(one, two, 1, 1);
    testGame.makeAttack(one, two, 2, 1);
    testGame.makeAttack(one, two, 3, 1);
    testGame.makeAttack(one, two, 4, 1);
    testGame.makeAttack(one, two, 5, 1);
    expect(one.attackResults[0][1]).toBe('miss');
    expect(one.attackResults[1][1]).toBe('hit');
    expect(one.attackResults[2][1]).toBe('hit');
    expect(one.attackResults[3][1]).toBe('hit');
    expect(one.attackResults[4][1]).toBe('hit');
    expect(one.attackResults[5][1]).toBe('sunk');
  });
});

// This really belongs in the UI module
// describe('The turn function', () => {
//   it('Requests input from a player', () => {
//     const testGame = game();
//     const one = testGame.playerOne;
//     const two = testGame.playerTwo;
//     one.playerBoard.placeShip(1, 1, 'carrier', 'E');
//     one.playerBoard.placeShip(1, 2, 'battleship', 'E');
//     two.playerBoard.placeShip(1, 1, 'carrier', 'E');
//     two.playerBoard.placeShip(1, 2, 'battleship', 'E');
//   });
// });
