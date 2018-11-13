//DOM game object
var gamediv ;
var game ;
//Pi constant for convenience
var pi = Math.PI ;
//rotation of the cannon
var rot = 0 ;
var rotSpeed = pi/16 ;

//speed of the shot
var shotSpeed = 5 ;
var reloadSpeed = 200 ;
var reloading = false ;

//speed of target
var targetSpeed = 5 ;
var targetDir = 0 ;

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
  //left and right arrows: 37 and 39 respectively
  game.addKeyListener(function() {
    rot = (rot - rotSpeed) % pi ;
    cannon.setRotation(rot) ;
  }, 37) ;
  game.addKeyListener(function() {
    rot = (rot + rotSpeed) % pi ;
    cannon.setRotation(rot) ;
  }, 39) ;
  var cannonStand = new Shape(5, 40, width/2 + 8, height-40, "lightgray", 0, 0) ;
  game.addShape(cannonStand) ;
  game.addShape(cannon) ;

  //moving target
  var target = new Shape(100, 10, 100, 60, "white", targetSpeed, 0) ;
  game.addShape(target) ;
  //when target gets to certain point, flip its direction
  game.addFunction(function() {
    if (target.posX > width-100 || target.posX <= 0) {
      //change direction of target
      if (targetDir == 0)
        targetDir = pi ;
      else
        targetDir = 0 ;
      target.setVector(targetSpeed, targetDir) ;
    }
  }) ;

  //when we hit the up arrow
  game.addKeyListener(function() {
    if (!reloading) {
      var ball = new Shape(10, 10, width/2, height-60, "gray", shotSpeed, rot - pi/2) ;
      game.addShape(ball) ;
      reloading = true ;
      setTimeout(function() {reloading = false ;}, reloadSpeed) ;
      //while ball is on screen, add listener
      game.addCollisionListener(function() {
        window.alert("HIT") ;
      }, ball, target) ;
    }
  }, 32) ; //32 is spacebar

}
