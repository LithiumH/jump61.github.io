function Player(game, board, side, identifier) {
	this.side = side;
	this.identifier = identifier;
	this.game = game;
	this.board = board;
}

Player.prototype.makeMove = function(r, c) {
	var side = this.side;
	var board = this.board;
	if (this.identifier == "AI") {
		this.AIMove(this.game);
	} else {
		this.humanMove(this.game, r, c);
	}
};

Player.prototype.AIMove = function(game) {
	game.makeMove(2, 2);
};

Player.prototype.humanMove = function(game, r, c) {
	game.makeMove(r, c);
};