// import ship from './ship';
const ship = require('../src/ship');

const shipTypes = ship.shipTypes;

const BOARDSIZE = 10;

function _NewSquare(x, y) {
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
      board[i][j] = _NewSquare(i, j);
    }
  }

  function placeShip(xcoord, ycoord, shipType, orient) {
    if (shipTypes[`${shipType}`] === undefined) {
      return _errorHandler(invalidShip);
    }
    // get the actual ship using shipType
    const currentShip = shipTypes[`${shipType}`];

    // check the potential placement of ship to see if any squares are already occupied
    if (_checkIfOccupied(xcoord, ycoord, shipType, orient) === true) {
      _errorHandler(spaceOccupied);
    }

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
        break;

      case 'W':
        if (xcoord + currentShip.length < 0) {
          return _errorHandler(invalidStartingSquare);
        }
        for (let i = 0; i < currentShip.length; i++) {
          board[xcoord - i][ycoord].hasShip = true;
        }
        break;

      default:
        return _errorHandler();
    }
    return currentShip;
  }

  // Do this recursively?
  function _checkIfOccupied(xcoord, ycoord, shipType, orient) {
    const currentShip = ship.shipTypes[`${shipType}`];
    // check the origin square
    if (board[xcoord][ycoord].hasShip) {
      return true;
    }
    switch (orient) {
      case 'N':
        for (let i = 0; i < currentShip.length; i++) {
          if (board[xcoord][ycoord + i].hasShip === true) {
            return true;
          }
        }
        return false;

      case 'S':
        for (let i = 0; i < currentShip.length; i++) {
          if (board[xcoord][ycoord - i].hasShip === true) {
            return true;
          }
        }
        return false;

      case 'E':
        for (let i = 0; i < currentShip.length; i++) {
          if (board[xcoord + i][ycoord].hasShip === true) {
            return true;
          }
        }
        return false;

      case 'W':
        for (let i = 0; i < currentShip.length; i++) {
          if (board[xcoord - i][ycoord].hasShip === true) {
            return true;
          }
        }
        return false;
    }
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
      throw new Error(
        'Cannot place here, placement would overhang the game board'
      );

    case spaceOccupied:
      throw new Error(
        'Cannot place here, ship would overlap an existing placement'
      );

    default:
      throw new Error('Could not place ship for some reason...');
  }
}

module.exports = GameBoard;
