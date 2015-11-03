function Board(squareValues){
	this.squares = squareValues || ["","","","","","","","",""];
	this.rows = this.getRows();
	this.columns = this.getColumns();
	this.leftDiagonal = this.getLeftDiagonal();
	this.rightDiagonal = this.getRightDiagonal();
	this.availableMoves = this.getAvailableMoves();
	this.edgeIndices = [1, 3, 5, 7];
	this.cornerIndices = [0, 2, 6, 8];
}

Board.prototype.update = function(squareValues){
	this.squares = squareValues;
	this.rows = this.getRows();
	this.columns = this.getColumns();
	this.leftDiagonal = this.getLeftDiagonal();
	this.rightDiagonal = this.getRightDiagonal();
	this.availableMoves = this.getAvailableMoves();
}

Board.prototype.show = function(){
	console.log(this.squares);
}

Board.prototype.getAvailableMoves = function(){
	var moveIndices = [];
	for(var squareIndex = 0; squareIndex < this.squares.length; squareIndex++){
		if(this.squares[squareIndex] == ""){
			moveIndices.push(squareIndex);
		}
	}
	return moveIndices;
}

Board.prototype.getRows = function(){
	var rows = [[this.squares[0], this.squares[1], this.squares[2]],[this.squares[3], this.squares[4], this.squares[5]], [this.squares[6], this.squares[7], this.squares[8]]];
	return rows;
}

Board.prototype.getColumns = function(){
	var columns = [[this.squares[0], this.squares[3], this.squares[6]],[this.squares[1], this.squares[4], this.squares[7]], [this.squares[2], this.squares[5], this.squares[8]]];
	return columns;
}

Board.prototype.getLeftDiagonal = function(){
	var leftDiagonal = [this.squares[0], this.squares[4], this.squares[8]];
	return leftDiagonal;
}

Board.prototype.getRightDiagonal = function(){
	var rightDiagonal = [this.squares[2], this.squares[4], this.squares[6]];
	return rightDiagonal;
}

Board.prototype.checkForWinner = function(currentPlayer){
	if(currentPlayer == "X"){
		if(this.checkRows(currentPlayer) || this.checkColumns(currentPlayer) || this.leftDiagonal.every(hasThreeXs) || this.rightDiagonal.every(hasThreeXs)){
			return true;
		}
	}
	else if(currentPlayer == "O"){
		if(this.checkRows(currentPlayer) || this.checkColumns(currentPlayer) || this.leftDiagonal.every(hasThreeOs) || this.rightDiagonal.every(hasThreeOs)){
			return true;
		}
	}
	return false;
}

Board.prototype.checkRows = function(currentPlayer){
	var hasWinner = false;
	if(currentPlayer == "X"){
		this.rows.forEach(function(row){
			if(row.every(hasThreeXs)){
				return hasWinner = true;
			}
		})
	}
	else if(currentPlayer == "O"){
		this.rows.forEach(function(row){
			if(row.every(hasThreeOs)){
				return hasWinner = true;
			}
		})
	}
	return hasWinner;
}

Board.prototype.checkColumns = function(currentPlayer){
	var hasWinner = false;
	if(currentPlayer == "X"){
		this.columns.forEach(function(column){
			if(column.every(hasThreeXs)){
				return hasWinner = true;
			}
		})
	}
	else if(currentPlayer == "O"){
		this.columns.forEach(function(column){
			if(column.every(hasThreeOs)){
				return hasWinner = true;
			}
		})
	}
	return hasWinner;
}

Board.prototype.checkForTie = function(){
	if(this.squares.every(isNotEmpty) && !this.winner){
		return true;
	}
	return false;
}

Board.prototype.pickRandomCorner = function(){
	var randomIndex = Math.floor(Math.random() * this.cornerIndices.length)
	while(this.squares[this.cornerIndices[randomIndex]].length == 1){
		randomIndex = Math.floor(Math.random() * this.cornerIndices.length)
	}
	return this.cornerIndices[randomIndex];
}

Board.prototype.pickRandomEdge = function(){
	var randomIndex = Math.floor(Math.random() * this.edgeIndices.length)
	while(this.squares[this.edgeIndices[randomIndex]].length == 1){
		randomIndex = Math.floor(Math.random() * this.edgeIndices.length)
	}
	return this.edgeIndices[randomIndex];
}

Board.prototype.checkForWinnerInNextMove = function(){
	var squaresCopy = this.squares.slice();
	var boardCopy = new Board(squaresCopy)
	var potentialMoves = boardCopy.getAvailableMoves()
	var potentialXWins = this.getWinningMoves(boardCopy, "X");
	var potentialOWins = this.getWinningMoves(boardCopy, "O");
	if(potentialOWins.length > 0){
		var randomIndex = Math.floor(Math.random() * potentialOWins.length)
		return potentialOWins[randomIndex]
	}
	else if(potentialXWins.length > 0){
		var randomIndex = Math.floor(Math.random() * potentialXWins.length)
		return potentialXWins[randomIndex]
	}
	else if(potentialXWins == potentialOWins && potentialXWins.length == 0){
		return false;
	}
}

Board.prototype.getWinningMoves = function(boardCopy,player){
	var potentialMoves = boardCopy.getAvailableMoves();
	var potentialWins = [];
	potentialMoves.forEach(function(potentialMoveIndex){
		boardCopy.squares[potentialMoveIndex] = player;
		boardCopy.update(boardCopy.squares);
		if(boardCopy.checkForWinner(player)){
			potentialWins.push(potentialMoveIndex);
		}
		boardCopy.squares[potentialMoveIndex] = "";
		boardCopy.update(boardCopy.squares);
	})
	return potentialWins;
}

Board.prototype.checkForDiagonalFork = function(){
	var matchCase = ["X", "O", "X"]
	if(matchArrays(this.leftDiagonal, matchCase) || matchArrays(this.rightDiagonal, matchCase)){
		return true;
	}
	return false;
}

Board.prototype.checkForPotentialForks = function(player, opponent){
	//have an array of arrays where each nested array is a row, column, or diagonal. simulate a move, and go through the array to see if there are 2 of the same and 1 open space, if so, then increase a count variable of potential win methods by 1, if the count variable equals 2, we have a fork for that move
	var potentialMoves = this.getAvailableMoves();
	var squaresCopy = this.squares.slice();
	var potentialForkMoves = [];
	potentialMoves.forEach(function(potentialMoveIndex){
		var potentialForkCount = 0; 
		var boardCopy = new Board(squaresCopy)
		boardCopy.squares[potentialMoveIndex] = player;
		boardCopy.update(boardCopy.squares);
		var boardCopyTriples = boardCopy.getTriples();
		boardCopyTriples.forEach(function(triple){
			var xAndOCount = getXandOCount(triple)
			if(xAndOCount[player] == 2 && xAndOCount[opponent] == 0){
				potentialForkCount++;
			}
		})
		if(potentialForkCount > 1){
			potentialForkMoves.push(potentialMoveIndex);
		}
		boardCopy.squares[potentialMoveIndex] = "";
		boardCopy.update(boardCopy.squares);
	})
	return potentialForkMoves;
}

Board.prototype.getTriples = function(){
	//a triple is a row, column, or diagonal (set of three cells)
	var triples = []
	this.rows.forEach(function(row){ triples.push(row)})
	this.columns.forEach(function(column){ triples.push(column)})
	triples.push(this.leftDiagonal);
	triples.push(this.rightDiagonal);
	return triples;
}

Board.prototype.getAvailableCorners = function(){
	var availableCorners = [];
	for(var cornerIndex = 0; cornerIndex < this.cornerIndices.length; cornerIndex++){
		if(this.squares[this.cornerIndices[cornerIndex]] == ""){
			availableCorners.push(this.cornerIndices[cornerIndex]);
		}
	}
	return availableCorners;
}

// Board.prototype.getAvailableEdges = function(){
// 	var edgeIndices = [1, 3, 5, 7];
// 	var availableEdges = [];
// 	edgeIndices.forEach(function(edgeIndex){
// 		if(this.board[edgeIndex] == ""){
// 			availableEdges.push(edgeIndex);
// 		}
// 	})
// 	return availableEdges;
// }
