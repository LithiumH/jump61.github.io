function Player(game, board, side, identifier) {
	this.side = side;
	this.identifier = identifier;
	this.game = game;
	this.board = board;
	if (identifier === "human") {
		this.mouse = new MouseInput(game, board, side);
	} 
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
	var success = game.makeMove(2, 2);
};

Player.prototype.humanMove = function(game, r, c) {
	var success = game.makeMove(r, c);
};