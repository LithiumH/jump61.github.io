function Player(game, side, identifier) {
    this.side = side;
    this.identifier = identifier;
    this.game = game;
    if (identifier === "human") {
        this.mouse = new MouseInput(game, game.board, side);
    } 
}

Player.prototype.makeMove = function(r, c) {
    if (this.identifier == "AI") {
        this.AIMove(this.game);
    } else {
        this.humanMove(this.game, r, c);
    }
};

Player.prototype.AIMove = function(game) {
    var self = this;
    var g = this.game;
    var b = this.game.board;
    var staticEval = function (player, board) {
        // var result = 0;
        // for (var n = 0; n < board.board.length; n++) {
        //     var sq = board.board[n];
        //     var sqVal = 15 - 20 * sq.spots / b.neighbors(b.row(n), b.col(n));
        //     if (sq.side === "white") {
        //         continue;
        //     } else if (sq.side === player) {
        //         result += sqVal;
        //     } else {
        //         result -= sqVal;
        //     }
        // };
        // return result;
        return board.numOfSide(player) - board.numOfSide(g.opposite(player).toLowerCase());
    };
    var win = 20000;
    var loose = -20000;
    var minmax = function (p, b, d, cutoff, moves) {
        // debugger;
        if (b.numOfSide(p) === b.size * b.size) {
            return win;
        } else if (b.numOfSide(g.opposite(p).toLowerCase())
                   === b.size * b.size) {
            return loose;
        }
        if (d === 0) {
            return staticEval(p, b);
        }
        var bestMove = [-1, loose];
        for (var i = 0; i < b.size * b.size; i ++) {
            var r = b.row(i);
            var c = b.col(i);
            if (b.isLegal(p, r, c)) {
                b.addSpot(p, r, c);
                var v = minmax(g.opposite(p).toLowerCase(), b, d - 1, -bestMove[1], null);
                b.undo();
                if (-v > bestMove[1]) {
                    bestMove[0] = i;
                    bestMove[1] = -v;
                }
                if (-v >= cutoff) {
                    break;
                }
            }
        }
        if (moves !== null && moves.length == 0) {
            if (bestMove[0] == -1 || bestMove[1] == loose) {
                bestMove[0] = Math.floor(Math.random() * b.size * b.size);
                while (!b.isLegal(p, bestMove[0])) {
                    bestMove[0] = Math.floor(Math.random() * b.size * b.size);
                }
            }
            moves.push(bestMove[0]);
        }
        return Math.min(cutoff, bestMove[1]);
    }
    var moves = [];
    var val = minmax(this.side, new Board(b), 5, win, moves);
    var r = b.row(moves[0]);
    var c = b.col(moves[0]);
    g.makeMove(r, c);
};

Player.prototype.humanMove = function(game, r, c) {
    var success = game.makeMove(r, c);
};