class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    
    preload() {
        this.load.image('field', './assets/field.png');
        // Music from Ross Bugden: https://www.youtube.com/watch?v=VPHAmrUTX1w
        this.load.audio('music', './assets/music.mp3');
        this.load.audio('hike', './assets/hike.mp3');
        // Whistle from https://freesound.org/s/418564/
        this.load.audio('whistle', './assets/whistle.mp3');
        this.load.audio('block', './assets/block.wav');
    }

    create() {
        this.add.image(0, 0, 'field').setOrigin(0, 0);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        // Menu text formal nearly identical to Rocket Patrol by Nathan Altice: https://github.com/nathanaltice/RocketPatrol
        let menuConfig = {
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
        this.add.text(game.config.width/2, game.config.height/2 - separationVal - separationVal2, 'Running Back: Endless Yards', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use UP and DOWN arrow keys to dodge defenders', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + separationVal + separationVal2, 'Hold RIGHT arrow for BLOCKER, press R to start!', menuConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            game.settings = {
                defenderSpeed: 1,
                spawnSpeed: 10,
                maxDefenders: 3
            }
            this.sound.play('hike');
            this.scene.start('playScene');
        }
    }
}