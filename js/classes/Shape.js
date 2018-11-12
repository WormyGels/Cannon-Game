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
  constructor(game, width, height, initPosX, initPosY, color, isCircle = false) {
    this.width = width ;
    this.height = height ;
    this.color = color ;
    this.posX = initPosX ;
    this.posY = initPosY ;
    this.element = $("<div style='position: absolute ; top: "+this.posY+"px ; left: "+this.posY+"px ; width: "+this.width+"px ; height: "+this.height+"px ; background-color: "+this.color+";' class='shape'></div>") ;

    //append the shape to the gameboard
    game.board.append(this.element) ;

  }

  updatePos() {
    this.element.css("left", this.posX) ;
    this.element.css("top", this.posY) ;
  }


}
