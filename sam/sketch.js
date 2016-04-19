var buttons = [];
var btnObj = {
	b: {},
	t: {}
};
function setup() {
  createCanvas(displayWidth, displayHeight-105);
  
  for(var i = 0; i < width; i += width/6){
  	buttons[0.5] = new Button(btnObj);
  	console.log(i/width/6);
  }
}

function draw() {
  buttons[0.5].display(1, 1, 100, 50);
  //buttons[1].display(width/3, 1, 100, 50);
  //buttons[2].display(1, 1, 100, 50);
  //buttons[3].display(1, 1, 100, 50);
  //buttons[4].display(1, 1, 100, 50);
  //buttons[5].display(1, 1, 100, 50);
}