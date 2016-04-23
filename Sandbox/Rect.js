function RectObj(x, y, l, w) {
	rectMode(CENTER);

	this.prototype = Object.create(Mass.prototype);

	Mass.call(this, x, y);

	this.l = l;
	this.w = w;
	this.o;
	
	this.minL = 25;
	this.minW = 25;
	this.maxL = 27;
	this.maxW = 27;

	this.setMinMaxVals = function(minL, maxL, minW, maxW) {
		this.minL = minL;
		this.minW = minW;
		this.maxL = maxL;
		this.maxW = maxW;

		this.l = constrain(this.l, this.minL, this.maxL);
		this.w = constrain(this.w, this.minW, this.maxW);
		
		console.log(this.l);
	};

	this.mass = map(this.l * this.w, this.maxW * this.maxL, this.minW * this.minL, 0.1, 1);

	this.run = function() {
		var pVelocity = createVector(this.velocity.x, this.velocity.y);

		this.momentum = pVelocity.mult(this.mass);

		this.touchingBoarder();
	};

	this.runOtherR = function(otherCreature) {
		this.o = otherCreature;
		
		
		this.setOtherR(this.o);
	};

	this.display = function() {
		rect(this.pos.x, this.pos.y, this.l, this.w);
	};

	this.applyForce = function(force) {
		var fo = createVector(force.x, force.y);

		fo.mult(1 / this.mass);
		this.acceleration.add(fo);
	};

	this.applyLeftWind = function() {
		var leftWind = createVector(this.leftWind.x*-1, 0);
		
		this.applyForce(leftWind);
	};

	this.applyRightWind = function() {
		var rightWind = createVector(this.rightWind.x*-1, 0);
		
		this.applyForce(rightWind);
	};

	this.setOtherR = function(otherR) {
		this.o = otherR;
	};

	this.intersects = function(otherR) {
		this.o = otherR;

		if (this.o.pos.x >= this.pos.x || this.o.pos.x + this.o.l < this.pos.x + this.l || this.o.pos.y > this.pos.y || this.o.pos.y + this.o.w < this.pos.y + this.pos.y) {
			return true;
		} else {
			return false;
		}
	};

	this.touchingBoarder = function() {
		if (this.pos.x <= 0)
			this.leftWall = true;
		else
			this.leftWall = false;

		if (this.pos.x > width - this.l)
			this.rightWall = true;
		else
			this.rightWall = false;

		if (this.pos.y > height - this.w)
			this.floorVal = true;
		else
			this.floorVal = false;

		if (this.pos.y < 0)
			this.ceilVal = true;
		else
			this.ceilVal = false;
	};
	
	this.reenterScreen = function(){
		if (this.pos.x > width + this.l) {
			this.pos.x = 0;
		} else if (this.pos.x < 0) {
			this.pos.x = width;
		}
		if (this.pos.y > height + this.w) {
			this.pos.y =  0;

		} else if (this.pos.y < 0 ) {
			this.pos.y = height + this.w
		}
	};

	this.avoid = function(otherCreature, s) {
		
	};

	RectObj.amount++;
}