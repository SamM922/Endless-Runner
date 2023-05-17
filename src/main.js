/* Name: Samuel Maturo
Title: Running Back: Endless Yards
Approximate hours: 10 for ideation and art, 15 for coding
Technical tilt: I'm very proud of the blocker ability I created. During ideation this was initially
going to be a 'stiff arm' ability but it changed to a blocker. I had to work through bugs where the
defenders were colliding with the invisible blocker and the cooldown not working. The most difficult
problem was correctly manipulating the defenders array when the blocker didn't block the frontmost
defender. I had to learn and try lots of different array manipulations like pop and shift, but
eventually splice came to the rescue.
Art tilt: At first I wanted a style of character similar to the game Retro Bowl (https://retrobowl.me/)
but I wasn't good enough to get what I wanted. I settled on the top down view which I think looks okay
and makes for a fun game. I'm super happy with the music I found, I cut it so that it gets very intense
when you're coming up to 100 score which is where the game is getting very difficult.
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