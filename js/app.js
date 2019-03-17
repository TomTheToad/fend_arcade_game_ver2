class GamePiece {
    constructor(image, x, y) {
        this.image = image;
        this.x = x;
        this.y = y;
    }

    render(dt) {
        ctx.drawImage(Resources.get(this.image), this.x, this.y)
    }

    update(dt) {

    }
}

// TODO: create a default bg image
class GameBlock extends GamePiece {
    constructor(col, row, x, y, bgImage = "images/stone-block.png", isPlayable = true) {
        super(bgImage, x, y);
        this.col = col;
        this.row = row;
        this.isPlayable = isPlayable;
    }
}
// GameBlockGrid Class
// Create the game grid and define locations
// Do not extend GameBlock
class GameBlockGrid {
    // Constructor
    // TODO: review variable names
    constructor(widthInPixels, heightInPixels, blockCountX, blockCountY, YOffSet = 0, XOffSet = 0) {
        this.widthInPixels = widthInPixels;
        this.heightInPixels = heightInPixels;
        this.blockCountX = blockCountX;
        this.blockCountY = blockCountY;
        this.YOffSet = YOffSet;
        this.XOffSet = XOffSet;
        this.blockWidth = (this.widthInPixels / this.blockCountX);
        this.blockHeight = (this.heightInPixels / this.blockCountY);
        this.blockCenter = {
            x: this.blockWidth / 2,
            y: this.blockHeight / 2,
        }
        this.grid = [];
    }

    getGameGrid() {
        return this.buildBlockGrid();
    }

    // Build game grid
    buildBlockGrid() {
        this.grid = [];
        for (let y = 0; y < this.blockCountY; y++) {
            let locY = (this.blockHeight + this.YOffSet) * y;
            for (let x = 0; x < this.blockCountX; x++) {
                let locX = (this.blockWidth + this.XOffSet) * x;
                let newBlock = new GameBlock(x, y, locX, locY);
                this.grid.push(newBlock);
            }
        }
        // TODO: make this private?
        // User getter / setter?
        return this.grid
    }

    buildCustomBlockGrid(blockImageArray, unplayableImage = 'images/water-block.png') {
        this.grid = [];
        blockImageArray;
        let imageCounter = 0;
        for (let y = 0; y < this.blockCountY; y++) {
            let locY = (this.blockHeight + this.YOffSet) * y;
            for (let x = 0; x < this.blockCountX; x++) {
                let isPlayable = true;
                let image = blockImageArray[imageCounter];
                if (image == unplayableImage) {
                    isPlayable = false;
                }
                let locX = (this.blockWidth + this.XOffSet) * x;
                let newBlock = new GameBlock(x, y, locX, locY, image, isPlayable);
                this.grid.push(newBlock);
                imageCounter++;
            }
        }
        return this.grid;
    }
}

class DynamicGamePiece extends GamePiece {
    constructor(image, x, y, xMoveModifier = 1) {
        super(image, x, y)
        this.xMoveModifier = xMoveModifier;
        this.originX = x;
        this.originY = y;
    }

    // TODO: keep howFar? Allow for easily changing move distance in an instance.
    moveUp(howFar) {
        this.y -= howFar;
    }

    moveDown(howFar) {
        this.y += howFar;
    }

    moveRight(howFar) {
        this.x += howFar * this.xMoveModifier;
    }

    moveLeft(howFar) {
        this.x -= howFar * this.xMoveModifier;
    }

    getCurrentPosition() {
        return {
            x: this.x,
            y: this.y,
        }
    }

    // Reset to starting position
    reset() {
        this.x = this.originX;
        this.y = this.originY;
    }
}
