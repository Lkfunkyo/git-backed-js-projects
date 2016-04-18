var sand = [];
var g;

var forces = {
	gravity: 0,
	antigravity: 0,
	extragravity: 0,
	rightWind: 0,
	leftWind: 0,
	randomForce: 0,
};

function setup() {
	createCanvas(displayWidth, displayHeight - 105);
	
	forces.gravity = createVector(0, 2);
	forces.antigravity = createVector(0, -4);
	forces.extragravity = createVector(0, 4);
	forces.rightWind = createVector(0.35, 0);
	forces.leftWind = createVector(-0.35, 0);
	
	forces.gravity.setMag(0.2);
	forces.antigravity.setMag(5);
	forces.extragravity.setMag(2);
	forces.rightWind.setMag(4);
	forces.leftWind.setMag(4);

}

function draw() {
	background(255);
	
	
	
	
	for(var i = 0; i < sand.length; i++){
		sand[i].display();
		sand[i].runAccel();
		sand[i].applyForce(h);
		sand[i].stayInScreen();
		sand[i].bounceOn(0.7);
		
		
	}
	
	for(var i = 0; i < sand.length; i++){
		for(var j = 0; j < sand.length; j++){
			if(i!=j){
				sand[i].run(sand[j]);
				sand[i].avoid(sand[j], 3);
			}
		}
	}
}

function mouseDragged(){
	sand.push(new RoundObj(mouseX, mouseY, 60));
}

function keyPressed() {

	for (var i = 0; i < sand.length; i++) {
		if (keyCode == RIGHT_ARROW) {
			//forces.rightWind.mult(sand[i].cS * 0.34);
			sand[i].applyForce(forces.rightWind);
		}
		if (keyCode == LEFT_ARROW) {
			//forces.leftWind.mult(sand[i].cS * 0.34);
			sand[i].applyForce(forces.leftWind);
		}
		if (keyCode == UP_ARROW) {
			sand[i].applyForce(forces.antigravity);

		}
		if (keyCode == DOWN_ARROW) {
			sand[i].applyForce(forces.extragravity);
		}

	}
	if (keyCode == ENTER) {
		sand.push(new RoundObj(mouseX, mouseY, 20));
	}

	if (keyCode == BACKSPACE) {
		sand.splice(0, creatures.length);
	}

	if (keyCode == ESCAPE) {
		var fs = fullScreen();
		fullScreen(!fs);
	}
}