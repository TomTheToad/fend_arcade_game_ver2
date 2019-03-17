// app.levels.js
// A space to layout custom levels to be used with
// app.models.js >> GameBlockGrid.buildCustomBlockGrid method

// Attach images to variables to make it easier to build arrays.
let stone = 'images/stone-block.png';
let grass = 'images/grass-block.png';
let water = 'images/water-block.png';

// An example of a design for level.
// This version uses this as the game board.
// Would have to implement in app.gameController.
// 5 x 6 grid
// Layout syntax to mirror actual game grid
// Same idea as was previously used in engine.js.
const level1 = [
    grass, grass, grass, grass, grass,
    stone, stone, stone, water, stone,
    stone, stone, stone, stone, stone,
    water, stone, stone, stone, stone,
    stone, stone, stone, stone, water,
    grass, grass, grass, grass, grass,
]