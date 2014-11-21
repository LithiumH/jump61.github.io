function Player(game, board, side, identifier) {
	this.side = side;
	this.identifier = identifier;
	this.game = game;
	this.board = board;
}

Player.prototype.makeMove = function(r, c) {
	if (this.identifier == "AI") {
		this.AIMove(this.game);
	} else {
		this.humanMove(this.game, r, c);
	}
};

Player.prototype.AIMove = function(game) {
	game.makeMove(this.side, 2, 2);
};

Player.prototype.humanMove = function(game, r, c) {
	game.makeMove(this.side, r, c);
};