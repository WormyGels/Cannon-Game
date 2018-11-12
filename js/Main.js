var gamediv ;

$(function() {
  //get the game div
  gamediv = $("#gameboard") ;
  //declare game object for game engine we built
  var game = new Game(gamediv, 1500, 600, "lightgray", true) ;
  game.addShape(new Shape(game, 10, 10, 50, 50, "red")) ;

}) ;
