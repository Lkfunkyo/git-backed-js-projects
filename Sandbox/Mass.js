function World(x, y) {
	this.x = x;
	this.y = y;

	World.amount++;
}

function Mass(x, y) {
	this.prototype = Object.create(World.prototype);

	World.call(this, x, y);

	this.pos = createVector(this.x, this.y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);

	this.applyForce = function(force) {
		this.acceleration.add(force);
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

	Mass.amount++;
}

function RectObj(x, y, l, w) {
	this.prototype = Object.create(Mass.prototype);

	Mass.call(this, x, y);

	this.l = l;
	this.w = w;
	this.o;

	this.display = function() {
		rect(this.pos.x, this.pos.y, this.l, this.w);
	};

	this.setOtherR = function(otherR) {
		this.o = otherR;
	};

	this.intersects = function() {
		if (this.o.pos.x >= this.pos.x || this.o.pos.x + this.o.l < this.pos.x + this.l || this.o.pos.y > this.pos.y || this.o.pos.y + this.o.w < this.pos.y + this.pos.y) {
			return true;
		} else {
			return false;
		}
	};

	this.avoid = function(space) {
		this.space = space || 3;

	};

	RectObj.amount++;
}

function RoundObj(x, y, l, w) {
	this.prototype = Object.create(Mass.prototype);

	Mass.call(this, x, y);

	this.l = l;
	this.w = w || this.l;
	this.bounce = 0.8;

	this.pos = createVector(this.x, this.y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);

	this.otherObj;
	this.distance;
	this.radiiSum;
	this.mouseDistance;

	this.display = function() {
		ellipse(this.pos.x, this.pos.y, this.l, this.w);
	};
	
	this.applyForce = function(force) {
		this.acceleration.add(force);
	};

	this.run = function(otherCreature) {
		this.otherC = otherCreature;


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
			if (this.pos.x > this.otherC.pos.x || this.pos.x < this.otherC.pos.x) {
				this.velocity.x *= -this.bounce;
			}
			if (this.pos.y > this.otherC.pos.y || this.pos.y < this.otherC.pos.y) {
				this.velocity.y *= -this.bounce;
			}

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

	this.bounceOff = function() {
		this.bounce = 0;
	};
	
	this.bounceOn = function(b){
		this.bounce = b;
	};

	RoundObj.amount++;
}

World.amount = 0;
Mass.amount = 0;
RectObj.amount = 0;
RoundObj.amount = 0;