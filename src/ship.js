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

module.exports = NewShip;
