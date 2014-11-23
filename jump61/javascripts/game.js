function Game() {
	this.board = new Board(3, this);
	this.red = new Player(this, "red", "human");
	this.blue = new Player(this, "blue", "AI");
	this.listen();
}

Game.prototype.makeMove = function(r, c) {
	var side = this.board.whoseMove()
	var success = this.board.addSpot(side, r, c);
	var winner = this.board.getWinner();
	var playerText = document.querySelector(".player");
	var maplayer = {
		red : "Red",
		blue : "Blue"
	}
	if (winner !== "white") {
		playerText.innerText = maplayer[winner] + "(The Winner)";
	} else {
		playerText.innerText = this.opposite(side);
	}
	return success;
};

Game.prototype.listen = function(event) {
	var playerText = document.querySelector(".player");
	var restart = document.querySelector(".input button");
	var self = this;
	restart.addEventListener('click', function doRestart (event) {
		// debugger;
		var sizeBox = document.querySelector(".input input");
		event.preventDefault();
		playerText.innerText = "Red";
		if (sizeBox.value === "") {
			self.board.clear();
		} else if (parseInt(sizeBox.value) !== self.size) {
			self.board = new Board(parseInt(parseInt(sizeBox.value)), self);
		}
		// debugger;
		if (self.red.mouse !== undefined) {
			self.red.mouse = new MouseInput(self, self.board, "red");
		}
		if (self.blue.mouse !== undefined) {
			self.blue.mouse = new MouseInput(self, self.board, "blue");
		}
	})
}

Game.prototype.opposite = function(side) {
	if (side === "red") {
		return "Blue";
	} else if (side === "blue") {
		return "Red";
	} else {
		return "white";
	}
};

new Game();