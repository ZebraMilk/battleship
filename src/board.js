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
  function placeShip(xcoord, ycoord, shipType = 'testShip', orient = 'N') {
    if (shipTypes[`${shipType}`] === undefined) {
      return _errorHandler(invalidShip);
    }
    // get the actual ship using shipType
    const currentShip = shipTypes[`${shipType}`];
    switch (orient) {
      case 'N':
        // check if the ship would go off the board
        if (ycoord + currentShip.length > BOARDSIZE) {
          return _errorHandler(invalidStartingSquare);
        }
        // make the ship lie N from origin
        for (let i = 0; i < currentShip.length; i++) {
          board[xcoord][ycoord + i].hasShip = true;
        }
        break;

      case 'S':
        if (ycoord - currentShip.length < 0) {
          return _errorHandler(invalidStartingSquare);
        }
        for (let i = 0; i < currentShip.length; i++) {
          board[xcoord][ycoord - i].hasShip = true;
        }
        break;
      case 'E':
        if (xcoord + currentShip.length > BOARDSIZE) {
          return _errorHandler(invalidStartingSquare);
        }
        for (let i = 0; i < currentShip.length; i++) {
          board[xcoord + i][ycoord].hasShip = true;
        }
      case 'W':
        if (xcoord + currentShip.length < 0) {
          return _errorHandler(invalidStartingSquare);
        }
        for (let i = 0; i < currentShip.length; i++) {
          board[xcoord - i][ycoord].hasShip = true;
        }
      default:
        break;
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
    case invalidShip:
      throw new Error('Not a valid ship type');
    case invalidStartingSquare:
      throw new Error('Cannot place ship here');
    default:
      break;
  }
}

module.exports = GameBoard;
