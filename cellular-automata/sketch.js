var tissue = [];
var xNum = 44;
var yNum = 31;
var xSpace = 12;
var ySpace = xSpace;
var xStart = xSpace / 2;
var yStart = ySpace / 2;

function setup() {
  createCanvas(displayWidth, displayHeight - 105);

  tissueFunctions.setUp();

}

function draw() {
  background(25, 115, 35);

  tissueFunctions.display();

}

function mouseClicked() {
  tissueFunctions.clicked();
}

var tissueFunctions = {
  setUp: function() {
    for (var i = 0; i < width / xNum; i++) {
      tissue[i] = [];

      for (var j = 0; j < height / yNum; j++) {
        tissue[i][j] = new Cell(i * width / xNum + xSpace / 2, j * height / yNum + ySpace / 2, width / xNum - xSpace, height / yNum - ySpace);
      }
    }
  },

  display: function() {
    for (var i = 0; i < width / xNum; i++) {
      for (var j = 0; j < height / yNum; j++) {
        tissue[i][j].display(color(0, 60), 5);
        tissue[i][j].run();
        tissue[i][j].stayInScreen();

        if (i > 0 && j > 0 && i < width / xNum - 1 && j < height / yNum - 1) {


          if (tissue[i - 1][j].isDead() || tissue[i + 1][j].isDead() || tissue[i][j - 1].isDead() || tissue[i][j + 1].isDead()) {
            tissue[i][j].dying();
          }
        }
      }
    }
  },

  clicked: function() {
    for (var i = 0; i < width / xNum; i++) {
      for (var j = 0; j < height / yNum; j++) {
        if (tissue[i][j].isIn() && !tissue[i][j].isDead()) {
          tissue[i][j].dying();
        }

        if (tissue[i][j].isIn()) {
          tissue[i][j].dying();
        }
      }
    }
  }
}