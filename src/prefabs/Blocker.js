class Blocker extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update() {
        // Movement up and down
        if (keyUP.isDown && this.y >= this.width) {
            this.y -= 2;
        } else if (keyDOWN.isDown && this.y <= game.config.height - this.width) {
            this.y += 2;
        }
    }
}