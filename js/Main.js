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
  game = new Game(gamediv, 1500, 600, "black", true) ;
  var colors = ["white", "lightgray", "gray"] ;
  for (var i = 0 ; i < 1000 ; i++) {
    game.addShape(new Shape(game, 3, 3, 3*i+750, 3*i+300, colors[i%colors.length], 1*(i/100), i*Math.PI/4)) ;
  }
}
