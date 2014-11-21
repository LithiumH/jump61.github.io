function Game() {
	this.board = new Board(3, this);
	this.red = new Player(this, this.board, "red", "human");
	this.blue = new Player(this, this.board, "blue", "human");
	this.mouse = new MouseInput(this, this.board)
	this.listen();
}

Game.prototype.makeMove = function(r, c) {
	var side = this.board.whoseMove()
	this.board.addSpot(side, r, c);
	var winner = this.board.getWinner();
	var playerText = document.querySelector(".player");
	var maplayer = {
		red : "Red",
		blue : "Blue"
	}
	if (winner !== "white") {
		playerText.innerText = maplayer[winner] + "(The Winner)";
	} else {
		var opp = this.opposite(side);
		playerText.innerText = opp;
	}
};

Game.prototype.listen = function(event) {
	var button = document.querySelector(".inputbox button");
	var textBox = document.querySelector(".inputbox input");
	var playerText = document.querySelector(".player");
	var restart = document.querySelector(".button button");
	var self = this;
	restart.addEventListener('click', function doRestart (event) {
		event.preventDefault();
		self.board.clear();
		playerText.innerText = "Red";
	})

	var readExecuteCommand = function(event) {
		event.preventDefault();
		var text = textBox.value;
		var next = text.split(" ");
		var re = /\d \d/;
		if (text.match(re) !== null) {
			var player = self.board.whoseMove();
			if (player === "red") {
				self.red.makeMove(next[0], next[1]);
			} else {
				self.blue.makeMove(next[0], next[1]);
			}
		} else if (next[0] === 'size') {
			self.board = new Board(parseInt(next[1]), self);
		} else if (next[0] === 'clear') {
			self.board.clear();
		}
		else {
			console.log("not a valid command");
		}
	};
	button.addEventListener('click', readExecuteCommand);
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