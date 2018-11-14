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

    //the bg color (used in message method)
    this.bgColor = bgColor ;

    //array of collission listeners
    this.collision = [] ;

    //array of misc functions
    this.functions = [] ;

    //array of functions for despawn
    this.despawn = [] ;

    //clear it for new game possibility
    div.empty() ;

    //set the gameboard
    div.css("width", width+"px") ;
    div.css("height", height+"px") ;
    div.css("background-color", bgColor) ;
    div.css("position", "relative") ;

    var onUpdate = function(shapes, width, height, collision, functions, despawn) {
      for (var i = 0 ; i < shapes.length ; i++) {
          shapes[i].updatePos() ;
          shapes[i].updateRotation() ;
          if ((shapes[i].posX > width || shapes[i].posY > height) || (shapes[i].posX < 0 || shapes[i].posY < 0)) {
            //delete from dom
            shapes[i].deleteShape() ;
            //delete from array
            shapes.splice(i, 1) ;
            //call despawn function
            despawn[i]() ;
          }
      }
      for (var i = 0 ; i < collision.length ; i++) {
        collision[i]() ;
      }
      for (var i = 0 ; i < functions.length ; i++) {
        functions[i]() ;
      }
    }

    //loop through and update the positions and collision logic of every shape every tick
    this.clock = setInterval(onUpdate, this.tickrate, this.shapes, this.width, this.height, this.collision, this.functions, this.despawn) ;

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
  //remove a shape from the array
  remShape(shape) {
    var i = this.shapes.findIndex(function(e) {
      if (e == shape)
        return true
      else
        return false
    }) ;
    //remove it
    //dom
    this.shapes[i].deleteShape() ;
    //array
    this.shapes.splice(i, 1) ;
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
      ) {
          fun() ;
      }

    }) ;

  }
  addKeyListener(fun, key) {
    //array of keys that are pressed down
    var down = [] ;
    $(document).keydown(function(pressed) {
      down[pressed.which] = true ;
      if (down[key])
        fun() ;
      //console.log("down"+down) ;
    }) ;
    $(document).keyup(function(pressed) {
      down[pressed.which] = false ;
      //console.log("up"+down) ;
    }) ;
  }
  //misc functions for changing things during running
  addFunction(fun) {
    this.functions.push(fun) ;
  }

  addOnDespawn(fun, shape) {
    var i = this.shapes.findIndex(function(e) {
      if (e == shape)
        return true
      else
        return false
    }) ;
    this.despawn[i] = fun ;
  }

  //popup a message for a certain amount of time
  displayMessage(message, time) {
    var htmlString = "<div class='cent-cont'><p class='cent'>"+message+"</p></div>" ;
    //create a shape that covers the screen and has message
    var msg = new Shape(this.width, this.height, 0, 0, this.bgColor, 0, 0, false, htmlString) ;
    this.addShape(msg) ;
    setTimeout(function(inst, msg) {inst.remShape(msg) ;}, time, this, msg) ;
  }

}
