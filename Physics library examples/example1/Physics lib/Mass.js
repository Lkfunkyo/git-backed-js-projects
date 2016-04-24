function Mass(x, y, l, w) {
	this.prototype = Object.create(World.prototype);

	World.call(this, x, y);

	this.l = l;
	this.w = w;

	this.pos = createVector(this.x, this.y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);

	this.gravity = createVector(0, 4);
	this.extraGravity = createVector(0, 2);
	this.antiGravity = createVector(0, -4);
	this.leftForce = createVector(-0.25, 0);
	this.rightForce = createVector(0.25, 0);
	this.upwardForce = createVector(0, -0.25);

	this.gravity.setMag(4);
	this.antiGravity.setMag(4);
	this.upwardForce.setMag(0.25);
	this.extraGravity.setMag(0.25);
	this.leftForce.setMag(0.25);
	this.rightForce.setMag(0.25);

	this.bounce = 0.8;
	this.momentum = createVector(0, 0);

	this.radiiSum;
	this.distance;
	this.leftWall;
	this.rightWall;
	this.floorVal;
	this.ceilVal;

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

	this.applyForce = function(force) {
		var fo = createVector(force.x, force.y);

		fo.mult(1 / this.mass);
		this.acceleration.add(fo);
	};

	this.applyLeftWind = function() {
		this.applyForce(this.leftForce);
	};

	this.applyRightWind = function() {
		this.applyForce(this.rightForce);
	};
	
	this.applyGravity = function() {
		this.acceleration.add(this.gravity);
	};

	this.applyAntiGravity = function() {
		this.acceleration.add(this.antiGravity);
	};

	this.applyUpwardForce = function() {
		this.acceleration.add(this.upwardForce);
	};

	this.applyExtraGravity = function() {
		this.acceleration.add(this.extraGravity);
	};

	this.applyLeftForce = function() {
		this.acceleration.add(this.leftForce);
	};

	this.applyRightForce = function() {
		this.acceleration.add(this.rightForce);
	};

	this.applySpeed = function(speedVector) {
		this.velocity.add(speedVector);
	};

	this.runAccel = function() {
		this.velocity.add(this.acceleration);
		this.pos.add(this.velocity);

		this.acceleration.mult(0);

	};

	this.runSpeed = function() {
		this.pos.add(this.velocity);

		this.velocity.mult(0);
	};

	this.stayInScreen = function() {
		if (this.pos.x > width - this.l / 2 || this.pos.x < this.l / 2) {
			this.velocity.x *= -this.bounce;
		}
		if (this.pos.y > height - this.w / 2 || this.pos.y < this.w / 2) {
			this.velocity.y *= -this.bounce;
		}

		if (this.pos.x > width - this.l / 2) {
			this.pos.x = width - this.l / 2;
		} else if (this.pos.x < this.l / 2) {
			this.pos.x = this.l / 2;
		}
		if (this.pos.y > height - this.w / 2) {
			this.pos.y = height - this.w / 2;

		} else if (this.pos.y < this.w / 2) {
			this.pos.y = this.w / 2
		}
	};

	this.setBounce = function(b) {
		this.bounce = b;
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

	this.applyFloorFriction = function(detRate) {
		var dR = constrain(detRate, 0.1, 0.99999);
		var vel = createVector(this.velocity.x, this.velocity.y);
		vel.normalize();

		var friction = createVector(vel.x * -dR, 0);

		this.applyForce(friction);
	};

	this.reenterScreen = function() {
		if (this.pos.x > width + this.l) {
			this.pos.x = -this.l;
		} else if (this.pos.x < -this.l) {
			this.pos.x = width + this.l;
		}
		if (this.pos.y > height + this.w) {
			this.pos.y = -this.w;

		} else if (this.pos.y < -this.w) {
			this.pos.y = height + this.w
		}
	};


	Mass.amount++;
}