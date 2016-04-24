var points = [];
var mouse = [];
var angle = 0;
var bg;

function preload() {
	var img = round(random(1, 10));

	bgImg = loadImage("images\\" + img + ".jpg");
}

function setup() {
	createCanvas(displayWidth, displayHeight - 105);

	for (var i = 0; i < width; i += width / 20) {
		for (var j = 0; j < height; j += height / 20) {
			points.push(new Sand(i, j, 2, 2));
		}
	}
}

function draw() {
	background(bgImg);
	rotate(angle);
	for (var i = 0; i < points.length; i++) {
		mouse[i] = createVector(mouseX, mouseY);
		mouse[i].sub(points[i].pos);
		mouse[i].setMag(0.25);


		points[i].display();
		points[i].runAccel();
		points[i].stayInScreen();

		if (mouseIsPressed) {
			points[i].applyForce(mouse[i]);
		}
		if (keyIsPressed) {

			if (keyCode == LEFT_ARROW) {
				//points[i].applyLeftForce();

				angle -= 0.0625;
			}
			if (keyCode == RIGHT_ARROW) {
				//points[i].applyRightForce();

				angle += 0.0625;
			}
			if (keyCode == UP_ARROW) {
				points[i].applyUpwardForce();
			}
			if (keyCode == DOWN_ARROW) {
				points[i].applyExtraGravity();
			}
			if (keyCode == BACKSPACE) {
				points.splice(0, points.length);
			}



			// if (keyCode == BACKSPACE) {
			// 	RectObj.amount -= roundArray.length;

			// 	roundArray.splice(0, roundArray.length);
			// }




		}

	}
}

function keyTyped() {
	if (key == '-') {
		points.splice(points.length - 1, 4);
	}
}

function keyPressed() {
	if (keyCode == ENTER) {
		points.push(new Sand(mouseX, mouseY, 2, 2));
	}
}

function mouseDragged() {

}