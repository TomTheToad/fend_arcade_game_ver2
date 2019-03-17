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

        // TODO: include graphic offset
        // Move to game params?
        this.distMoveX = ctx.canvas.width / this.blockCountX;
        this.distMoveY = (ctx.canvas.height / this.blockCountY) - 18;

        // Score Fields
        this.scoreBoard = document.getElementById('score');
        this.score = 0;
    }

    handleInput(input) {
        if (this.isPaused == false) {
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

    render() {
        if (this.blockGrid != null) {
            this.blockGrid.forEach(block => block.render());
        }
        this.player.render();
        this.enemies.forEach(enemy => enemy.render());
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

    // TODO: refactor / combine with collision check?
    checkMoveBlocked(player = this.player) {
        this.blockGrid.forEach(block => {
            let pos = player.getCurrentPosition();
            if (block.isPlayable == false) {
                let xMin = block.x - 5;
                let xMax = block.x + 50;
                let yMin = block.y - 30;
                // TODO: fix code smell
                let yMax = block.y + 50;
                // console.log(`x: ${pos.x}, y: ${pos.y}, xMin: ${xMin}, xMax: ${xMax}, yMin: ${yMin}, yMax: ${yMax}`);
                if ((pos.x > xMin) && (pos.x < xMax) && (pos.y > yMin) && (pos.y < yMax)) {
                    player.returnToLastPos();
                }
            }
        });
    }

    winCheck() {
        if (this.player.y < 0) {
            this.isPaused = true;
            this.updateScore(10);
            this.reset();
        }
    }

    // TODO: Why not use this for blocks as well?
    // Use arguments for diff min, max, and callback?
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

    updateScore(num) {
        this.score += num;
        this.scoreBoard.innerText = this.score;
    }

    reset() {
        this.player.reset();
        this.isPaused = false;
    }
}

let player = new DynamicGamePiece('images/char-boy.png', 200, 388)
let allEnemies = [
    new DynamicGamePiece('images/enemy-bug.png', 0, 64, 4),
    new DynamicGamePiece('images/enemy-bug.png', 0, 144),
    new DynamicGamePiece('images/enemy-bug.png', 0, 224, 6)
]

let gameBlockGrid = new GameBlockGrid(ctx.canvas.width, ctx.canvas.height, 5, 6, -18, 0);
let allBlocks = gameBlockGrid.buildCustomBlockGrid(level1);
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