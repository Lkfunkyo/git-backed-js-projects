var rectArray = [];

function setup(){
	createCanvas(displayWidth, displayHeight-105);
	
	
}

function draw(){
	background(255);
	
	for(var i = 0; i < rectArray.length; i ++){
		rectArray[i].display();
		rectArray[i].runAccel();
		rectArray[i].stayInScreen();
		rectArray[i].applyGravity();
		
		rectArray[i].bounceOff();
	}
	
	
	for(var i = 0; i < rectArray.length; i++){
		for(var j = 0; j < rectArray.length; j++){
			if(i!=j){
				rectArray[i].setOtherR(rectArray[j]);
				rectArray[i].avoid(rectArray[j]);
			}
		}
	}
}

function mouseClicked(){
	rectArray.push(new RectObj(mouseX, mouseY, 100, 50));
}