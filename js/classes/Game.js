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
  constructor(div, width = 250, height = 250, bgColor = "black", debugging = false) {

    //debugging
    this.debug = debugging ;

    //have div available for other classes
    this.board = div ;

    //array of shapes
    this.shapes = [] ;
    //the number of miliseconds between updates in game logic (physics and collission)
    this.tickrate = 1000 ;

    //set the gameboard
    div.css("width", width+"px") ;
    div.css("height", height+"px") ;
    div.css("background-color", bgColor) ;
    div.css("position", "relative") ;

    var onUpdate = function(shapes) {
      for (var i = 0 ; i < shapes.length ; i++) {
          shapes[i].updatePos() ;
      }
      console.log("tick") ;
    }

    //loop through and update the positions and collision logic of every shape every tick
    setInterval(onUpdate, this.shapes, this.tickrate) ;

  }

  //add a shape to the shape array
  addShape(shape) {
    if (shape != null) {
      this.shapes.push(shape) ;
      if (this.debug)
        console.log("Shape added") ;
    }
  }

}
