class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.highScore = 0;
    }

    preload() {
        this.load.image('RB', './assets/player.png');
        this.load.image('RBSA', './assets/playerSA.png');
        this.load.image('defender', './assets/defender.png');
        this.load.image('field', './assets/field.png');
    }

    create() {
        this.scoreCounter = 0;
        this.score = 0;
        // Background
        this.field = this.add.tileSprite(0, 0, 640, 480, 'field').setOrigin(0, 0);
    }

    update() {
        // Update score every few frames
        if (this.scoreCounter >= 5) {
            this.scoreCounter = 0;
            this.score += 1;
        } else {
            this.scoreCounter += 1;
        }
        // Scroll Background
        this.field.tilePositionX -= 2;
    }
}