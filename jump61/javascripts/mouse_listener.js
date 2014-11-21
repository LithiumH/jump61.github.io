function MouseInput(game, board) {
	this.game = game;
	this.board = board;
	this.listen();
}

MouseInput.prototype.listen = function() {
	var game = this.game;
	for (var r = 1; r <= this.board.size; r++) {
		for (var c = 1; c <= this.board.size; c++) {
			var sqDoc = document.querySelector(".sq"+r+"-"+c)
			sqDoc.addEventListener("click", function doClick (event) {
				var playerText = document.querySelector(".player");
				var rc = event.target.className.slice(2, 5);
				rc = rc.split("-");
				var r = parseInt(rc[0]);
				var c = parseInt(rc[1]);
				var player = game.board.whoseMove();
				var maplayer = {
					red : "Red",
					blue : "Blue"
				}
				// debugger;
				if (game.board.isLegal(player, r, c)) {
					if (player === "red") {
						game.red.makeMove(r, c);
					} else {
						game.blue.makeMove(r, c);
					}
				} else {
					playerText.innerText = maplayer[player];
				}

			});
		}
	}
};