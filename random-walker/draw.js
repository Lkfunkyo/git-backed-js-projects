var walker = [], num = 20, on = true;
var userWalker;

function setup() {
  createCanvas(displayWidth, displayHeight-105);
  background(0);
  for (var i = 0; i < num; i++) {
    walker.push(new Walker(random(width), random(height)));  
  }
  
  userWalker = new Walker(0, 0, width/2, height/2);
}

function draw() {
  userWalker.display();
  userWalker.stayInScreen();

  if (on) {
    calledFunctions();
  }
}

function mouseClicked() {
  if (on == true) {
    on = false;
  } else {
    on = true;
  }
}

function keyPressed() {
  if (keyCode == BACKSPACE) {
    background(0);
  }
  if(keyCode == UP_ARROW){
    userWalker.up();
  } else if(keyCode == DOWN_ARROW) {
    userWalker.down();
  }
  
  if(keyCode == LEFT_ARROW){
    userWalker.left();
  } else if(keyCode == RIGHT_ARROW){
    userWalker.right();
  }

}
function keyTyped(){
  if(key == '+'){
    walker.push(new Walker(random(width), random(height)));
  } else if(key == '-'){
    walker.splice(walker.length-1, 1);
  }
}

function calledFunctions() {
    for (var i = 0; i < walker.length; i++) {
      walker[i].display();
      walker[i].stayInScreen();
      walker[i].move();
    }

  }