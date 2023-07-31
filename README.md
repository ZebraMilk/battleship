# Battleship

## Intent

The primary goal with this project is to start with Test-Driven Development from square one. Beginning with assembling all the different pieces of the final game and testing their functionality one bit at a time.

### Learning Goals

- [ ] Write tests before any piece of functionality is added to the app
- [ ] Expand tests to cover many of the "paths" through the game
- [ ] Get jest to work with babel and webpack efficiently, hopefully with ES6 modules

Interesting observation:

when accessing a property on an object,

Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

- What was your motivation?
- Why did you build this project? (Note: the answer is not "Because it was a homework assignment.")
- What problem does it solve?
- What did you learn?

## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Credits](#credits)
- [License](#license)

## Installation

This should be set up on Github Pages, but the code will be accessible from the repo

## Usage

To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:

    ```md
    ![alt text](assets/images/screenshot.png)
    ```

## Tests

## Credits

List your collaborators, if any, with links to their GitHub profiles.

If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.

If you followed tutorials, include links to those here as well.

## Support

Here's how to support me

## License

The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

---

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

## Features

If your project has a lot of features, list them here.

## How to Contribute

If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. The [Contributor Covenant](https://www.contributor-covenant.org/) is an industry standard, but you can always write your own if you'd prefer.

## Tests

### Ship

The tests ensure that a ship object is created with valid length, and has valid properties and a hit() function.

- Construct the 5 default ships
  should it be done in the ship module, or the gameboard module? They are ships, I suppose.

### gameBoard

I want the gameboard to ultimately do a few things:

- Initialize an array of arrays, so there are "coordinates"
- Place ships on the board

  - place a 1-length ship on a square
  - Use an example ship, Carrier
  - allow ships to be placed vertically
  - allow ships to be placed in 4 orientations
  - check for length of the ship not overhanging the board edges

- Make the board coordinates "squares" that have some data in them
  - isShip { boolean, shipName }
  - isAttacked { miss, hit }
- track the squares on the boards that have been guessed
- track hits and misses on the board
- ***

## Brainstorms

### this.hitCount vs hitCount

INTERESTING observation:

Here's a sample ship factory function:

```js
function ship(shipLength) {
  const length = shipLength;
  let hitCount = 0;
  let isSunk = false;

  function checkIfSunk() {
    if (hitCount < length) {
      return false;
    } else {
      this.isSunk = true;
      return true;
    }
  }

  function hit() {
    if (!checkIfSunk()) {
      // three options here
    }
    return hitCount;
  }

  return {
    length,
    hitCount,
    isSunk,
    checkIfSunk,
    hit,
  };
}
```

when trying to create a function that increments hitCount, essentially a private variable, there are 3 behaviors:

`this.hitCount = this.hitCount + 1;` - works
`hitCount++;` - DOESN'T work
`hitCount = hitCount + 1;` - DOESN'T WORK

Why does hitCount++ work without a bound `this`? Clearly we can't assign values to internal properties without invoking `this`. But isn't the increment operator `n++` an assignment? `n += 1` and `n = n + 1` are all equivalent, correct?

COuld I use === strict equality to check this somehow?

Does this mess with mutability in a weird way? Like ++ is a function, almost, and returns the value incremented?

#### UPDATE

So I had it wrong, after a night of sleep. Incrementing a property in the same object requires `this` regardless of the method, ++ or +=

---

Also just found https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus, which is FANTASTIC and cool
Preferred way to coerce a value into a number? Effects on non-numbers, are they the same as calling `Number()` methods? or `toNumber` or explicitly casting the value as a number?

How many ways of casting a value to a number are there?

- -
- toNumber
- -
