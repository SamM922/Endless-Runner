/* Ideation
You are an RB running endlessly down the field with randomly generated defenders coming at you
You can move (either lanes or freely) and have a stiff arm ability with a cooldown
Maybe different types of defenders but scope isn't large
Score is Yards Gained
Sound effects at start recorded by me, play a random one
If possible some kind of start animation
*/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// Control vars
let keyR, keyM, keyUP, keyDOWN, keyRIGHT;
// UI values
let separationVal = game.config.height / 10;
let separationVal2 = separationVal / 3;