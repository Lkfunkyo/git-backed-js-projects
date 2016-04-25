var bgImg;
var s = [];

function preload() {
	var img = "cosmonaut"; //round(random(1, 10));

	bgImg = loadImage("images\\" + img + ".jpg");
}

function setup() {
	createCanvas(displayWidth, displayHeight - 40);

	for (var i = 0; i < 1; i++) {
		var size = random(40, 100);

		s.push(new Spindle(random(width), random(height), random(50, 100), size, size, 30, 9, 9, 625));
	}


}

function draw() {
	background(bgImg);

	stroke(255);
	strokeWeight(4);
	noFill();

	for (var i = 0; i < s.length; i++) {
		s[i].display();
		s[i].runAccel();
		s[i].stayInScreen();
		//s[i].applyGravity();
		
		if(s[i].floorVal){
			s[i].applyFloorFriction();
		}
	}

	if (keyIsPressed) {
		for (var i = 0; i < s.length; i++) {
			if (keyCode == LEFT_ARROW) {
				s[i].applyLeftForce();
			}
			if (keyCode == RIGHT_ARROW) {
				s[i].applyRightForce();
			}
			if (keyCode == UP_ARROW) {
				s[i].applyUpwardForce();
			}
			if (keyCode == DOWN_ARROW) {
				s[i].applyExtraGravity();
			}


			// if (keyCode == BACKSPACE) {
			// 	RectObj.amount -= roundArray.length;

			// 	roundArray.splice(0, roundArray.length);
			// }
			
		}


	}
}


function keyTyped() {
	if (key == 'f') {
		if (fullscreen()) {
			fullscreen(false);
		} else {
			fullscreen(true);
		}
	}
}