// import ship from './ship';
const ship = require('../src/ship');

const shipTypes = ship.shipTypes;

const BOARDSIZE = 10;

function NewSquare(x, y) {
  const coords = { x, y };
  let hasShip = false;
  return {
    coords,
    hasShip,
  };
}

function GameBoard() {
  const board = Array(BOARDSIZE);
  for (let i = 0; i < BOARDSIZE; i++) {
    board[i] = Array(BOARDSIZE);
    for (let j = 0; j < BOARDSIZE; j++) {
      board[i][j] = NewSquare(i, j);
    }
  }
  function placeShip(xcoord, ycoord, shipType = 'testShip') {
    if (shipTypes[`${shipType}`] === undefined) {
      return _errorHandler(1);
    }
    // get the actual ship using shipType
    const currentShip = shipTypes[`${shipType}`];
    // board[xcoord][ycoord].hasShip = true;
    // make the ship lie vertically from origin
    for (let i = 0; i < currentShip.length; i++) {
      board[xcoord][ycoord + i].hasShip = true;
    }
    return currentShip;
  }
  return {
    board,
    placeShip,
  };
}

function _errorHandler(key) {
  switch (key) {
    case 1:
      throw new Error('Not a valid ship type');
    default:
      break;
  }
}

module.exports = GameBoard;
