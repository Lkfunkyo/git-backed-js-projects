function Mass(x, y) {
	this.prototype = Object.create(World.prototype);

	World.call(this, x, y);

	this.pos = createVector(this.x, this.y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.gravity = createVector(0, 4);
	this.antiGravity = createVector(0, -4);
	this.extraGravity = createVector(0, 4);
	this.leftWind = createVector(-2, 0);
	this.rightWind = createVector(2, 0);
	this.gravity.setMag(1);
	this.antiGravity.setMag(1);
	this.extraGravity.setMag(1);
	this.rightWind.setMag(1);
	this.leftWind.setMag(1);
	this.bounce = 0.8;

	this.applyForce = function(force) {
		this.acceleration.add(force);
	};

	
	this.applyGravity = function(){
		this.acceleration.add(this.gravity);
	};
	
	this.applyAntiGravity = function(){
		var ng = createVector(this.gravity.x, this.gravity.y);
		
		this.acceleration.add(this.antiGravity);
	};
	
	this.applyExtraGravity = function(){
		this.acceleration.add(this.extraGravity);
	};
	
	this.applyLeftWind = function(){
		this.acceleration.add(this.leftWind);
	};
	
	this.applyRightWind = function(){
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
	
	this.bounceOn = function(b){
		this.bounce = b;
	};
	Mass.amount++;
}



