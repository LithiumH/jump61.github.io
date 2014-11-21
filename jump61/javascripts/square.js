function Square(side, spots) {
	this.side = side;
	this.spots = spots;
}


Square.prototype.repaint = function(row, col) {
	// debugger;
	var sq = document.querySelector(".sq"+row+"-"+col);
	if (col !== 3) {
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