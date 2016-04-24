function Sand(x, y, l, w) {
	this.prototype = Object.create(Mass.prototype);
	Mass.call(this, x, y, l, w);

	this.l = l;
	this.w = w || this.l;

	this.mass = map(this.l*this.w, 20, 150, 0.30, 1);

	this.otherObj;
	this.distance;
	this.radiiSum;
	this.mouseDistance;
	this.col = color(255);
	
	this.minL = 25;
	this.minW = 25;
	this.maxL = 27;
	this.maxW = 27;
	this.mass = map(this.l * this.w, this.minW * this.minL, this.maxW * this.maxL, 0.6, 1);
	
	this.setMinMaxVals = function(minL, maxL, minW, maxW) {
		this.minL = minL;
		this.minW = minW;
		this.maxL = maxL;
		this.maxW = maxW;

		this.l = constrain(this.l, this.minL, this.maxL);
		this.w = constrain(this.w, this.minW, this.maxW);

		this.mass = map(this.l * this.w, this.minW * this.minL, this.maxW * this.maxL, 0.6, 1);
	};

	this.applyFloorFriction = function(detRate) {
		var dR = constrain(detRate, 0.1, 0.99999);
		var vel = createVector(this.velocity.x, this.velocity.y);
		vel.normalize();

		var friction = createVector(vel.x * -dR, 0);

		this.applyForce(friction);
	};

	this.display = function() {
		stroke(this.col);
		strokeWeight(4);
		point(this.pos.x, this.pos.y);
	};

	this.run = function(otherCreature) {
		
	};

	this.runOtherC = function(otherCreature) {
		this.distance = dist(this.otherC.pos.x, this.otherC.pos.y, this.pos.x, this.pos.y);
		this.radiiSum = (this.otherC.l + this.l) / 2;
	};

	this.setOtherC = function(otherCreature) {
		this.otherC = otherCreature;
	};

	this.intersects = function(otherCreature) {
		this.otherC = otherCreature;

		if (this.distance < this.radiiSum) {
			return true;
		} else {
			return false;
		}
	};

	this.avoid = function(otherCreature, s) {
		this.otherC = otherCreature;

		var space = s || 0;

		if (this.intersects(this.otherC)) {

			if (this.distance < this.radiiSum + space) { //&& this.y != height-this.cS/2 && this.y != this.cS/2 && this.x != width-this.cS/2 && this.x != this.cS/2){//&& this.cS <= this.otherC.cS) {
				if (this.otherC.pos.x > this.pos.x) {
					this.pos.x -= (this.radiiSum + space - this.distance);
				} else {
					this.pos.x += (this.radiiSum + space - this.distance);
				}
				if (this.otherC.pos.y > this.pos.y) {
					this.pos.y -= (this.radiiSum - this.distance + space);
				} else {
					if (this.pos.y + this.w / 2 > height) {
						this.pos.y += (this.radiiSum - this.distance + space);
					}
				}


			}
		}
	};

	this.mouseIsIn = function() {
		this.mouseDistance = dist(mouseX, mouseY, this.pos.x, this.pos.y);

		if (this.mouseDistance < this.w / 2) {
			return true;
		} else {
			return false;
		}
	};

	this.lines = function(x, y) {
		line(this.pos.x, this.pos.y, x, y);
	};
}