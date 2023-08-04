// import ship from './ship';
const ship = require('../src/ship');

const BOARDSIZE = 10;

function _NewSquare(x, y) {
  const coords = { x, y };
  let hasShip = false;
  let hasAttack = false;
  let ship = undefined;
  return {
    coords,
    hasShip,
    hasAttack,
    ship,
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

  const shipTypes = {
    carrier: ship(5, 'carrier'),
    battleship: ship(4, 'battleship'),
    submarine: ship(3, 'submarine'),
    destroyer: ship(3, 'destroyer'),
    patrolBoat: ship(2, 'patrolBoat'),
  };

  const misses = [];
  const placedShips = [];
  const sunkShips = [];

  function placeShip(xcoord, ycoord, shipName, orient) {
    if (shipTypes[`${shipName}`] === undefined) {
      return _errorHandler(invalidShip);
    }
    // get the actual ship using shipType
    const currentShip = shipTypes[`${shipName}`];

    // check the potential placement of ship to see if any squares are already occupied
    if (_checkShipOverlap(xcoord, ycoord, shipName, orient) === true) {
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
          board[xcoord][ycoord + i].ship = currentShip;
        }
        break;

      case 'S':
        if (ycoord - currentShip.length < 0) {
          return _errorHandler(invalidStartingSquare);
        }
        for (let i = 0; i < currentShip.length; i++) {
          board[xcoord][ycoord - i].hasShip = true;
          board[xcoord][ycoord - i].ship = currentShip;
        }
        break;

      case 'E':
        if (xcoord + currentShip.length > BOARDSIZE) {
          return _errorHandler(invalidStartingSquare);
        }
        for (let i = 0; i < currentShip.length; i++) {
          board[xcoord + i][ycoord].hasShip = true;
          board[xcoord + i][ycoord].ship = currentShip;
        }
        break;

      case 'W':
        if (xcoord + currentShip.length < 0) {
          return _errorHandler(invalidStartingSquare);
        }
        for (let i = 0; i < currentShip.length; i++) {
          board[xcoord - i][ycoord].hasShip = true;
          board[xcoord - i][ycoord].ship = currentShip;
        }
        break;

      default:
        return _errorHandler();
    }

    placedShips.push(currentShip);
    return;
  }

  function receiveAttack(xcoord, ycoord) {
    let target = board[xcoord][ycoord];
    if (target.hasAttack !== false) {
      return;
    }
    if (target.hasShip === true) {
      const currentShip = target.ship;
      currentShip.hit();
      target.hasAttack = 'hit';
      if (currentShip.isSunk === true) {
        sunkShips.push(currentShip.name);
        return 'sunk';
      }
      return 'hit';
    } else if (target.hasShip === false) {
      misses.push([xcoord, ycoord]);
      target.hasAttack = 'miss';
      return 'miss';
    }
  }

  function allShipsSunk() {
    if (sunkShips.length === placedShips.length) {
      return true;
    } else {
      return false;
    }
  }

  // Do this recursively?
  function _checkShipOverlap(xcoord, ycoord, shipType, orient) {
    const currentShip = shipTypes[`${shipType}`];
    // check the origin square
    if (board[xcoord][ycoord].hasShip) {
      return true;
    }
    // check all squares of a ship depending on length and orientation
    switch (orient) {
      case 'N':
        for (let i = 0; i < currentShip.length; i++) {
          if (board[xcoord][ycoord + i].hasShip !== false) {
            return true;
          }
        }
        return false;

      case 'S':
        for (let i = 0; i < currentShip.length; i++) {
          if (board[xcoord][ycoord - i].hasShip !== false) {
            return true;
          }
        }
        return false;

      case 'E':
        for (let i = 0; i < currentShip.length; i++) {
          if (board[xcoord + i][ycoord].hasShip !== false) {
            return true;
          }
        }
        return false;

      case 'W':
        for (let i = 0; i < currentShip.length; i++) {
          if (board[xcoord - i][ycoord].hasShip !== false) {
            return true;
          }
        }
        return false;
    }
  }

  return {
    board,
    placeShip,
    receiveAttack,
    misses,
    placedShips,
    shipTypes,
    sunkShips,
    allShipsSunk,
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

module.exports = { GameBoard, BOARDSIZE };
