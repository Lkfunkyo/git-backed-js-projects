var tissue = [];
var num = 50;
var space = 10;
var start = space/2;
  
void setup(){
  size(screenWidth, screenHeight);
  
  for(var i = 0; i < width/num; i++){
    tissue[i] = [];
    
    for(var j = 0; j < height/num; j++){
      tissue[i][j] = new Cell(i*width/num, j*height/num, width/num-space, height/num-space);
    }
  }
}

void draw(){
  for(var i = 0; i < width/num; i++){
    for(var j = 0; j < height/num; j++){
      tissue[i][j].display();
      tissue[i][j].run();
      
      if(i > 0 && j > 0 && i < width/num-1 && j < height/num-1){
        
      
        if(tissue[i-1][j].isDead() || tissue[i+1][j].isDead() || tissue[i][j-1].isDead() || tissue[i][j+1].isDead()){
          tissue[i][j].dying();
        }
      }
    }
  }
    
}

void mouseClicked(){
  for(var i = 0; i < width/num; i++){
    for(var j = 0; j < height/num; j++){
      if(tissue[i][j].isIn()){
        tissue[i][j].dying();
      }
    }
  }
}

function Cell(x, y, l, w){
  this.x = x;
  this.y = y;
  this.l = l;
  this.w = w;
  this.a = 255;
  this.minus = 0;
  this.state = false;
  
  this.display = function(s, sW){
    var st = s || color(0);
    var stW = sW || 1;
    
    stroke(st);
    strokeWeight(stW);
    
    fill(this.a, this.a, this.a);
    rect(this.x, this.y, this.l, this.w, 5);
  };
  
  this.run = function(){
    this.a -= this.minus;
    this.isDead();
    
    
    if(this.a < 1){
      this.minus = 0;
    }
    if(this.a < 255/2){
      this.state = true;
    }
  };
  
  this.dying = function(){
    if(this.a > 0){
      this.minus = 2;
    }
  };
  
  this.isIn = function(){
    if(mouseX > this.x && mouseX < this.x+this.l && mouseY > this.y && mouseY < this.y+this.w)
      return true;
    else
      return false;
  };
  
  this.isDead = function(){
    return this.state;
  };
}