/*
* Jeremy Wells - CS 396 - Project 4
* Small game engine main class
* Capable of rendering shapes and executing:
* 1. Vector based paths
* 2. Collission between shapes
* 3. Listeners on shapes
*/

class Game {

  //the div to place the game objects in, width and height of div (def: 250)
  constructor(div, width = 250, height = 250, bgColor = "black", tickrate = 10) {

    //have div available for other classes
    this.board = div ;

    //width and height
    this.width = width ;
    this.height = height ;

    //array of shapes
    this.shapes = [] ;
    //the number of miliseconds between updates in game logic (physics and collission)
    this.tickrate = tickrate ;

    //array of collission listeners
    this.collision = [] ;

    //clear it for new game possibility
    div.empty() ;

    //set the gameboard
    div.css("width", width+"px") ;
    div.css("height", height+"px") ;
    div.css("background-color", bgColor) ;
    div.css("position", "relative") ;

    var onUpdate = function(shapes, width, height, collision) {
      for (var i = 0 ; i < shapes.length ; i++) {
          shapes[i].updatePos() ;
          shapes[i].updateRotation() ;
          if ((shapes[i].posX > width || shapes[i].posY > height) || (shapes[i].posX < 0 || shapes[i].posY < 0)) {
            //delete from dom
            shapes[i].deleteShape() ;
            //delete from array
            shapes.splice(i, 1) ;
          }
      }
      for (var i = 0 ; i < collision.length ; i++) {
        collision[i]() ;
      }
    }

    //loop through and update the positions and collision logic of every shape every tick
    this.clock = setInterval(onUpdate, this.tickrate, this.shapes, this.width, this.height, this.collision) ;

  }

  //add a shape to the shape array
  addShape(shape) {
    if (shape != null) {
      //append the shape to the array
      this.shapes.push(shape) ;
      //append the shape to the gameboard (DOM)
      this.board.append(shape.element) ;
    }
  }

  //free memory function
  killClock() {
    clearInterval(this.clock) ;
  }

  //takes two shapes, and when they collide the function executes
  //NOTE collision listeners need to be designed to deal with the fact they will likely be executed more than once
  addCollisionListener(fun, shape1, shape2) {
    this.collision.push(function() {
      //if there is an intersection
      if (
        (shape1.posX >= shape2.posX) && (shape1.posX <= shape2.posX+shape2.width) &&
        (shape1.posY >= shape2.posY) && (shape1.posY <= shape2.posY+shape2.height)
      )
      //execute function passed
        fun() ;
    }) ;

  }

}
