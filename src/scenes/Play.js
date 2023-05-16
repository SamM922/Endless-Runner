class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
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
        this.gameOver = false;
        // Background
        this.field = this.add.tileSprite(0, 0, 640, 480, 'field').setOrigin(0, 0);
        // Text config
        let textConfig = {
            fontFamily: 'Consolas',
            fontSize: '24px',
            backgroundColor: '#0022ff',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // Score
        this.scoreText = this.add.text(game.config.width / 2, game.config.height / 12, 'Yards: ' + this.score, textConfig).setOrigin(0, 0);
        this.highScoreText = this.add.text(game.config.width / 1.4, game.config.height / 12, 'High: ' + this.highScore, textConfig).setOrigin(0, 0);
        // Controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // Player
        this.RB = new RB(this, game.config.width / 100, game.config.height / 2.5, 'RB').setOrigin(0, 0);
    }

    update() {
        // Update score every 100 frames
        if (this.scoreCounter >= 100) {
            this.scoreCounter = 0;
            this.score += 1;
            this.scoreText.text = 'Yards: ' + this.score;
        } else {
            this.scoreCounter += 1;
        }
        // Scroll Background
        this.field.tilePositionX += 1;
    }
}