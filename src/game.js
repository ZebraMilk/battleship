const NewPlayer = require('./player');
const computerPlayer = require('./computer');

function Game() {
  function newGame() {
    return 'Game started!';
  }

  const playerOne = NewPlayer();
  const playerTwo = computerPlayer;

  return {
    newGame,
    playerOne,
    playerTwo,
  };
}

module.exports = Game;
