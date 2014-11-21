function Board(arg1, arg2) {
    if (arguments.length === 2) {
        this.size = arg1;
        this.game = arg2;
        this.clear();
        this.testing = false;
    } else {
        var board = arg1;
        this.board = [];
        for (var r = 1; r <= arg1.size; r++) {
            for (var c = 1; c <= arg1.size; c ++) {
                this.board.push(arg1.board[this.sqNum(r, c)]);
            }
        }
        this.testing = true;
    }
}

Board.prototype.whoseMove = function() {
    if (((this.numPieces + this.size) & 1) === 0) {
        return "red";
    } else {
        return "blue";
    }
};

Board.prototype.isLegal = function(side, r, c) {
    if (!this.isValid(r, c)) {
        return false;
    }
    sq = this.board[this.sqNum(r, c)];
    if (sq.side !== "white" && side !== sq.side) {
        return false;
    } else {
        return true;
    }
};

Board.prototype.isValid = function(r, c) {
    return (1 <= r) && (r <= this.size) && (1 <= c) && (c <= this.size);
};

Board.prototype.sqNum = function(r, c) {
    return c - 1 + (r - 1) * this.size;
};

Board.prototype.clear = function() {
    // debugger;
    var size = this.size;
    var g = this.game;
    var col = function(n) {
        return n % size + 1;
    }
    var row = function(n) {
        return Math.floor(n / size) + 1;
    }
    this.board = [];
    this.numPieces = size * size;
    this.numRed = 0;
    this.numBlue = 0;
    // debugger;
    this.initPaint();
    this.game.mouse = new MouseInput(this.game, this);

};

Board.prototype.initPaint = function() {
    var size = this.size;
    var board = document.querySelector(".board");
    board.style.width = size * 105 - 15 + "px";
    board.style.height = size * 105 + "px";
    var margin = Math.floor((500 - size * 105 -15) / 2)
    board.style.marginLeft = margin + "px";
    board.style.marginRight = margin + "px";
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    for (var r = 1; r <= size; r++) {
        var row = document.createElement("div");
        row.className = "row";
        row.id = r;
        row.style.width = size * 105 - 15 + "px";
        document.querySelector(".board").appendChild(row);
        for (var c = 1; c <= size; c ++) {
            this.board.push(new Square("white", 1, r, c, size));
            var sq = document.createElement("img");
            sq.className = "sq"+r+"-"+c;
            sq.src = "image/1.png";
            row.appendChild(sq);
            this.board[this.sqNum(r, c)].repaint(r, c, "white");
        }
    }
};

Board.prototype.addSpot = function(player, r, c) {
    var success = this.adder(player, r, c);
    if (!this.testing) {
        this.repaint();
    }
    return success;
};

Board.prototype.adder = function(player, r, c) {
    if (!this.isValid(r, c)) {
        return false;
    }
    var size = this.size;
    var total = size * size;
    if (this.numRed === total || this.numBlue === total) {
        return undefined;
    }

    r = parseInt(r);
    c = parseInt(c);

    var neighbors = function() {
        var n = 0;
        if (r > 1) {
            n += 1;
        }
        if (c > 1) {
            n += 1;
        }
        if (r < size) {
            n += 1;
        }
        if (c < size) {
            n += 1;
        }
        return n;
    }
    // debugger;
    var sq = this.board[this.sqNum(r, c)];
    this.update(player, sq.side, sq.spots + 1, sq.spots);
    sq.side = player;
    sq.spots += 1;
    if (sq.spots > neighbors()) {
        this.update(player, sq.side, 1, sq.spots);
        sq.spots = 1;
        var toAdd = [
            [r - 1, c],
            [r + 1, c],
            [r, c - 1],
            [r, c + 1]
        ];
        for (var i = 0; i < toAdd.length; i++) {
            var pair = toAdd[i];
            this.adder(player, pair[0], pair[1]);
        };
    }
    return true;
};

Board.prototype.update = function(newPlayer, oldPlayer, newNum, oldNum) {
    this.numPieces += newNum - oldNum;
    if (newPlayer === "red") {
        this.numRed += 1;
    } else if (newPlayer === "blue") {
        this.numBlue += 1;
    }
    if (oldPlayer === "red") {
        this.numRed -= 1;
    } else if (oldPlayer === "blue") {
        this.numBlue -= 1;
    }
};

Board.prototype.repaint = function() {
    var size = this.size;
    var col = function(n) {
        return n % size + 1;
    }
    var row = function(n) {
        return Math.floor(n / size) + 1;
    }
    var board = this.board;
    for (var i = 0; i < board.length; i++) {
        board[i].repaint(row(i), col(i));
    };
};

Board.prototype.getWinner = function() {
    if (this.numRed === this.size * this.size) {
        return "red";
    } else if (this.numBlue === this.size * this.size) {
        return "blue";
    } else {
        return "white";
    }
};