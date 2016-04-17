function Cell(x, y, l, w) {
	this.prototype = Object.create(RectObj.prototype);

	RectObj.call(this, x, y, l, w);

	this.a = 255;
	this.minus = 0;
	this.r = {
		tr: round(random(2, 5)),
		tl: round(random(2, 5)),
		br: round(random(2, 5)),
		bl: round(random(2, 5))
	};
	
	this.state = false;

	this.display = function(s, sW) {
		var st = s || color(0);
		var stW = sW || 1;

		stroke(st);
		strokeWeight(stW);

		fill(this.a, this.a, this.a);
		rect(this.pos.x, this.pos.y, this.l, this.w, this.r.tl, this.r.tr, this.r.br, this.r.bl);
	};

	this.run = function() {
		var floating = createVector(random(-1, 1), random(-1, 1));
		
		this.a -= this.minus;
		this.isDead();


		if (this.a < 1) {
			this.minus = 0;
		}
		if (this.a < 255 * (15 / 16)) {
			this.state = true;
		}
		
		this.runSpeed();
		if(this.a > 255*(11/ 16)){
			this.applySpeed(floating);
		}
	};

	this.dying = function() {
		if (this.a > 0) {
			this.minus = 2;
		}
	};

	this.isIn = function() {
		if (mouseX > this.pos.x && mouseX < this.pos.x + this.l && mouseY > this.pos.y && mouseY < this.pos.y + this.w)
			return true;
		else
			return false;
	};

	this.isDead = function() {
		return this.state;
	};
}