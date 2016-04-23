function Mass(x, y) {
	this.prototype = Object.create(World.prototype);

	World.call(this, x, y);

	this.pos = createVector(this.x, this.y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	
	this.gravity = createVector(0, 4);
	this.extraGravity = createVector(0, 2);
	this.antiGravity = createVector(0, -4);
	this.leftWind = createVector(-0.25, 0);
	this.rightWind = createVector(0.25, 0);
	
	// this.gravity.setMag(4);
	// this.antiGravity.setMag(0.25);
	// this.extraGravity.setMag(0.25);
	// this.leftWind.setMag(0.25);
	// this.rightWind.setMag(0.25);
	
	this.bounce = 0.8;
	this.momentum;
	
	this.radiiSum;
	this.distance;
	this.leftWall;
	this.rightWall;
	this.floorVal;
	this.ceilVal;

	this.applyForce = function(force) {
		this.acceleration.add(force);
	};

	this.applyGravity = function() {
		this.acceleration.add(this.gravity);
	};

	this.applyAntiGravity = function() {
		this.acceleration.add(this.antiGravity);
	};

	this.applyExtraGravity = function() {
		this.acceleration.add(this.extraGravity);
	};

	this.applyFriction = function(detRate) {
		var dR = constrain(detRate, 0.1, 0.99);
		
		this.velocity.x *= dR;
	};

	this.applyLeftForce = function() {
		this.acceleration.add(this.leftWind);
	};

	this.applyRightForce = function() {
		this.acceleration.add(this.rightWind);
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

	this.bounceOff = function() {
		this.bounce = 0;
	};

	this.bounceOn = function(b) {
		this.bounce = b;
	};
	Mass.amount++;
}