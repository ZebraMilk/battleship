const board = require('../src/board');
// import board from '../src/board';

it('Returns a gameboard object', () => {
  expect(typeof board()).toBe('object');
});

it('Has no squares beyond the boundaries of BOARDSIZE', () => {
  const testBoard = board();
  expect(testBoard.board[0][10]).toBe(undefined);
  expect(testBoard.board[10]).toBe(undefined);
  expect(testBoard.board[2][10]).toBe(undefined);
  expect(testBoard.board[19]).toBe(undefined);
});

it('Return a board full of actual "squares"', () => {
  const testBoard = board();
  expect(testBoard.board[0][0].coords).toEqual({ x: 0, y: 0 });
  expect(testBoard.board[9][0].coords).toEqual({ x: 9, y: 0 });
  expect(testBoard.board[9][9].coords).toEqual({ x: 9, y: 9 });
  expect(testBoard.board[0][9].coords).toEqual({ x: 0, y: 9 });
  expect(testBoard.board[3][5].coords).toEqual({ x: 3, y: 5 });
});

it('Throws an error if shipType is not found', () => {
  const testBoard = board();
  expect(() => testBoard.placeShip(0, 0, 'Rick Astley', 'N')).toThrow();
  expect(() => testBoard.placeShip(0, 0, 5, 'N')).toThrow();
});

it('Places a 5-length ship on a square growing vertically', () => {
  const testBoard = board();
  testBoard.placeShip(0, 0, 'carrier', 'N');
  expect(testBoard.board[0][5].hasShip).toBe(false);
  expect(testBoard.board[0][0].hasShip).toBe(true);
  expect(testBoard.board[0][1].hasShip).toBe(true);
  expect(testBoard.board[0][2].hasShip).toBe(true);
  expect(testBoard.board[0][3].hasShip).toBe(true);
  expect(testBoard.board[0][4].hasShip).toBe(true);
});

it('Places a 2-lenth ship on squares vertically', () => {
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
  expect(testBoard.board[0][2].hasShip).toBe(true);
  expect(testBoard.board[0][3].hasShip).toBe(true);
  expect(testBoard.board[0][4].hasShip).toBe(true);
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
  expect(testBoard.board[2][0].hasShip).toBe(true);
  expect(testBoard.board[3][0].hasShip).toBe(true);
  expect(testBoard.board[4][0].hasShip).toBe(true);
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
  expect(testBoard.board[2][0].hasShip).toBe(true);
  expect(testBoard.board[3][0].hasShip).toBe(true);
  expect(testBoard.board[4][0].hasShip).toBe(true);
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
  expect(testBoard.board[2][0].hasShip).toBe(true);
  expect(testBoard.board[3][0].hasShip).toBe(true);
  expect(testBoard.board[4][0].hasShip).toBe(true);
  expect(testBoard.board[5][0].hasShip).toBe(true);
  expect(testBoard.board[6][0].hasShip).toBe(false);

  // test patrolBoat position

  expect(testBoard.board[5][6].hasShip).toBe(false);
  expect(testBoard.board[5][5].hasShip).toBe(true);
  expect(testBoard.board[5][4].hasShip).toBe(true);
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
