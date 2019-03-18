// app.gameController.js
// Definition for GameController class
// followed by initialization of Player, Enemies, BlockGrid, and gameController
// Included eventlistener logic for necessary keys to operate game at bottom.
// This file is where most of the game logic should be kept.

// GameController class
// Takes three arguments.
// player: the player game piece
// enemies: an array of enemy game pieces
// blockGrid: the level1 board design. This will eventually take an array of level objects.
class GameController {
    constructor(player, enemies, blockGrid = null) {
        this.player = player;
        this.enemies = enemies;
        this.blockGrid = blockGrid;

        // Game State
        this.isPaused = false;

        // gameDimensions
        this.blockCountX = 5;
        this.blockCountY = 6;

        // TODO: Remove magic number in favor of offset
        this.distMoveX = ctx.canvas.width / this.blockCountX;
        this.distMoveY = (ctx.canvas.height / this.blockCountY) - 18;

        // Score Fields
        this.scoreBoard = document.getElementById('score');
        this.score = 0;
    }

    // Method the handles keyboard input
    // Takes one argument for keyboard event.
    handleInput(input) {
        // Prevents movement if game is paused
        if (this.isPaused == false) {
            // Calls on checkNextMove() method to check for legal moves.
            // All cases implement the checkMoveBlocked method to check for nonPlayable board spaces.
            let pos = this.checkNextMove();
            switch (input) {
                case 'up':
                    if (pos.yUp) {
                        this.player.moveUp(this.distMoveY);
                        this.checkMoveBlocked();
                    }
                    break;
                case 'down':
                    if (pos.yDown) {
                        this.player.moveDown(this.distMoveY);
                        this.checkMoveBlocked();
                    }
                    break;
                case 'right':
                    if (pos.xRight) {
                        this.player.moveRight(this.distMoveX);
                        this.checkMoveBlocked();
                    }
                    break;
                case 'left':
                    if (pos.xLeft) {
                        this.player.moveLeft(this.distMoveX);
                        this.checkMoveBlocked();
                    }
                    break;
            }
        }
        if (input == 'pause') {
            this.isPaused = !this.isPaused;
        }
    }

    // A macro update method call
    // Calls methods to checks to see if a "win" or collision condition exists
    // Takes single argument for time differential used with animation
    update(dt) {
        if (this.isPaused != true) {
            this.winCheck();
            this.enemies.forEach(element => {
                this.collisionCheck(element);
                if (element.x > ctx.canvas.width) {
                    element.reset();
                }
                element.moveRight(10 * dt);
            });
        }
    }

    // A macro render call
    // Calls render methods for game grid, player, and all enemies.
    render() {
        if (this.blockGrid != null) {
            this.blockGrid.forEach(block => block.render());
        }
        this.player.render();
        this.enemies.forEach(enemy => enemy.render());
    }

    // Method that current position from player
    // and checks against possible moves.
    // Takes one argument: pos >> player position object {x: x, y: y}
    checkNextMove(pos = this.player.getCurrentPosition()) {
        let returnObject = {
            xLeft: false,
            xRight: false,
            yUp: false,
            yDown: false,
        };

        // Check move left x
        // TODO: use dynamic offset (using const -5 as a place holder)
        if ((pos.x - this.distMoveX) > -5) {
            returnObject.xLeft = true;
        }
        // Check move right x
        if ((pos.x + this.distMoveX) < ctx.canvas.width - this.distMoveX) {
            returnObject.xRight = true;
        }
        // Check move up y
        if (pos.y) {
            if ((pos.y - this.distMoveY) > (-1 * this.distMoveY)) {
                returnObject.yUp = true;
            }
        }
        // Check move down y
        // TODO: will need dynamic y offset
        // canvas height does not work here
        if (pos.y) {
            if ((pos.y + this.distMoveY) < ctx.canvas.height - (2 * this.distMoveY)) {
                returnObject.yDown = true;
            }
        }

        return returnObject;
    }

    // TODO: refactor / combine with collision check?
    // TODO: can magic numbers be made dynamic? Maybe in block / block grid class
    // Method to check postMove for an nonplayable block and reset players position if necessary.
    // Takes one argument: player instance so player can be commanded to return to last position
    // if position if found to be illegal.
    checkMoveBlocked(player = this.player) {
        this.blockGrid.forEach(block => {
            let pos = player.getCurrentPosition();
            if (block.isPlayable == false) {
                let xMin = block.x - 5;
                let xMax = block.x + 50;
                let yMin = block.y - 30;
                let yMax = block.y + 50;
                if ((pos.x > xMin) && (pos.x < xMax) && (pos.y > yMin) && (pos.y < yMax)) {
                    player.returnToLastPos();
                }
            }
        });
    }

    // Checks player position for win condition
    // Calls class / game reset method if condition met.
    winCheck() {
        if (this.player.y < 0) {
            this.isPaused = true;
            this.updateScore(10);
            this.reset();
        }
    }

    // TODO: Why not use this for blocks as well?
    // Use arguments for diff min, max, and callback?
    // Method checks for collision between player and enemy item.
    // Takes argument for item (instance of enemy) and player.
    // Uses player arguement to reset player position to origin if collision detected.
    collisionCheck(item, player = this.player) {
        // TODO: make arguments dynamic
        let itemMinX = item.x - 50;
        let itemMaxX = item.x + 80;
        let itemMinY = item.y - 10;
        let itemMaxY = item.y + 40;
        if (player.x < itemMaxX && player.x > itemMinX && player.y < itemMaxY && player.y > itemMinY) {
            this.updateScore(-10);
            this.reset();
        }
    }

    // Updates score field
    // Takes single argument for change to score.
    updateScore(num) {
        this.score += num;
        this.scoreBoard.innerText = this.score;
    }

    // Resets the player position and unpauses the game if paused.
    reset() {
        this.player.reset();
        this.isPaused = false;
    }
}

// Create the default player instance.
let player = new DynamicGamePiece('images/char-boy.png', 200, 388)

// Create an array of default enemies.
let allEnemies = [
    new DynamicGamePiece('images/enemy-bug.png', 0, 64, 4),
    new DynamicGamePiece('images/enemy-bug.png', 0, 144),
    new DynamicGamePiece('images/enemy-bug.png', 0, 224, 6)
]

// Create an intance of gameBlockGrid to build the new game grid.
let gameBlockGrid = new GameBlockGrid(ctx.canvas.width, ctx.canvas.height, 5, 6, -18, 0);

// Custom build the new game board based off of level1 array in app.levels.js
let allBlocks = gameBlockGrid.buildCustomBlockGrid(level1);

// Instantiate the gameController and build the game.
let gameController = new GameController(player, allEnemies, allBlocks);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        80: 'pause'
    };

    gameController.handleInput(allowedKeys[e.keyCode]);
});