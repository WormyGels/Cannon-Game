var gamediv ;
var game ;

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
  //10 tick = 100fps (100 ticks per second more or less 100 fps)
  game = new Game(gamediv, 1500, 600, "black", 10) ;
  var colors = ["white"] ;
  for (var i = 0 ; i < 10000 ; i++) {
    game.addShape(new Shape(3, 3, (i/8)+750, (i/8)+300, colors[i%colors.length], (i/600), (i/16)*Math.PI/4)) ;
  }
}
