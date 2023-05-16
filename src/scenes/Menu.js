class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }
    
    preload() {
        this.load.image('field', './assets/field.png');
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
        this.add.text(game.config.width/2, game.config.height/2 + separationVal + separationVal2, 'RIGHT arrow to STIFF ARM, R to snap the ball!', menuConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('playScene');
        }
    }
}