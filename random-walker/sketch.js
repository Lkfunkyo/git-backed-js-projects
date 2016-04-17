//Try to pause individual walkers
var walker = [],
  num = 2,
  on = true;

function Walker(xMin, xMax, yMin, yMax) {
  this.xMin = xMin;
  this.xMax = xMax;
  this.yMin = yMin;
  this.yMax = yMax;
  this.xRt = 0;
  this.yRt = 0;
  this.x = random(width);
  this.y = random(height);
  this.distance = 15;
  this.cS = 15;
  this.col = color(random(255), random(255), random(255));



  this.display = function() {
    var cS = this.cS;

    strokeWeight(5);
    stroke(255, 100);
    //fill(0, 230, 255, 100);
    fill(this.col, 100);
    ellipse(this.x, this.y, cS, cS);

  };
  this.move = function(){
    var xVal = random(0, 1);
    var yVal = random(0, 1);
    
    if(xVal > 0.5){
      this.x -= this.distance;
    } else{
      this.x += this.distance;
    }
    
    if(yVal > 0.5){
      this.y -= this.distance;
    } else{
      this.y += this.distance;
    }
  };
  this.left = function() {
    this.x -= this.distance;
  };

  this.right = function() {
    this.x += this.distance;
  };

  this.up = function() {
    this.y -= this.distance;
  };

  this.down = function() {
    this.y += this.distance;
  };

  this.stayInScreen = function() {
    //Add individual barriers

    var cS = this.cS;

    if (this.x < 0 + 5 - cS / 2) {
      this.x = width + cS / 2;
    } else if (this.x > width + cS / 2) {
      this.x = -cS / 2;
    }
    if (this.y > height + cS / 2) {
      this.y = -cS / 2;
    } else if (this.y < 0 - cS / 2) {
      this.y = height + cS / 2;
    }
  };
}