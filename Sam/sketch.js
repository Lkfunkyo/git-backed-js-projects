var pixels = [];

function setup() {
	createCanvas(displayWidth*2.5, displayHeight*2.5);
}

function draw() {
	stroke(19, 190, 40);

	for (var i = 0; i < pixels.length; i++) {
		pixels[i].display();

	}
	
	if (mouseIsPressed) {
		for (var i = 0; i < 10; i++) {
			pixels.push(new Pixel(random(-1.05, 1.05) * random(5, 10) + mouseX, random(-1.05, 1.05) * random(5, 10) + mouseY));
		}
	}
}

function erase() {
	pixels.splice(0, pixels.length);
}

function keyPressed() {
	if (keyCode == BACKSPACE) {
		background(255);
	}
}

function Pixel(x, y) {
	this.x = x;
	this.y = y;

	this.display = function() {
		point(x, y);
	}
}