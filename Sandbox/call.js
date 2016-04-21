var rectArray = [];

var bgImg;

function preload(){
	bgImg = loadImage("11.jpg");
}

function setup(){
	createCanvas(displayWidth, displayHeight-105);
	
	
}

function draw(){
	background(bgImg);
	
	stroke(255);
	strokeWeight(4);
	noFill();
	
	for(var i = 0; i < rectArray.length; i ++){
		
		
		rectArray[i].display();
		rectArray[i].runAccel();
		
		rectArray[i].stayInScreen();
		rectArray[i].applyFriction(0.99);
		rectArray[i].applyGravity();
		
	}
	
	
	for(var i = 0; i < rectArray.length; i++){
		for(var j = 0; j < rectArray.length; j++){
			if(i!=j){
				rectArray[i].runOtherC(rectArray[j]);
				rectArray[i].avoid(rectArray[j]);
			}
		}
	}
	
	if(keyIsPressed){
		for(var i = 0; i < rectArray.length; i++){
			if(keyCode == LEFT_ARROW){
				rectArray[i].applyLeftWind();
			}
			if(keyCode == RIGHT_ARROW){
				rectArray[i].applyRightWind();
			}
			if(keyCode == UP_ARROW){
				rectArray[i].applyAntiGravity();
			}
			if(keyCode == DOWN_ARROW){
				rectArray[i].applyExtraGravity();
			}
			if(keyCode == BACKSPACE){
				rectArray.splice(0, rectArray.length);
			}
		}
	}
}

function mouseClicked(){
	rectArray.push(new RoundObj(mouseX, mouseY, random(30, 150)));
}