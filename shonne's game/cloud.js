function Cloud(x, y, size, numEdges){
  this.pos = createVector(x, y);
  this.vel = createVector(0, 0);
  this.accel = createVector(0, 0);
  
  this.size = size;
  this.numEdges = numEdges;
  this.minimum = createVector(0.85, 0.45);
  this.maximum = createVector(0.95, 0.55);
  
  this.col = random(120, 255);
  
  this.edges = [];
  
  for(var i = 0; i < this.numEdges; i++){
    this.edges.push(new Edge(this.pos, this.size, this.mimimum, this.maximum));
  }
  
  function Edge(pos, size, minimum, maximum){
    this.p = pos;
    this.s = size;
    this.mi = minimum;
    this.ma = maximum;
    
    
    this.x = random(this.s*this.ma.x, this.s*this.ma.x/2);
    this.y = random(this.p.y-this.s*this.ma.y/2, this.p.y+this.s*this.ma.y/2);
    this.l = random(this.s*this.mi.x, this.s*this.ma.x);
    this.w = random(this.s*this.mi.y, this.s*this.ma.y);
    
    
    
    this.display = function(){
      ellipse(this.x, this.y, this.l, this.w);
    };
  };
  
  this.display = function(){
    for(var i = 0; i < this.edges.length; i++){
      noStroke();
      
      fill(this.col);
      
      ellipse(this.pos.x, this.pos.y, this.size*this.maximum.x, this.size*this.maximum.y);
      this.edges[i].display();
    }
  };
  
  this.run = function(){
    for(var i = 0; i < this.edges.length; i++){
      this.edges[i].pos = this.pos;
    }
    
    this.vel.add(this.accel);
    this.pos.add(this.vel);
    
    this.accel.mult(0);
  };
  
  this.applyForce = function(f){
    var force = createVector(f.x, f.y);
    
    this.accel.add(force);
  };
}