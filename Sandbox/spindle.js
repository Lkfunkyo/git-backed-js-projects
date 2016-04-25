function Spindle(x, y, num, l, w, size, velLim, minA, maxA) {
	this.prototype = Object.create(Mass.prototype);
	Mass.call(this, x, y, l, w);

	this.RoundArray = [];
	this.orbits = [];
	this.mouse = [];

	this.cS = l;

	this.size = size;
	this.num = num;
	this.minA = minA;
	this.maxA = maxA;
	this.angle = 0;
	this.velLim = velLim;


	for (var i = 0; i < 360; i += 360 / this.num) {
		this.RoundArray.push(new Sand(this.size * sin(i) + 10 * random(-2, 2) + this.pos.x, this.size * cos(i) + 10 * random(-2, 2) + this.pos.y, this.cS, this.cS));
	}


	for (var i = 0; i < this.RoundArray.length; i++) {


		this.RoundArray[i].setMinMaxVals(sqrt(this.minA), sqrt(this.maxA), sqrt(this.minA), sqrt(this.maxA));






	}

	this.display = function() {
		for (var i = 0; i < this.RoundArray.length; i++) {
			this.orbits[i] = createVector(random(-1.05, 1.05)*15+this.pos.x, random(-1.05, 1.05)*15+this.pos.y);
			this.orbits[i].sub(this.RoundArray[i].pos);

			this.orbits[i].setMag(0.25);

			strokeWeight(6);
			this.RoundArray[i].display();
			this.RoundArray[i].run();
			this.RoundArray[i].runAccel();
			this.RoundArray[i].stayInScreen();

			if (this.velLim != null) {
				this.RoundArray[i].velocity.limit(this.velLim);
			}
		}
		
		strokeWeight(4);
		stroke(0);
		//fill(0, 190);s
		ellipse(this.pos.x, this.pos.y, this.cS, this.cS);

		for (var i = 0; i < this.RoundArray.length; i++) {


			this.RoundArray[i].acceleration.add(this.orbits[i]);
		}

		this.angle += 0.0625;
	};


}