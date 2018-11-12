var gamediv ;
var game ;
var pi = Math.PI ;

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

  var shape1 = new Shape(20, 20, 0, 0, "red", 3, pi/4) ;
  var shape2 = new Shape(20, 20, 580, 580, "blue", 3, 5*pi/4) ;


  game.addShape(shape1) ;
  game.addShape(shape2) ;
  game.addCollisionListener(function() {
    console.log("1 and 2 collide") ;
  }, shape1, shape2) ;

}
