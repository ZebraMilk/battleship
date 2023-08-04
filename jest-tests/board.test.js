const boardStuff = require('../src/board');
const board = boardStuff.GameBoard;
// import board from '../src/board';

describe('The gameboard', () => {
  const testBoard = board();

  it('Returns a gameboard object', () => {
    expect(typeof board()).toBe('object');
  });

  it('Has no squares beyond the boundaries of BOARDSIZE', () => {
    expect(testBoard.board[0][10]).toBe(undefined);
    expect(testBoard.board[10]).toBe(undefined);
    expect(testBoard.board[2][10]).toBe(undefined);
    expect(testBoard.board[19]).toBe(undefined);
  });

  it('Return a board full of actual "squares"', () => {
    expect(testBoard.board[0][0].coords).toEqual({ x: 0, y: 0 });
    expect(testBoard.board[9][0].coords).toEqual({ x: 9, y: 0 });
    expect(testBoard.board[9][9].coords).toEqual({ x: 9, y: 9 });
    expect(testBoard.board[0][9].coords).toEqual({ x: 0, y: 9 });
    expect(testBoard.board[3][5].coords).toEqual({ x: 3, y: 5 });
  });

  it('Throws an error if shipType is not found', () => {
    expect(() => testBoard.placeShip(0, 0, 'Rick Astley', 'N')).toThrow();
    expect(() => testBoard.placeShip(0, 0, 5, 'N')).toThrow();
  });
});

describe('The ship-aware gameBoard', () => {
  it('Places a 5-length ship on a square growing vertically', () => {
    const testBoard = board();
    testBoard.placeShip(0, 0, 'carrier', 'N');
    expect(testBoard.board[0][5].hasShip).toBe(false);
    expect(testBoard.board[0][0].hasShip).toBe(true);
    expect(testBoard.board[0][4].hasShip).toBe(true);
  });

  it('Places a 2-length ship on squares vertically', () => {
    const testBoard = board();
    testBoard.placeShip(0, 0, 'patrolBoat', 'N');
    expect(testBoard.board[0][5].hasShip).toBe(false);
    expect(testBoard.board[0][0].hasShip).toBe(true);
    expect(testBoard.board[0][1].hasShip).toBe(true);
    expect(testBoard.board[0][2].hasShip).toBe(false);
  });

  it('Only places a ship if it fits vertically', () => {
    const testBoard = board();
    expect(() => testBoard.placeShip(0, 8, 'carrier', 'N')).toThrow();
    expect(() => testBoard.placeShip(0, 9, 'carrier', 'N')).toThrow();
    expect(() => testBoard.placeShip(1, 9, 'patrolBoat', 'N')).toThrow();
  });

  it('Places a ship oriented S from starting point', () => {
    const testBoard = board();
    testBoard.placeShip(0, 5, 'carrier', 'S');
    expect(testBoard.board[0][6].hasShip).toBe(false);
    expect(testBoard.board[0][1].hasShip).toBe(true);
    expect(testBoard.board[0][5].hasShip).toBe(true);
    expect(testBoard.board[0][0].hasShip).toBe(false);
  });

  it('Does not place a ship S if it would go off the board', () => {
    const testBoard = board();
    expect(() => testBoard.placeShip(0, 0, 'carrier', 'S')).toThrow();
    expect(() => testBoard.placeShip(0, 3, 'carrier', 'S')).toThrow();
    expect(() => testBoard.placeShip(1, 0, 'patrolBoat', 'S')).toThrow();
  });

  it('Places a ship oriented E from starting point', () => {
    const testBoard = board();
    testBoard.placeShip(1, 0, 'carrier', 'E');
    expect(testBoard.board[0][0].hasShip).toBe(false);
    expect(testBoard.board[1][0].hasShip).toBe(true);
    expect(testBoard.board[5][0].hasShip).toBe(true);
    expect(testBoard.board[6][0].hasShip).toBe(false);
  });

  it('Does not place a ship E if it would go off the board', () => {
    const testBoard = board();
    expect(() => testBoard.placeShip(9, 0, 'carrier', 'E')).toThrow();
    expect(() => testBoard.placeShip(8, 0, 'carrier', 'E')).toThrow();
    expect(() => testBoard.placeShip(9, 0, 'patrolBoat', 'E')).toThrow();
  });

  it('Places a ship oriented W from starting point', () => {
    const testBoard = board();
    testBoard.placeShip(5, 0, 'carrier', 'W');
    expect(testBoard.board[0][0].hasShip).toBe(false);
    expect(testBoard.board[1][0].hasShip).toBe(true);
    expect(testBoard.board[5][0].hasShip).toBe(true);
    expect(testBoard.board[6][0].hasShip).toBe(false);
  });

  it('Does not place a ship W if it would go off the board', () => {
    const testBoard = board();
    expect(() => testBoard.placeShip(0, 0, 'carrier', 'W')).toThrow();
    expect(() => testBoard.placeShip(1, 0, 'carrier', 'W')).toThrow();
    expect(() => testBoard.placeShip(0, 0, 'patrolBoat', 'W')).toThrow();
  });

  it("Places multiple ships that wouldn't overlap", () => {
    const testBoard = board();
    testBoard.placeShip(1, 0, 'carrier', 'E');
    testBoard.placeShip(5, 5, 'patrolBoat', 'S');

    // test carrier position
    expect(testBoard.board[0][0].hasShip).toBe(false);
    expect(testBoard.board[1][0].hasShip).toBe(true);
    expect(testBoard.board[5][0].hasShip).toBe(true);
    expect(testBoard.board[6][0].hasShip).toBe(false);

    // test patrolBoat position

    expect(testBoard.board[5][6].hasShip).toBe(false);
    expect(testBoard.board[5][5].hasShip).toBe(true);
    expect(testBoard.board[5][3].hasShip).toBe(false);
  });

  it('Does not allow a ship to be placed if it would overlap a preexisting ship', () => {
    const testBoard = board();
    testBoard.placeShip(1, 5, 'carrier', 'E');
    expect(() => testBoard.placeShip(7, 5, 'carrier', 'W')).toThrow();
    expect(() => testBoard.placeShip(3, 6, 'carrier', 'S')).toThrow();
    expect(() => testBoard.placeShip(3, 7, 'carrier', 'N')).toThrow();
    expect(() => testBoard.placeShip(5, 5, 'patrolBoat', 'W')).toThrow();
    expect(() => testBoard.placeShip(3, 6, 'patrolBoat', 'S')).toThrow();
    expect(() => testBoard.placeShip(4, 4, 'patrolBoat', 'N')).toThrow();
  });
});

describe('The attack-aware gameBoard', () => {
  it('Receives an attack message and determines if it hits or misses', () => {
    const testBoard = board();
    expect(testBoard.receiveAttack(0, 0)).toBe('miss');
    testBoard.placeShip(1, 1, 'carrier', 'E');
    expect(testBoard.receiveAttack(2, 1)).toBe('hit');
  });

  it('Stores the misses in an array as ordered pairs', () => {
    const testBoard = board();
    testBoard.receiveAttack(0, 0);
    testBoard.receiveAttack(1, 0);
    testBoard.receiveAttack(2, 0);
    testBoard.receiveAttack(3, 0);
    expect(testBoard.misses).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ]);
  });

  it('Stores the ships in the placedShips array', () => {
    const testBoard = board();
    testBoard.placeShip(0, 0, 'carrier', 'E');
    const testShip = testBoard.shipTypes['carrier'];
    expect(testBoard.placedShips).toContain(testShip);
  });

  it('Calls the hit() function on the correct ship', () => {
    const testBoard = board();
    testBoard.placeShip(1, 1, 'carrier', 'E');
    const testedShip = testBoard.shipTypes['carrier'];
    expect(testedShip.hitCount).toBe(0);
    testBoard.receiveAttack(1, 1);
    expect(testedShip.hitCount).toBe(1);
  });

  it('Does not hit a previously selected square', () => {
    const testBoard = board();
    testBoard.placeShip(1, 1, 'carrier', 'E');
    const testedShip = testBoard.shipTypes['carrier'];
    testBoard.receiveAttack(1, 1);
    testBoard.receiveAttack(1, 1);
    testBoard.receiveAttack(1, 1);
    testBoard.receiveAttack(2, 1);
    expect(testedShip.hitCount).toBe(2);
  });

  it('Tracks the number of misses correctly', () => {
    const testBoard = board();
    testBoard.placeShip(1, 1, 'carrier', 'E');
    const missCount = testBoard.misses;
    testBoard.receiveAttack(0, 0);
    testBoard.receiveAttack(1, 0);
    testBoard.receiveAttack(2, 0);
    testBoard.receiveAttack(3, 0);
    testBoard.receiveAttack(4, 0);
    expect(missCount.length).toBe(5);
  });

  it('Can tell when a ship is sunk', () => {
    const testBoard = board();
    testBoard.placeShip(1, 1, 'carrier', 'E');
    testBoard.receiveAttack(1, 1);
    testBoard.receiveAttack(2, 1);
    testBoard.receiveAttack(3, 1);
    testBoard.receiveAttack(4, 1);
    testBoard.receiveAttack(5, 1);

    expect(testBoard.sunkShips).not.toBe(undefined);
    expect(testBoard.sunkShips).toContain('carrier');
  });

  it('Can tell when two ships are sunk', () => {
    const testBoard = board();
    testBoard.placeShip(1, 1, 'carrier', 'E');
    expect(testBoard.shipTypes['carrier'].isSunk).toEqual(false);
    testBoard.receiveAttack(1, 1);
    testBoard.receiveAttack(2, 1);
    testBoard.receiveAttack(3, 1);
    testBoard.receiveAttack(4, 1);
    testBoard.receiveAttack(5, 1);
    testBoard.placeShip(5, 2, 'battleship', 'W');
    expect(testBoard.shipTypes['battleship'].isSunk).toEqual(false);
    testBoard.receiveAttack(2, 2);
    testBoard.receiveAttack(3, 2);
    testBoard.receiveAttack(4, 2);
    testBoard.receiveAttack(5, 2);
    expect(testBoard.shipTypes['carrier'].isSunk).toEqual(true);
    expect(testBoard.shipTypes['battleship'].isSunk).toEqual(true);
    expect(testBoard.sunkShips).not.toBe(undefined);
    expect(testBoard.sunkShips).toContain('carrier');
    expect(testBoard.sunkShips).toContain('battleship');
  });

  it('Can track if all the ships are sunk', () => {
    const testBoard = board();

    testBoard.placeShip(1, 1, 'carrier', 'E');
    testBoard.placeShip(1, 2, 'battleship', 'E');
    testBoard.placeShip(1, 3, 'submarine', 'E');
    testBoard.placeShip(1, 4, 'destroyer', 'E');
    testBoard.placeShip(1, 5, 'patrolBoat', 'E');
    testBoard.receiveAttack(1, 1);
    testBoard.receiveAttack(2, 1);
    testBoard.receiveAttack(3, 1);
    testBoard.receiveAttack(4, 1);
    testBoard.receiveAttack(5, 1);
    testBoard.receiveAttack(1, 2);
    testBoard.receiveAttack(2, 2);
    testBoard.receiveAttack(3, 2);
    testBoard.receiveAttack(4, 2);
    testBoard.receiveAttack(1, 3);
    testBoard.receiveAttack(2, 3);
    testBoard.receiveAttack(3, 3);
    testBoard.receiveAttack(1, 4);
    testBoard.receiveAttack(2, 4);
    testBoard.receiveAttack(3, 4);
    testBoard.receiveAttack(1, 5);
    testBoard.receiveAttack(2, 5);
    expect(testBoard.allShipsSunk()).toBe(true);
  });
});

describe('The squares on a populated board', () => {
  it('Keeps track of ship placement correctly', () => {
    const testBoard = board();
    testBoard.placeShip(1, 1, 'carrier', 'E');
    testBoard.placeShip(1, 2, 'battleship', 'E');
    testBoard.placeShip(1, 3, 'submarine', 'E');
    testBoard.placeShip(1, 4, 'destroyer', 'E');
    testBoard.placeShip(1, 5, 'patrolBoat', 'E');
    expect(testBoard.board[1][1].ship).toEqual(testBoard.shipTypes['carrier']);
    expect(testBoard.board[5][1].ship).toEqual(testBoard.shipTypes['carrier']);
    expect(testBoard.board[5][1].ship).toEqual(testBoard.placedShips[0]);
    expect(testBoard.board[1][2].ship).toEqual(
      testBoard.shipTypes['battleship']
    );
    expect(testBoard.board[4][2].ship).toEqual(
      testBoard.shipTypes['battleship']
    );
    expect(testBoard.board[1][3].ship).toEqual(
      testBoard.shipTypes['submarine']
    );
    expect(testBoard.board[3][3].ship).toEqual(
      testBoard.shipTypes['submarine']
    );
    expect(testBoard.board[1][4].ship).toEqual(
      testBoard.shipTypes['destroyer']
    );
    expect(testBoard.board[3][4].ship).toEqual(
      testBoard.shipTypes['destroyer']
    );
    expect(testBoard.board[1][5].ship).toEqual(
      testBoard.shipTypes['patrolBoat']
    );
    expect(testBoard.board[2][5].ship).toEqual(
      testBoard.shipTypes['patrolBoat']
    );
  });

  it('Tracks hits and misses correctly', () => {
    // Be careful here to not toggle the square's state if an attack is attempted, like it can't switch from hit to miss or false..
    const testBoard = board();
    testBoard.placeShip(1, 1, 'carrier', 'E');
    testBoard.placeShip(1, 2, 'battleship', 'E');
    testBoard.placeShip(1, 3, 'submarine', 'E');
    testBoard.placeShip(1, 4, 'destroyer', 'E');
    testBoard.placeShip(1, 5, 'patrolBoat', 'E');
    testBoard.receiveAttack(2, 1); // hit
    testBoard.receiveAttack(3, 1); // hit
    testBoard.receiveAttack(2, 2); // hit
    testBoard.receiveAttack(3, 2); // hit
    testBoard.receiveAttack(1, 3); // hit
    testBoard.receiveAttack(3, 3); // hit
    testBoard.receiveAttack(7, 1); // miss
    testBoard.receiveAttack(6, 2); // miss
    testBoard.receiveAttack(0, 1); // miss
    testBoard.receiveAttack(2, 7); // miss
    testBoard.receiveAttack(3, 7); // miss
    testBoard.receiveAttack(1, 7); // miss
    testBoard.receiveAttack(4, 8); // miss
    expect(testBoard.misses.length).toBe(7);
    expect(testBoard.board[2][1].hasAttack).toBe('hit');
    expect(testBoard.board[4][8].hasAttack).toBe('miss');
  });
});
