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
  constructor(width, height, initPosX, initPosY, color, momentum, theta, isCircle = false) {
    this.width = width ;
    this.height = height ;
    this.color = color ;
    this.posX = initPosX ;
    this.posY = initPosY ;
    this.speed = momentum ;
    this.theta = theta ;
    this.rotation = 0 ;
    this.keyPress = [] ;
    this.element = $("<div style='position: absolute ; top: "+this.posY+"px ; left: "+this.posY+"px ; width: "+this.width+"px ; height: "+this.height+"px ; background-color: "+this.color+";' class='shape'></div>") ;

  }

  //update the width and height variables and move them on screen
  updatePos() {
    //find the changes in x and y
    var yChange = this.speed * Math.sin(this.theta) ;
    var xChange = this.speed * Math.cos(this.theta) ;
    //update the positions
    this.posX = this.posX + xChange ;
    this.posY = this.posY + yChange ;
    //update css
    this.element.css("left", this.posX) ;
    this.element.css("top", this.posY) ;
  }

  //delete a shape from the DOM
  deleteShape() {
    this.element.remove() ;
  }
  //hide a shape from the DOM (point scored maybe)
  hideShape() {
    this.element.css("display", "none") ;
  }
  //set the rotation of the shape
  setRotation(degrees) {
    this.rotation = degrees ;
  }
  //update the rotation of the shape
  updateRotation() {
    this.element.css("transform", "rotate("+this.rotation+"rad)") ;
  }
  //update the direction
  setVector(speed, theta) {
    this.speed = speed ;
    this.theta = theta ;
  }

}
