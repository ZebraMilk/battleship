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
  - place multiple ships correctly
  - only allow one instance of each ship on the board
  - Prevent ships from overlapping
    - need to only populate the squares if all of them are clear

- Make the board coordinates "squares" that have some data in them
  - hasShip: shipName or false?
  - hasAttack { miss, hit, false }
- track the squares on the boards that have been guessed
- track hits and misses on the board

board has a list of placedShips?
so the board now has ships attached to it as properties?
how do I persist the ship objects on the gameboard?
when a ship is placed
the coords on the board that ship occupies are changed
there is a ship object that tracks hits and such, but where does that ship live? Does it still live in the ships module? Or do I now need it in the gameboard module?
Gamebaords should be able to report whether or not all their ships have been sunk.

This sort of implies that a gameboard "has" ships on it... So how di I reflect that?

Options:

- give the gameboard a list of placedShips, objects with names
- when a ship is placed, update the "hasShip" property to be the "name" of the placed ship?
  - this makes it a bit trickier to track if ships are sunk.

I want placedShips to look like:
placedShips {
carrier: {
...
},
battleship: {
...
},
// etc...
}

So I can access each ship object by getting placedShips.${shipName} and get the ship object

I think I need to reformat some things to keep track of how ships are placed and where they are.

Placing a ship on the board should add it to the placedShips object with its name as the key.
all other references to this ship should go to that list

basically a bunch of places in the code are going to be using/accessing the ship objects, those need to be stored when the gameBoard is created.

1. make the board

   1. could create ship objects and just have them "around"

2. as each ship object is placed, it is created and stored in the placedShips object under its name as the key
3.

Right now, I have the ship factory in another module, but when it "gives" the gameboard the shipTypes object, are those properties sort of... frozen? Like does it invoke a new ship every time it's called?
How can I test for this?

---

### Ideas after a Tuesday

I think I would like to look at this project as a series of interfaces.

The board interface is going to have the most stuff, because it's where most of the interactions live.

So not even considering the UI, I have:

- Ship factory function that produces ships of a given length
- When a gameboard is initialized, make the 5 ships to be placed
  - store those ships in the staging area
  - When a ship is placed, add it, the entire ship object, to the placedShips array/object
  - Every time I need to update something on the ship itself, call out to placedShips
  - Treat placedShips like a mini database, update their stored hitCounts and values
  - when a ship is placed
    - update each of the squares to have a ship, and have the same object
      - does this work? Does assigning a "reference" to the placedShip.name let me update that placedShip?
      - I could just have the square hold the "key" to the placedShip
      - then when needing to update or pass a hit() call, could go into the "database"

### Player

- needs to take an attack coordinate pair and pass it to it gameBoard object
- Make an attack and pass it to the message to the flow controller
- compose an attack object to pass around
- a player makes a guess, passes that guess to the game loop, which calls the enemy's receiveAttack function.
- has full access to their own gameBoard

  - where its own ships are
  - how many ships are sunk
  - which attacks have missed on its board
    (but none of this informs anything...)

- Player also has a list of attacks made
- Could make the makeAttack async
- could also have the receiveAttack return a promise

This would make sense, because it might take some time to complete the loops...

### Game Loop

- Players only get to know the result of their actions, not much else
- Players send messages to the loop controller
- Computer player needs to make valid choices on its turn by looking at the board, its guesses
- tracks the current turn
- asks player to make an attack
  - gets a set of coordinates
  - if human, get those coords from input (prompt, mouse click, whatever)
  - if computer turn, get those coords from the appropriate attack-generating method
- resolves that promise by passing the coordinates to the enemy's board, calling receiveAttack;
- ends the current player's turn

---

UPDATE 08/08/2023:

I think this bit of the code, the game controller, needs to do a few things:

- track current turn

- play a round

  - play a turn
  - check for winner
  - switch turns
  - play another turn
  - check for winner
  - switch turns

- Turn consists of:
  - request coordinates of an attack from a player
  - pass coordinates to enemy player
    - call takeAttack
    - return result
  - pass result of attack to original player
    - update attackResult

#### State

What information do the players have access to?

- their own gameBoard
- their attacks
  - the result of each of those attacks
- how many opposing ships are sunk
-

What should the UI track?

- attackResults
- own board state, can log/update with opponent attacks/misses
-

### Mocking

So jest can set up a function with `const mockFunction = jest.fn(someValue => doThingsToValue)`

### Scheme

Need to really figure out the pieces and how they talk to one another.
Each time I come up with a different idea about how the eventual app is going to look, I need to figure out the actual steps and tests to get there

## Brainstorms

After some thinking, steps 3 and 4 are a bit misleading. I cannot have a function in the player object to actually make an attack, interact with the enemy board. Those methods have to be called by the game module. So the game module passes methods around.

---

Testing the game scripts, something weird is happening. I make a testGame on lines 26 and 42. I run two tests, and for the second test, trying to place

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
