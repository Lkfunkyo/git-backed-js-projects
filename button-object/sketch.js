var btnObj;
var buttons = [];
var grow, r, rt;
var fillOn, unfillOn;
var a, b;

public class() dragon{
	
}

function setup() {
  var canvas = createCanvas(displayWidth, displayHeight - 105);
  
  a = color(0);
  b = color(0, 255, 0);
  fillOn = 1;
  unfillOn = 1;
	
  r = 0;
  rt = 5;
  grow = 0;

  btnObj = {
    obj1: {
      x: width - 205,
      y: 55,
      l: 100,
      w: 50,
      r: 10,


      b: {
        col: color(0, 230, 255),
        s: color(56, 60),
        sWeight: 4
      },
      t: {
        message: 'Fill Gauge',
        size: 16,
        col: color(255),
        s: color(0),
        sWeight: 4,
        font: 'fantasy'
      },
    },
    obj2: {
      x: 105,
      y: 55,
      l: 100,
      w: 50,
      r: 10,


      b: {
        col: color(0, 230, 255),
        s: color(56, 60),
        sWeight: 4
      },
      t: {
        message: 'Unfill Gauge',
        size: 16,
        col: color(255),
        s: color(0),
        sWeight: 4,
        font: 'fantasy'
      },
    }
  };
  buttons[0] = new Button(btnObj.obj1);
  buttons[1] = new Button(btnObj.obj2);
}

function draw() {
  background(255);
  strokeWeight(3);
  rectMode(CORNER);

  noStroke();

  fill(255);
  rect(width - 60, 0, 50, height);


  fill(255, 0, 0);
  rect(width - 57.5, height + 50 - grow, 46, height, r, r, 0, 0);



  stroke(0);
  noFill(0);
  rect(width - 60, 50, 50, height, 50, 50, 0, 0);

  if (grow > height - 5) {
    fillOn = 0;
    r += 7;
  } else {
    r = 0;
    fillOn = 1;

    if (grow < 0) {
      unfillOn = 0;
    } else {
      unfillOn = 1;
    }
  }

  buttons[0].display();
  buttons[1].display();

  if (mouseIsPressed) {
    if (fillOn) {
      buttons[0].clicked(fillGauge);
    }
    if (unfillOn) {
      buttons[1].clicked(unfillGauge);
    }

  }
}

function mouseClicked() {

}

function fillGauge() {
  //console.log('works');
  grow += rt;
}

function unfillGauge() {
  grow -= rt;
}

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
    message: obj.t.message || 'press',
    col: obj.t.col || color(255),
    s: obj.t.s || color(0),
    sWeight: obj.t.sWeight || 1
  };


  this.display = function() {
    textAlign(CENTER, CENTER);
    rectMode(CENTER, CENTER);

    fill(this.b.col);
    stroke(this.b.s);
    strokeWeight(this.b.sWeight);

    rect(this.pos.x, this.pos.y, this.l, this.w, this.r);

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