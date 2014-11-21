// Get things from document
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
	var b = this.board;
	var red = this.red;
	var blue = this.blue;
	var opposite = this.opposite;
	var board = this.board;
	restart.addEventListener('click', function doRestart (event) {
		board.clear();
		playerText.innerText = "Red";
	})

	var readExecuteCommand = function(event) {
		// debugger;
		event.preventDefault();
		var text = textBox.value;
		var next = text.split(" ");
		var re = /\d \d/;
		if (text.match(re) !== null) {
			var player = b.whoseMove();
			playerText.innerText = opposite(player);
			if (player === "red") {
				red.makeMove(next[0], next[1]);
			} else {
				blue.makeMove(next[0], next[1]);
			}
		} else {
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