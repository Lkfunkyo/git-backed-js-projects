var rectArray = [];
var mouseForce = [];
var angle = 0;
var bgImg;

function preload() {
	var img = "cosmonaut"; //round(random(1, 10));

	bgImg = loadImage("images\\" + img + ".jpg");
}

function setup() {
	createCanvas(displayWidth, displayHeight-40);
}

function draw() {
	background(bgImg);

	stroke(255);
	strokeWeight(4);
	noFill();

	//angle += 0.0625;
	
	ellipse(width/2, height/2, 100, 100);

	for (var i = 0; i < rectArray.length; i++) {
		mouseForce[i] = createVector(1 * sin(angle) + width / 2, 1 * cos(angle) + height / 2);
		mouseForce[i].sub(rectArray[i].pos);
		mouseForce[i].setMag(0.25);

		rectArray[i].display();
		rectArray[i].run();
		rectArray[i].runAccel();

		rectArray[i].stayInScreen();


		//rectArray[i].applyForce(mouseForce[i]);


		if (rectArray[i].floorVal) {
			rectArray[i].applyFloorFriction(0.99);
		}

		rectArray[i].applyGravity();

	}

	if (keyIsPressed) {
		for (var i = 0; i < rectArray.length; i++) {
			if (keyCode == LEFT_ARROW) {
				rectArray[i].applyLeftWind();
			}
			if (keyCode == RIGHT_ARROW) {
				rectArray[i].applyRightWind();
			}
			if (keyCode == UP_ARROW) {
				rectArray[i].applyAntiGravity();
			}
			if (keyCode == DOWN_ARROW) {
				rectArray[i].applyExtraGravity();
			}
			if (keyCode == BACKSPACE) {
				RectObj.amount -= rectArray.length;

				rectArray.splice(0, rectArray.length);
			}
		}
	}



}

function mousePressed() {
	rectArray.push(new RectObj(mouseX, mouseY, random(20, 70), random(20, 70)));

	for (var i = 0; i < rectArray.length; i++) {
		rectArray[i].setMinMaxVals(20, 70, 20, 70);
		rectArray[i].setBounce(0.1);
	}
	//console.log(rectArray[i].mass);
}

function keyTyped(){
	if(key == 'f'){
		if(fullscreen()){
			fullscreen(false);
		} else{
			fullscreen(true);
		}
	}
}