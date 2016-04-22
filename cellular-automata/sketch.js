var tissue = [];
var xNum = 44;
var yNum = 31;
var xSpace = 12;
var ySpace = xSpace;
var xStart = xSpace / 2;
var yStart = ySpace / 2;
var song;

function preload() {
	//song = loadSound('sounds\\The Who - Teenage Wasteland -[ mymusicroad.net ].mp3');
	crackle = loadSound('sounds\\crackle.wav');

	//song.amp(0.125);
	crackle.amp(2);

	crackle.pause();
	//tissue.preload();
}


function setup() {
	createCanvas(displayWidth, displayHeight - 105);
	//song.loop();

	tissueFunctions.setup();

}

function draw() {
	background(25, 115, 35);
	
	tissueFunctions.draw();
}

function mouseClicked() {
	tissueFunctions.mouseClicked();
}

function keyTyped() {
	if (key == 'f') {
		if (fullScreen())
			fullScreen(false);
		else
			fullScreen(true);
	}
}

var tissueFunctions = {
	setup: function() {
		for (var i = 0; i < width / xNum; i++) {
			tissue[i] = [];

			for (var j = 0; j < height / yNum; j++) {
				tissue[i][j] = new Cell(random(1, 1.05)*i * width / xNum + xSpace / 2, random(1, 1.05)*j * height / yNum + ySpace / 2, width / xNum - xSpace, height / yNum - ySpace);
			}
		}
	},

	draw: function() {
		for (var i = 0; i < width / xNum; i++) {
			for (var j = 0; j < height / yNum; j++) {
				tissue[i][j].display(color(0, 60), 5);
				tissue[i][j].run();
				tissue[i][j].reenterScreen();
				tissue[i][j].runAccel();

				if (keyIsPressed && tissue[i][j].isDead() !== true) {
					if (keyCode == UP_ARROW)
						tissue[i][j].applyAntiGravity();
					if (keyCode == DOWN_ARROW)
						tissue[i][j].applyGravity();
					if (keyCode == RIGHT_ARROW)
						tissue[i][j].applyRightWind();
					if (keyCode == LEFT_ARROW)
						tissue[i][j].applyLeftWind();
				}
				
				if(tissue[i][j].isDead()){
					tissue[i][j].velocity.mult(0);
				}

				if (i > 0 && j > 0 && i < width / xNum - 1 && j < height / yNum - 1) {


					if (tissue[i - 1][j].isDead() || tissue[i + 1][j].isDead() || tissue[i][j - 1].isDead() || tissue[i][j + 1].isDead()) {
						tissue[i][j].dying();
					}
				}
			}
		}
	},

	mouseClicked: function() {
		for (var i = 0; i < width / xNum; i++) {
			for (var j = 0; j < height / yNum; j++) {
				if (tissue[i][j].isIn()) {
					tissue[i][j].dying();
				}

				if (tissue[i][j].isDead()) {
					crackle.play();
					crackle.loop();
				}
			}
		}
	}
}