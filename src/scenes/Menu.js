class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        this.load.image('field', './assets/field.png');
    }

    create() {
        this.add.text(20, 20, 'test');
    }

    update() {

    }
}