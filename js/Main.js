//DOM game object
var gamediv ;
var game ;
//Pi constant for convenience
var pi = Math.PI ;
//rotation of the cannon
var rot = 0 ;
var rotSpeed = pi/16 ;

//speed of the shot
var shotSpeed = 10 ;

//width and height of the gameboard
var width = 1500 ;
var height = 600 ;

//on jquery start
$(function() {

  start() ;
  $("#demo").click(function() {
    game.killClock() ;
    rot = 0 ;
    start() ;
  }) ;

}) ;

//start a new game
function start() {
  //get the game div
  gamediv = $("#gameboard") ;
  //declare game object for game engine we built
  //10 ticks is 100 fps (100 ticks per second close to 100fps)
  game = new Game(gamediv, width, height, "black") ;

  var cannon = new Shape(20, 60, width/2, height-60, "white", 0, 0) ;
  cannon.addKeyListener(function() {
    rot = (rot - rotSpeed) % pi ;
    cannon.setRotation(rot) ;
  }, 37) ;
  cannon.addKeyListener(function() {
    rot = (rot + rotSpeed) % pi ;
    cannon.setRotation(rot) ;
  }, 39) ;
  var cannonStand = new Shape(5, 40, width/2 + 8, height-40, "lightgray", 0, 0) ;
  game.addShape(cannonStand) ;
  game.addShape(cannon) ;

  //when we hit the up arrow
  $(document).keydown(function(k) {
    if (k.which == 38) {
      game.addShape(new Shape(20, 20, width/2, height-60, "red", shotSpeed, rot - pi/2)) ;
    }
  }) ;

}
