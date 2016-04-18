function RoundObj(x, y, l, w) {
	this.prototype = Object.create(Mass.prototype);

	Mass.call(this, x, y);

	this.l = l;
	this.w = w || this.l;

	this.pos = createVector(this.x, this.y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	
	this.mass = map(this.l, 60, 20, 0.60, 1);

	this.otherObj;
	this.distance;
	this.radiiSum;
	this.mouseDistance;
	
	this.applyForce = function(force) {
		var fo = createVector(force.x, force.y);
		
		fo.mult(this.mass);
		this.acceleration.add(fo);
	};
	
	this.display = function() {
		ellipse(this.pos.x, this.pos.y, this.l, this.w);
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


	RoundObj.amount++;
}


World.amount = 0;
Mass.amount = 0;
RectObj.amount = 0;
RoundObj.amount = 0;