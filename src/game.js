const NewPlayer = require('./player');
const NewComputerPlayer = require('./computer');

// This is the 'publicly available' stuff
// side effects that are observable here are testable

function Game() {
  function newGame() {
    return 'Game started!';
  }

  const playerOne = NewPlayer();
  const playerTwo = NewComputerPlayer();

  let currentPlayer = playerOne;

  function switchTurns() {
    if (this.currentPlayer === this.playerOne) {
      return (this.currentPlayer = this.playerTwo);
    } else {
      return (this.currentPlayer = this.playerOne);
    }
  }

  function makeAttack(attacker, target, x, y) {
    const result = target.takeAttack(x, y);
    attacker.attackResults[x][y] = result;
    return result;
  }

  return {
    newGame,
    playerOne,
    playerTwo,
    currentPlayer,
    switchTurns,
    makeAttack,
  };
}

module.exports = Game;
