class GameController {
    constructor(player) {
        this.player = player;

        // Game State
        this.isPaused = false;

        // gameDimensions
        this.blockCountX = 5;
        this.blockCountY = 6;

        // TODO: include graphic offset
        // Move to game params?
        this.distMoveX = ctx.canvas.width / this.blockCountX;
        this.distMoveY = (ctx.canvas.height / this.blockCountY) - 18;
    }

    handleInput(input) {
        if (this.isPaused != true) {
            let pos = this.checkNextMove();
            switch (input) {
                case 'up':
                    if (pos.yUp) {
                        this.player.moveUp(this.distMoveY);
                    }
                    break;
                case 'down':
                    if (pos.yDown) {
                        this.player.moveDown(this.distMoveY);
                    }
                    break;
                case 'right':
                    if (pos.xRight) {
                        this.player.moveRight(this.distMoveX);
                    }
                    break;
                case 'left':
                    if (pos.xLeft) {
                        this.player.moveLeft(this.distMoveX);
                    }
                    break;
                case 'pause':
                    this.isRunning = !(this.isRunning);
            }
        }

    }

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
}

let player = new DynamicGamePiece('images/char-boy.png', 200, 388)
let allEnemies = [
    new DynamicGamePiece('images/enemy-bug.png', 0, 64, 4),
    new DynamicGamePiece('images/enemy-bug.png', 0, 144),
    new DynamicGamePiece('images/enemy-bug.png', 0, 224, 6)
]
let gameController = new GameController(player);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    gameController.handleInput(allowedKeys[e.keyCode]);
});