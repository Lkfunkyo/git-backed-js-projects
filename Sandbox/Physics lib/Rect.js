function RectObj(x, y, l, w) {
	rectMode(CENTER);
	
	this.prototype = Object.create(Mass.prototype);
	Mass.call(this, x, y, l, w);
	
	this.o;

	this.run = function() {
		this.touchingBoarder();
	};

	this.display = function() {
		rect(this.pos.x, this.pos.y, this.l, this.w);
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