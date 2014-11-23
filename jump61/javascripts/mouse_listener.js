function MouseInput(game, board, side) {
	this.game = game;
	this.board = board;
	this.side = side;
	this.listen();
}

MouseInput.prototype.listen = function() {
	var game = this.game;
	var side = this.side;
	for (var r = 1; r <= this.board.size; r++) {
		for (var c = 1; c <= this.board.size; c++) {
			var sqDoc = document.querySelector(".sq"+r+"-"+c)
			sqDoc.addEventListener("click", function doClick (event) {
				event.preventDefault();
				var playerText = document.querySelector(".player");
				var rc = event.target.className.slice(2, 5);
				rc = rc.split("-");
				var r = parseInt(rc[0]);
				var c = parseInt(rc[1]);
				var player = game.board.whoseMove();
				if (player !== side) {
					return null;
				}
				var maplayer = {
					red : "Red",
					blue : "Blue"
				}
				var realPlayers = {
					red : game.red,
					blue : game.blue
				}
				if (game.board.isLegal(side, r, c)) {
					if (side === "red") {
						game.red.makeMove(r, c);
					} else {
						game.blue.makeMove(r, c);
					}
				} else {
					playerText.innerText = maplayer[side];
					return null;
				}
				var opponent = realPlayers[game.opposite(player).toLowerCase()];
				if (opponent.identifier === "AI") {
					opponent.makeMove();
					playerText.innerText = maplayer[side];
				}
			});
		}
	}
};