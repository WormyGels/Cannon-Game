var gamediv ;

$(function() {
  //get the game div
  gamediv = $("#gameboard") ;
  //declare game object for game engine we built
  var game = new Game(gamediv, 1500, 600, "black", true) ;
  game.addShape(new Shape(game, 20, 20, 1500, 50, "red", 1, 3*Math.PI/4)) ;
  game.addShape(new Shape(game, 20, 20, 1500, 70, "blue", 1.1, 3*Math.PI/4)) ;
  game.addShape(new Shape(game, 20, 20, 1500, 90, "green", 1.2, 3*Math.PI/4)) ;



}) ;
