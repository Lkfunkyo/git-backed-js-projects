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



	this.run = function() {
		var pVelocity = createVector(this.velocity.x, this.velocity.y);

		this.momentum = pVelocity.mult(1 / 1 / this.mass);
		//console.log(this.momentum.x + ", " + this.momentum.y + "      " + this.velocity.x + ", " + this.velocity.y);
		this.momentum.mult(0);
		this.maxVal = max(this.velocity.x, this.velocity.y);

		this.touchingBoarder();
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
		this.applyForce(this.leftWind);
	};

	this.applyRightWind = function() {
		this.applyForce(this.rightWind);
	};

	this.applyFloorFriction = function(detRate) {
		var dR = constrain(detRate, 0.1, 0.99999);
		var vel = createVector(this.velocity.x, this.velocity.y);
		vel.normalize();

		var friction = createVector(vel.x * -dR, 0);

		this.applyForce(friction);
	};

	this.intersects = function(otherR) {
		this.o = otherR || this.o;

		this.xDistance = abs(this.pos.x - this.o.pos.x);
		this.yDistance = abs(this.pos.y - this.o.pos.y);

		this.xSum = (this.l + this.o.l) / 2;
		this.ySum = (this.w + this.o.w) / 2;

		if (this.xDistance < this.xSum && this.yDistance < this.ySum) {
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

	this.reenterScreen = function() {
		if (this.pos.x > width + this.l) {
			this.pos.x = 0;
		} else if (this.pos.x < 0) {
			this.pos.x = width;
		}
		if (this.pos.y > height + this.w) {
			this.pos.y = 0;

		} else if (this.pos.y < 0) {
			this.pos.y = height + this.w
		}
	};

	this.avoid = function(otherCreature, s) {
		if (this.pos.x > this.o.pos.x) {
			if (this.velocity.x == this.maxVal) {
				this.velocity.x -= this.o.momentum.x;

				this.pos.x -= (this.xSum - this.xDistance);
			}
		} else {
			if (this.velocity.x == this.maxVal) {
				
				this.velocity.x += this.o.momentum.x;
				this.pos.x += (this.xSum - this.xDistance);

				
			}
		}
		if (this.pos.y > this.o.pos.y) {
			if (this.velocity.y == this.maxVal) {
				
				this.velocity.y += this.o.momentum.y;
				this.pos.y += (this.ySum - this.yDistance);

				
			}
		} else {
			if (this.velocity.y == this.maxVal) {
				
				this.velocity.y += this.o.momentum.y;
				this.pos.y += (this.ySum - this.yDistance);

				
			}
		}



	};

	RectObj.amount++;
}