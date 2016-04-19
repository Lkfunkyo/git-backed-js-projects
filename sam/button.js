function Button(obj) {
  this.x = obj.x || width / 2;
  this.y = obj.y || height / 2;

  this.pos = createVector(this.x, this.y);
  this.l = obj.l || 100;
  this.w = obj.w || 50;
  this.r = obj.r || 0;

  this.b = {
    col: obj.b.col || color(255),
    s: obj.b.s || color(0),
    sWeight: obj.b.sWeight || 1
  };
  this.t = {

    font: obj.font || 'sans-serif',
    size: obj.t.size || 20,
    message: obj.t.message || '',
    col: obj.t.col || color(255),
    s: obj.t.s || color(0),
    sWeight: obj.t.sWeight || 1
  };


  this.display = function(x, y, l, w, r) {
    var xVal = x || this.pos.x;
    var yVal = y || this.pos.y;
    var lVal = l || this.l;
    var wVal = w || this.w;
    var rVal = r || this.r;

    fill(this.b.col);
    stroke(this.b.s);
    strokeWeight(this.b.sWeight);

    rect(xVal, yVal, lVal, wVal, rVal);

    strokeWeight(3);

    fill(this.t.col);
    stroke(this.t.s);
    strokeWeight(this.t.sWeight);

    textFont(this.t.font, this.t.size);

    text(this.t.message, this.pos.x, this.pos.y);
  };

  this.clicked = function(callback) {
    if (mouseX > this.pos.x - this.l / 2 && mouseX < this.pos.x + this.l / 2 && mouseY > this.pos.y - this.w / 2 && mouseY < this.pos.y + this.w / 2 && callback !== null) {
      callback();
    }
  };

  this.changeColor = function(bCol, tCol) {

  };
}