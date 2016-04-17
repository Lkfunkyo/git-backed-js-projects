var tissue = [];
var xNum = 44, yNum = 31;
var xSpace = 12, ySpace = xSpace;
var xStart = xSpace/2, yStart = ySpace/2;
var s, v;
function setup(){
  createCanvas(displayWidth, displayHeight-105);
  
  s = 1;
  v = createVector(0, 0);
  p = push();
  scale(s);
  translate(v);
  
  for(var i = 0; i < width/xNum; i++){
    tissue[i] = [];
    
    for(var j = 0; j < height/yNum; j++){
      tissue[i][j] = new Cell(i*width/xNum + xStart, j*height/yNum + yStart, width/xNum-xSpace, height/yNum-ySpace);
    }
  }
  
  console.log(width/45);
  
  
}

function draw(){
  for(var i = 0; i < width/xNum; i++){
    for(var j = 0; j < height/yNum; j++){
      tissue[i][j].display(color(0, 60), 5);
      tissue[i][j].run();
      
      if(i > 0 && j > 0 && i < width/xNum-1 && j < height/yNum-1){
        
      
        if(tissue[i-1][j].isDead() || tissue[i+1][j].isDead() || tissue[i][j-1].isDead() || tissue[i][j+1].isDead()){
          tissue[i][j].dying();
        }
      }
    }
  }
    
}

function mouseClicked(){
  for(var i = 0; i < width/xNum; i++){
    for(var j = 0; j < height/yNum; j++){
      if(tissue[i][j].isIn()){
        tissue[i][j].dying();
      }
    }
  }
}