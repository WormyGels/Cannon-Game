/*
* Jeremy Wells
* CS 396 - Project 4
* Shape class
* A part of the small game engine created for project
*/


class Shape {

  /*
  * Takes:
  * Game engine object, width height, initial position, and boolean if its circle
  */
  constructor(game, width, height, initPosX, initPosY, color, momentum, theta, isCircle = false) {
    this.width = width ;
    this.height = height ;
    this.color = color ;
    this.posX = initPosX ;
    this.posY = initPosY ;
    this.speed = momentum ;
    this.theta = theta ;
    this.element = $("<div style='position: absolute ; top: "+this.posY+"px ; left: "+this.posY+"px ; width: "+this.width+"px ; height: "+this.height+"px ; background-color: "+this.color+";' class='shape'></div>") ;

    //append the shape to the gameboard
    game.board.append(this.element) ;

  }

  //update the width and height variables and move them on screen
  updatePos() {

    var yChange = this.speed * Math.sin(this.theta) ;
    var xChange = this.speed * Math.cos(this.theta) ;

    this.posX = this.posX + xChange ;
    this.posY = this.posY + yChange ;

    this.element.css("left", this.posX) ;
    this.element.css("top", this.posY) ;
  }

  deleteShape() {
    this.element.remove() ;
  }

}
