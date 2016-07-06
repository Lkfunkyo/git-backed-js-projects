var clouds = [];
var wind;

function setup() {
  createCanvas(displayWidth, displayHeight-105);
  
  wind = createVector(1, 0);
  
  for(var i = 0; i < 10; i++){
    clouds.push(new Cloud(random(width), random(200), random(50, 100), random(20, 100)));
  }
}

function draw() {
  background(0, 20, 50);
  
  for(var i = 0; i < clouds.length; i++){
    clouds[i].display();
    clouds[i].run();
  }
}

function mousePressed(){
  for(var i = 0; i < clouds.length; i++){
    clouds[i].applyForce(wind);
  }
}