// app.model.js (previously app.js)
// A file location for model classes used in the game.

// GamePiece class
// Base class for all game pieces.
// take three arguments required by html5 canvas
// sprite (image in this case) and x and y coordinates.
class GamePiece {
    constructor(image, x, y) {
        this.image = image;
        this.x = x;
        this.y = y;
    }

    // Use ctx, component of canvas, globally declared by engine.js
    // Draws to canvas
    render() {
        ctx.drawImage(Resources.get(this.image), this.x, this.y)
    }

    // TODO: Delete this?
    // This may have been rendered useless by update in app.gameController
    update(dt) {

    }
}

// GameBlock class
// Class for a single game block used to build the background,
// or board, depending on which build is being used.
class GameBlock extends GamePiece {
    constructor(col, row, x, y, bgImage = "images/stone-block.png", isPlayable = true) {
        super(bgImage, x, y);
        this.col = col;
        this.row = row;
        this.isPlayable = isPlayable;
    }
}

// GameBlockGrid class
// A more robust board building class used to assemble arrays of game blocks.
// arguments:
//  widthInPixels: board width in pixels
//  heightInPixels: board height in pixels
//  blockCountX: number of blocks per row
//  blockCountY: number of rows
//  YOffSet: used to adjust for block bg images having nonplayable area for asthetic
//  XoffSet: same as above yet not yet utilized in this version of the game.
// Note: This class is utilized in this version however it was built for a bg scrolling version
// which will hopefully be added here eventually.
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

    // Getter for game grid.
    getGameGrid() {
        return this.buildBlockGrid();
    }

    // Quick build a game grid / board based on the default bg image.
    // Returns the generated grid for use which GameController
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

    // Build game grid / board based off a simple array (see app.levels.js)
    // Takes 2 arguments:
    //  buildImageArray: an array of images which represent game spaces
    //  unplayableImage: a convenience method to set an area the player cannot move to
    // Returns the generated grid for use which GameController
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

// DynamicGamePiece class 
// Extends the base class GamePiece
// Adds movement and reset functionality.
// Takes 4 arguments: 3 free GamePiece
// Adds argument xMoveModifier to set an items default speed.
// NOTE: This class could be broken up into Player and Enemy if required.
class DynamicGamePiece extends GamePiece {
    constructor(image, x, y, xMoveModifier = 1) {
        super(image, x, y)
        this.xMoveModifier = xMoveModifier;
        this.originX = x;
        this.originY = y;
        this.previousPos = { x: this.x, y: this.y };
    }

    // TODO: keep howFar? Allow for easily changing move distance in an instance.
    // Move<up, down, right, left> 
    // Moves the game piece in the given directions and calls method to set previous position.
    // Takes one argument. How far to move. Presumably in pixels.
    moveUp(howFar) {
        this.setLastPos();
        this.y -= howFar;
    }

    moveDown(howFar) {
        this.setLastPos();
        this.y += howFar;
    }

    moveRight(howFar) {
        this.setLastPos();
        this.x += howFar * this.xMoveModifier;
    }

    moveLeft(howFar) {
        this.setLastPos();
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

    // Set previous position for rapid return
    // Used when trying to move to an illegal space.
    setLastPos() {
        this.previousPos = this.getCurrentPosition();
    }

    // Returns player to last position.
    // Used when trying to move to an illegal space.
    returnToLastPos() {
        if (this.previousPos) {
            this.x = this.previousPos.x
            this.y = this.previousPos.y
        }
    }
}
