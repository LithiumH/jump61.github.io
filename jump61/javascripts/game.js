// Get things from document
function Game() {
	this.board = new Board(3);
	this.red = new Player(this, this.board, "red", "human");
	this.blue = new Player(this, this.board, "blue", "human");
	this.listen();
}

Game.prototype.makeMove = function(side, r, c) {
	if (this.board.isLegal(side, r, c)) {
		this.board.addSpot(side, r, c);
	}
};

Game.prototype.listen = function(event) {
	var button = document.querySelector(".inputbox button");
	var textBox = document.querySelector(".inputbox input");
	var b = this.board;
	var red = this.red;
	var blue = this.blue;
	var readExecuteCommand = function(event) {
		// debugger;
		event.preventDefault();
		var text = textBox.value;
		var next = text.split(" ");
		var re = /\d \d/;
		if (text.match(re) !== null) {
			var player = b.whoseMove();
			// console.log("current player: " + player);
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

new Game();