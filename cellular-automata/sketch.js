var space;

function setup() {
  createCanvas(displayWidth, displayWidth);
  
  space = 20;
  
  background(255);
  fill(255);
  strokeWeight(3);
  for(var i = 0; i < width; i += width/50){
  	for(var j = 0; j < height; j += height/50){
  		rect(i, j, 50-space, 50-space);
  	}
  }
}

function draw() {
  
}