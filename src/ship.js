function NewShip(shipLength, shipName) {
  const name = shipName;
  const length = shipLength > 0 ? shipLength : _errorHandler(1);

  let hitCount = 0;
  let isSunk = false;

  function checkIfSunk() {
    if (this.hitCount < this.length) {
      return false;
    } else {
      this.isSunk = true;
      return true;
    }
  }

  function hit() {
    if (this.checkIfSunk() === false) {
      this.hitCount++;
    }
    this.checkIfSunk();
    return this.hitCount;
  }

  function _errorHandler(key) {
    switch (key) {
      case 1:
        throw new Error('Invalid ship length');
      default:
        break;
    }
  }

  return {
    name,
    length,
    hitCount,
    isSunk,
    hit,
    checkIfSunk,
  };
}

// Make 5 default ships

// const shipTypes = {
//   carrier: NewShip(5, 'carrier'),
//   battleship: NewShip(4, 'battleship'),
//   submarine: NewShip(3, 'submarine'),
//   destroyer: NewShip(3, 'destroyer'),
//   patrolBoat: NewShip(2, 'patrolBoat'),
//   testShip: NewShip(1, 'testShip'),
// };

module.exports = NewShip;
// export default NewShip;
