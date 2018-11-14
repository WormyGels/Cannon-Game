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
var reloadSpeed = 1000 ;
var reloading = false ;

//speed of target
var targetSpeed = 1 ;
var targetDir = 0 ;
var target ;

//width and height of the gameboard
var width = 1500 ;
var height = 600 ;

//current level
var level = 1 ;
//current score
var score = 0 ;
//score rewarded per shot
var posScore = 1 ;
//the score required to progress to the next level
var requiredScore = 1 ;
//the starting balls (and balls gained per level)
var maxBalls = 10 ;
//start off at 10 balls
var balls = maxBalls ;

//buffer period for collisions
var bufferPeriod = false ;
var bufferTime = 1000 ;

//time for level message display
var levelChangeTime = 1000 ;

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

  //reset level, score
  score = 0 ;
  posScore = 1 ;
  level = 1 ;
  balls = maxBalls ;
  updateScore() ;

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
  target = new Shape(100, 10, 100, 60, "red", targetSpeed, 0) ;
  game.addShape(target) ;
  //when target gets to certain point, flip its direction
  game.addFunction(function() {
    if (target.posX > width-95 || target.posX <= 5) {
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
    if (!reloading && balls > 0) {
      var ball = new Shape(10, 10, width/2, height-60, "cyan", shotSpeed, rot - pi/2) ;
      game.addShape(ball) ;
      //update the score when the ball despawns in case the last shot was a miss
      game.addOnDespawn(function() {updateScore() ;}, ball) ;
      reloading = true ;
      balls-- ;
      //update the balls label
      $("#shot_num").text(balls) ;
      $("#shoot").get(0).play() ;
      setTimeout(function() {reloading = false ;}, reloadSpeed) ;
      //while ball is on screen, add listener
      game.addCollisionListener(function() {
        $("#hit").get(0).play() ;
        if (!bufferPeriod)
          score = score + posScore ;
        bufferPeriod = true ;
        setTimeout(function() {bufferPeriod = false ;}, bufferTime) ;
        updateScore() ;
        ball.hideShape() ;
      }, ball, target) ;
    }
  }, 32) ; //32 is spacebar

}
//go to the next level if we can
function updateScore() {

  if ((score >= requiredScore)) {
    //go to the next level
    level++ ;
    targetSpeed++ ;
    target.setVector(targetSpeed, targetDir) ;
    //give them maxBalls more balls
    balls += maxBalls ;
    requiredScore++ ;
    score = 0 ;
    game.displayMessage("Level "+level, levelChangeTime) ;
  }
  else if ((balls <= 0) && (game.shapes.length <= 3)) {
    //game over
    window.alert("Game over!") ;
  }

  //update the labels
  $("#level_num").text(level) ;
  $("#score_num").text(score) ;
  $("#shot_num").text(balls) ;
  $("#need_num").text(requiredScore) ;


}
