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