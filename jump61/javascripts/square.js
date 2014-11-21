function Square(side, spots, r, c, game) {
	this.side = side;
	this.spots = spots;
	this.r = r;
	this.c = c;
	this.game = game;
}


Square.prototype.repaint = function() {
	// debugger;
	var sq = document.querySelector(".sq"+this.r+"-"+this.c);
	if (this.c !== 3) {
		sq.style.marginRight = "15px";
	}
	if (this.side === "red") {
		sq.style.backgroundColor = "#FF4D4D";
	} else if (this.side === "blue") {
		sq.style.backgroundColor = "#33CCFF";
	} else {
		sq.style.backgroundColor = "#F0FFE0";
	}
	sq.src = "image/"+this.spots+".png";
}
