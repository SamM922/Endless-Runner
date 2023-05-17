class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
        this.highScore = 0;
    }

    preload() {
        this.load.image('RB', './assets/player.png');
        this.load.image('blocker', './assets/blocker.png');
        this.load.image('defender', './assets/defender.png');
        this.load.image('field', './assets/field.png');
    }

    create() {
        this.scoreCounter = 0;
        this.score = 0;
        this.gameOver = false;
        this.canBlock = true;
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
        // Display
        this.scoreText = this.add.text(game.config.width / 2, game.config.height / 12, 'Yards: ' + this.score, textConfig).setOrigin(0, 0);
        this.highScoreText = this.add.text(game.config.width / 1.4, game.config.height / 12, 'High: ' + this.highScore, textConfig).setOrigin(0, 0);
        this.blockCooldownText = this.add.text(game.config.width / 8, game.config.height / 12, 'Block on cooldown', textConfig).setOrigin(0, 0);
        this.blockCooldownText.visible = false;
        // Controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // Player
        this.RB = new RB(this, game.config.width / 20, game.config.height / 2.5, 'RB').setOrigin(0.5);
        this.blocker = new Blocker(this, this.RB.x + 80, this.RB.y, 'blocker');
        this.blocker.visible = false;
        this.blockCooldown = 1500;
        this.defArray = [];
    }

    // Collision detection from different project I am part of, most of this code was written by Brannon Eakles: https://github.com/beakles/game-project
    checkCollision(object1, object2) {
        if (object1.x < object2.x + object2.width - 20 && object1.x + object1.width > object2.x && object1.y < object2.y + object2.height - 15 && object1.height + object1.y > object2.y + 15) {
            return true;
        }
        return false;
    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyM)) {
            this.scene.start('menuScene');
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            game.settings = {
                defenderSpeed: 1,
                spawnSpeed: 10,
                maxDefenders: 3
            }
            this.scene.restart();
        }
        if (!this.gameOver) {
            this.RB.update();
            this.blocker.update();
            // Update score every 100 frames
            if (this.scoreCounter >= 100) {
                this.scoreCounter = 0;
                this.score += 1;
                this.scoreText.text = 'Yards: ' + this.score;
            } else {
                this.scoreCounter += 1;
            }
            // Update difficulty
            if (this.score % 15 == 0 && this.scoreCounter == 0 && game.settings.spawnSpeed >= 3) {
                game.settings.spawnSpeed -= 1;
            }
            if (this.score % 25 == 0 && this.scoreCounter == 0 && game.settings.defenderSpeed <= 4) {
                game.settings.defenderSpeed += 0.5;
            }
            if (this.score % 30 == 0 && this.scoreCounter == 0 && game.settings.maxDefenders <= 5) {
                game.settings.maxDefenders += 1;
            }
            // Scroll Background
            this.field.tilePositionX += 1;
            // Blocker Ability
            if (keyRIGHT.isDown && this.canBlock == true) {
                this.blocker.visible = true;
            } else {
                this.blocker.visible = false;
            }
            // Blocker Cooldown
            if (this.canBlock == false) {
                if (this.blockCooldown == 0) {
                    this.canBlock = true;
                    this.blockCooldownText.visible = false;
                    this.blockCooldown = 1500;
                } else {
                    this.blockCooldownText.visible = true;
                    this.blockCooldown -= 1;
                }
            }
            // Enemies
            // Array logic idea also from Brannon Eakles: https://github.com/beakles/game-project
            if (this.defArray.length < game.settings.maxDefenders && this.scoreCounter % 33 == 0 && Phaser.Math.Between(1, game.settings.spawnSpeed) <= 2) {
                let newDef = new Defender(this, game.config.width, Phaser.Math.Between(0, game.config.height), 'defender');
                this.defArray.push(newDef);
            }
            // Update defenders
            for (let i = 0; i < this.defArray.length; i++) {
                let currentDef = this.defArray[i];
                // Game over check
                if (this.checkCollision(currentDef, this.RB)) {
                    if (this.score > this.highScore) {
                        this.highScore = this.score;
                    }
                    this.gameOver = true;
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
                    this.add.text(game.config.width / 2, game.config.height / 2, 'Tackled! R to run again, M for Menu', textConfig).setOrigin(0.5);
                }
                // Hit blocker check
                if (this.checkCollision(currentDef, this.blocker) && this.blocker.visible) {
                    this.canBlock = false;
                    currentDef.destroy();
                    this.defArray.splice(i, 1);
                }
                // Remove defender if it hits edge
                if (currentDef.x <= 0) {
                    this.defArray[0].destroy();
                    this.defArray.shift();
                }
                currentDef.update();
            }
        }
    }
}