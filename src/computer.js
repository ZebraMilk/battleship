/*
if the opponent is not a human
This just acts as the logic for making choices about attacking next
Computer only can see its board, its previous guesses and their results

*/

// import Player from './player';
const newPlayer = require('./player');
const boardStuff = require('./board');
const BOARDSIZE = boardStuff.BOARDSIZE;

function NewComputerPlayer() {
  // unpack the stuff that comes with newPlayer object and add more
  function randomAttack() {
    const x = Math.floor((Math.random() * 100000) % 10);
    const y = Math.floor((Math.random() * 100000) % 10);
    if (this.canAttack(x, y) === true) {
      return { x, y, valid: true };
    } else {
      return { x, y, valid: false };
    }
  }
  function makeChoice() {
    const attempt = this.randomAttack();
    if (attempt.valid === true) {
      return { x: attempt[x], y: attempt[y] };
    }
    // try again with incremented values?
    // basic search, just increment the y value row by row?
    let ogx = attempt.x;
    let ogy = attempt.y;
    // go through every element of the array except for the initial attempt
    for (
      let i = ogx, countX = 0;
      countX < BOARDSIZE;
      countX++, i = (i + 1) % 10
    ) {
      for (
        let j = (ogy + 1) % 10, countY = 0;
        countY < BOARDSIZE;
        countY++, j = (j + 1) % 10
      ) {
        if (this.canAttack(i, j) === true) {
          return { x: i, y: j };
        }
      }
    }
    return console.log('Out of options!');
  }

  return {
    // add all properties of a "normal" player
    ...newPlayer(),
    makeChoice,
    randomAttack,
  };
}

module.exports = NewComputerPlayer;
