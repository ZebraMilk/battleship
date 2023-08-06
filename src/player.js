const boardStuff = require('../src/board');
const BOARDSIZE = boardStuff.BOARDSIZE;
const NewBoard = boardStuff.GameBoard;

function Player() {
  const playerBoard = NewBoard();
  const allShipsSunk = playerBoard.allShipsSunk;

  const attackResults = Array(BOARDSIZE);
  for (let i = 0; i < BOARDSIZE; i++) {
    attackResults[i] = Array(BOARDSIZE);
  }

  function takeAttack(x, y) {
    return playerBoard.receiveAttack(x, y);
  }

  function updateAttackResults(x, y, result) {
    return (attackResults[x][y] = result);
  }

  function canAttack(x, y) {
    if (this.attackResults[x][y] === undefined) {
      return true;
    } else {
      return false;
    }
  }

  return {
    playerBoard,
    attackResults,
    updateAttackResults,
    canAttack,
    takeAttack,
    allShipsSunk,
  };
}

module.exports = Player;
