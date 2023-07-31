const board = require('../src/board');
// import board from '../src/board';

it('Returns a gameboard object', () => {
  expect(typeof board()).toBe('object');
});

// changed the configuration of the code so that it returns objects, not test values
it.skip('Returns a 10x10 array', () => {
  const testBoard = board();
  expect(testBoard.board[0][0]).toBe(1);
  expect(testBoard.board[0][9]).toBe(1);
  expect(testBoard.board[9][0]).toBe(1);
  expect(testBoard.board[9][9]).toBe(1);
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

it.skip('Places a 1-length ship on a square', () => {
  const testBoard = board();
  testBoard.placeShip(0, 0, 1);
  expect(testBoard.board[0][0].hasShip).toBe(true);
  expect(testBoard.board[1][1].hasShip).toBe(false);
  expect(testBoard.board[2][2].hasShip).toBe(false);
  expect(testBoard.board[3][3].hasShip).toBe(false);
  expect(testBoard.board[4][4].hasShip).toBe(false);
});

it('Throws an error if shipType is not found', () => {
  const testBoard = board();
  expect(() => testBoard.placeShip(0, 0, 'Rick Astley')).toThrow();
  expect(() => testBoard.placeShip(0, 0, 5)).toThrow();
});

it('Places a 5-length ship on a square growing vertically', () => {
  const testBoard = board();
  testBoard.placeShip(0, 0, 'carrier');
  expect(testBoard.board[0][5].hasShip).toBe(false);
  expect(testBoard.board[0][0].hasShip).toBe(true);
  expect(testBoard.board[0][1].hasShip).toBe(true);
  expect(testBoard.board[0][2].hasShip).toBe(true);
  expect(testBoard.board[0][3].hasShip).toBe(true);
  expect(testBoard.board[0][4].hasShip).toBe(true);
});

it('Places a 2-lenth ship on squares vertically', () => {
  const testBoard = board();
  testBoard.placeShip(0, 0, 'patrolBoat');
  expect(testBoard.board[0][5].hasShip).toBe(false);
  expect(testBoard.board[0][0].hasShip).toBe(true);
  expect(testBoard.board[0][1].hasShip).toBe(true);
  expect(testBoard.board[0][2].hasShip).toBe(false);
});

it('Only places a ship if it fits vertically', () => {
  const testBoard = board();
  expect(() => testBoard.placeShip(0, 8, 'carrier')).toThrow();
  expect(() => testBoard.placeShip(0, 9, 'carrier')).toThrow();
  expect(() => testBoard.placeShip(1, 9, 'patrolBoat')).toThrow();
});

it('Places a ship oriented South from starting point', () => {
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
