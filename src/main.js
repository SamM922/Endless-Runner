// Hi
let config = {
    type: Phaser.CANVAS,
    width: 1280,
    height: 960,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// Control vars
let keyA, keyD, keyLEFT, keyRIGHT, keyR;
// UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;