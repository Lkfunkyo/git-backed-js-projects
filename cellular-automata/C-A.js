function Cell(x, y, l, w) {
	this.prototype = Object.create(RectObj.prototype);

	RectObj.call(this, x, y, l, w);

	this.a = 255;
	this.minus = 0;
	this.chance = random(0, 1);
	this.degree = random(-0.25, 0.25);
	this.rDeath = 0;
	this.dSwitch = false;
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

		push();

		translate(this.pos.x, this.pos.y);
		rotate(this.degree);

		stroke(19, 100, 25, st);
		strokeWeight(stW);

		fill(this.a, this.a, this.a, 60);
		rect(0, 0, this.l, this.w, this.r.tl, this.r.tr, this.r.br, this.r.bl);

		pop();
	};

	this.run = function() {
		var floating = createVector(random(-1, 1), random(-1, 1));
		this.a -= this.minus;


		if (this.a < 1) {
			this.minus = 0;
		}
		if (this.a < 255 * (14 / 16)) {
			this.state = true;
		}

		this.runSpeed();
		if (this.a > 255 * (10 / 16)) {
			this.applySpeed(floating);
		}
		
		this.rDeath = random(0, 1);
		if(this.dSwitch == true){
			this.dying();
			
			this.dSwitch == false;
		}
	};

	this.dying = function() {
		if (this.chance > 0.4 && this.a > 0) {
			this.minus = 2;
		}

		return this.dyingState;
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

	this.rndmDeath = function() {
		if (this.rDeath > 2)
			this.dSwitch = true;
			
		
		
	};

	this.reshuffle = function() {
		this.chance = random(0, 1);
	};
}