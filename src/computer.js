/*
if the opponent is not a human
This just acts as the logic for making choices about attacking next
Computer only can see its board, its previous guesses and their results

*/

// import Player from './player';
const newPlayer = require('./player');

const computerPlayer = newPlayer();

computerPlayer.randomAttack = function () {
  const x = Math.floor((Math.random() * 100000) % 10);
  const y = Math.floor((Math.random() * 100000) % 10);
  if (this.canAttack(x, y) === true) {
    return { x, y, valid: true };
  } else {
    return { x, y, valid: false };
  }
};

computerPlayer.makeChoice = function () {
  const attempt = this.randomAttack();
  if (attempt.valid === true) {
    return { x: attempt.x, y: attempt.y };
  }
  // try again with incremented values?
  // basic search, just increment the y value row by row?
  let ogx = attempt.x;
  let ogy = attempt.y;
  for (let i = ogx; i % 10 !== ogx; i++) {
    for (let j = ojy; j % 10 !== ogy; j++) {
      if (this.canAttack() === true) {
        return { x: i, y: j };
      }
    }
  }
};

module.exports = computerPlayer;
