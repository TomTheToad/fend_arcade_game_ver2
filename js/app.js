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
