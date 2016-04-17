var c;
var i;

function setup() {
	createCanvas(displayWidth, displayHeight - 105);

	c = new RoundObj(width *(2/3), height / 2, 25);
	
	c.velocity.limit(1);

}

function draw() {
	background(0);
	
	stroke(255);
	
	fill(0);
	
	var j = createVector(0, 1);
	var mouse = createVector(mouseX, mouseY);
	
	mouse.sub(c.pos);
	mouse.setMag(0.25);
	
	j.setMag(0.1);
	
	c.lines(mouseX, mouseY);

	c.display();
	
	c.runAccel();
	
	if(mouseIsPressed)
	c.applyForce(mouse);
	c.applyForce(j);
	
	c.stayInScreen();
	
}