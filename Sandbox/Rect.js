function RectObj(x, y, l, w) {
	rectMode(CENTER);
	
	this.prototype = Object.create(Mass.prototype);

	Mass.call(this, x, y);

	this.l = l;
	this.w = w;
	this.o;
	this.radiiSum;
	this.distance;
	
	this.mass = map(this.l*this.w, 300, 5000, 0.1, 1);

	this.display = function() {
		rect(this.pos.x, this.pos.y, this.l, this.w);
	};
	
	this.run = function(){
		
	};
	
	this.applyForce = function(force) {
		var fo = createVector(force.x, force.y);
		
		fo.mult(this.mass);
		this.acceleration.add(fo);
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
	
	this.avoid = function(otherCreature, s) {
		
	};

	RectObj.amount++;
}