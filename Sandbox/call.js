var rectArray = [];

var bgImg;

function preload() {
	var img = "cosmonaut";//round(random(1, 10));
	
	bgImg = loadImage("images\\" + img + ".jpg");
}

function setup() {
	createCanvas(displayWidth, displayHeight - 105);
	
}

function draw() {
	background(bgImg);

	stroke(255);
	strokeWeight(4);
	noFill();

	for (var i = 0; i < rectArray.length; i++) {


		rectArray[i].display();
		rectArray[i].run();
		rectArray[i].runAccel();

		rectArray[i].stayInScreen();
		
		if (rectArray[i].floorVal){
			rectArray[i].applyFriction(0.96);
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
	rectArray.push(new RectObj(mouseX, mouseY, random(30, 70), random(30, 70)));
	
	for(var i = 0; i < rectArray.length; i++){
		rectArray[i].setMinMaxVals(20, 70, 20, 70);
	}
}