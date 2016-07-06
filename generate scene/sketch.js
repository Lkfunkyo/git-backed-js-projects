var img;

function preload(){
  img = generateBackground();
}


function setup() {
  createCanvas(displayWidth, displayHeight-105);
  
  
}

function draw() {
  generateScene(img);
}

function mouseClicked(){
  preload();
}

function generateBackground(){
  return loadImage('background images/' + round(random(0.5, 10.4)) + '.jpg');
}

function generateScene(bg){
  background(bg);
}