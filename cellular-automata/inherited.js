function World(x, y) {
	this.x = x;
	this.y = y;

	World.amount++;
}

function Mass(x, y){
	this.prototype = Object.create(World.prototype);
	
	World.call(this, x, y);
	
	Mass.amount++;
}

function RectObj(x, y, l, w) {
	this.prototype = Object.create(Mass.prototype);

	Mass.call(this, x, y);
	
	this.l = l;
	this.w = w;

	this.pos = createVector(this.x, this.y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);

	RectObj.amount++;
}

function RoundObj(x, y, cS) {
	this.prototype = Object.create(Mass.prototype);

	Mass.call(this, x, y);

	this.cS = cS;

	this.pos = createVector(this.x, this.y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);

	this.otherObj;
	this.distance;
	this.radiiSum;
	this.mouseDistance;
	
	this.display = function(){
		ellipse(this.pos.x, this.pos.y, this.cS, this.cS);
	};

	this.applyForce = function(force) {
		this.acceleration.add(force);
	};
	
	this.run = function(){
		this.velocity.add(this.acceleration);
		this.pos.add(this.velocity);
		
		this.acceleration.mult(0);
	};
	
	this.stayInScreen = function(){
		if(this.pos.x > width-this.cS/2 || this.pos.x < -this.cS/2){
			this.acceleration.mult(createVector(-1, 1));
		}
		if(this.pos.y > height-this.cS/2 || this.pos.y < -this.cS/2){
			this.acceleration.mult(createVector(1, -1));
		}
	};
	
	this.setOtherC = function(otherCreature){
		this.otherC = otherCreature;
	};

	this.intersects = function() {
		this.distance = dist(this.otherC.pos.x, this.otherC.pos.y, this.pos.x, this.pos.y);
		this.radiiSum = (this.otherC.cS + this.cS) / 2;

		if (this.distance < this.radiiSum) {
			return true;
		} else {
			return false;
		}
	};

	this.mouseIsIn = function() {
		this.mouseDistance = dist(mouseX, mouseY, this.pos.x, this.pos.y);

		if (this.mouseDistance < this.cS / 2) {
			return true;
		} else {
			return false;
		}
	};

	RoundObj.amount++;
}

World.amount = 0;
Mass.amount = 0;
RectObj.amount = 0;
RoundObj.amount = 0;