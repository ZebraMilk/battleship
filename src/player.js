const boardStuff = require('../src/board');
const BOARDSIZE = boardStuff.BOARDSIZE;
const NewBoard = boardStuff.GameBoard;

function Player() {
  const playerBoard = NewBoard();

  const attacks = Array(BOARDSIZE);
  for (let i = 0; i < BOARDSIZE; i++) {
    attacks[i] = Array(BOARDSIZE);
  }

  function takeAttack(x, y) {
    return playerBoard.receiveAttack(x, y);
  }

  function makeAttack(x, y) {
    // this is actually going to be the return value
    // from the receiveAttack function of the enemy board?
    attacks[x][y] = 'Attack made';
  }

  return {
    playerBoard,
    attacks,
    takeAttack,
    makeAttack,
  };
}

module.exports = Player;
