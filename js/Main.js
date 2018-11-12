var gamediv ;
var game ;
var pi = Math.PI ;
var rot = 0 ;

$(function() {

  start() ;
  $("#demo").click(function() {
    game.killClock() ;
    start() ;
  }) ;



}) ;

function start() {
  //get the game div
  gamediv = $("#gameboard") ;
  //declare game object for game engine we built
  //10 ticks is 100 fps (100 ticks per second close to 100fps)
  game = new Game(gamediv, 1500, 600, "black") ;

  var cannon = new Shape(20, 60, 750, 520, "white", 0, 0) ;
  cannon.addKeyListener(function() {
    rot = (rot - 10) % 360 ;
    cannon.setRotation(rot) ;
  }, 37) ;
  cannon.addKeyListener(function() {
    rot = (rot + 10) % 360 ;
    cannon.setRotation(rot) ;
  }, 39) ;
  var cannonStand = new Shape(5, 40, 758, 560, "lightgray", 0, 0) ;
  game.addShape(cannonStand) ;
  game.addShape(cannon) ;



}
