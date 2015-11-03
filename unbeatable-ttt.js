//if theres no available corner take an edge, if theres no available edge, take a corner
document.addEventListener("DOMContentLoaded", function(){

	var squares = document.getElementsByClassName('square')

	var newGame = new Game();

	for(var squareNumber = 0; squareNumber < squares.length; squareNumber ++){
		squares[squareNumber].addEventListener('click', makePlayerMove);
	}

	function makePlayerMove(){
		if(newGame.over){
			return
		}
		if(this.innerText){
			alert('already taken')
		}
		else{
			this.innerText = newGame.currentPlayer;
			newGame.board.update(flattenedBoard(squares))
			newGame.updateStatus(newGame.currentPlayer);
			if(!newGame.over){
				newGame.switchPlayers();
				var computerMoveIndex = newGame.makeComputerMove();
				document.getElementById(computerMoveIndex).innerText = newGame.computerPlayer;
				newGame.board.update(flattenedBoard(squares))
				newGame.updateStatus(newGame.currentPlayer);
				newGame.switchPlayers();
			}
		}
	}

	var newGameButton = document.getElementById('new-game-btn')
	newGameButton.addEventListener('click', reset)

	function reset(){
		for(var squareIndex = 0; squareIndex < squares.length; squareIndex++){
			squares[squareIndex].innerText = "";
		}
		newGame = new Game();
	}
})

function Game(squareValues){
	this.winner = null;
	this.over = false;
	this.tie = false;
	this.turn = 0;
	this.board = new Board()
	this.humanPlayer = "X",
	this.computerPlayer = "O",
	this.currentPlayer = this.humanPlayer
}

Game.prototype.switchPlayers = function(){
	this.turn++;
	this.currentPlayer == this.humanPlayer ? ( 
		this.currentPlayer = this.computerPlayer 
		) : ( 
		this.currentPlayer = this.humanPlayer 
		);
}

function flattenedBoard(currentSquareValues){
	var flattenedBoard = [];
	for(var squareIndex = 0; squareIndex < currentSquareValues.length; squareIndex++){
		flattenedBoard.push(currentSquareValues[squareIndex].innerText)
	}
	return flattenedBoard;
}

function Board(squareValues){
	this.squares = squareValues || ["","","","","","","","",""];
	this.rows = this.getRows();
	this.columns = this.getColumns();
	this.leftDiagonal = this.getLeftDiagonal();
	this.rightDiagonal = this.getRightDiagonal();
	this.availableMoves = this.getAvailableMoves();
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

Game.prototype.updateStatus = function(currentPlayer){
	if(this.board.checkForWinner(currentPlayer)){
		this.winner = currentPlayer;
		alert(currentPlayer + ' wins')
	}
	if(this.board.checkForTie()){
		this.tie = true;
		alert('we have a tie')
	}
	this.isOver();
}

Game.prototype.isOver = function(){
	if(this.winner || this.tie){
		this.over = true;
	}
		return;
}

Board.prototype.checkForTie = function(){
	if(this.squares.every(isNotEmpty) && !this.winner){
		return true;
	}
	return false;
}

function hasThreeXs(cell, index, array){
	return cell === "X";
}

function hasThreeOs(cell, index, array){
	return cell === "O";
}

function isNotEmpty(cell, index, array){
	return cell != "";
}

Game.prototype.makeComputerMove = function(currentBoardSquareValues){
	var moveIndex;
	if(this.turn == 1){
		moveIndex = this.makeFirstComputerMove();
	}
	// else if(this.turn == 3){
		
	// 	///////
	// }
	else{
		if(this.board.checkForWinnerInNextMove(this.currentPlayer)){
			moveIndex = this.board.checkForWinnerInNextMove(this.currentPlayer)
		}
		else{
			if(this.board.checkForDiagonalFork()){
				moveIndex = this.board.pickRandomEdge();
			}
			else{
				var oForks = this.board.checkForPotentialForks("O", "X");
				var xForks = this.board.checkForPotentialForks("X", "O");
				//if xforks is greater than 1, pick a corner
				//if its equal to 1, make that move
				//if no forks at all, make an available corner, else make an empty edge
				if(oForks.length > 0){
					var randomIndex = Math.floor(Math.random() * cornerIndices.length)
					moveIndex = oForks[randomIndex];
				}
				else if(xForks.length > 1){
					moveIndex = this.board.pickRandomCorner();
				}
				else if(xForks.length == 1){
					moveIndex = xForks[0];
				}
				else if(oForks.length == 0 && xForks.length == 0){
					if(this.board.getAvailableCorners().length > 0){
						moveIndex = this.board.pickRandomCorner();
					} 
					else{
						moveIndex = this.board.pickRandomEdge();
					}
				}
			}
		}
	}
	return moveIndex;
}

Game.prototype.makeFirstComputerMove = function(){
	var firstMoveIndex;
	if(this.board.squares[4] == ""){
		firstMoveIndex = 4;
	}
	else{
		firstMoveIndex = this.board.pickRandomCorner();
	}
	return firstMoveIndex;
}

Board.prototype.pickRandomCorner = function(){
	var cornerIndices = [0, 2, 6, 8];
	var randomIndex = Math.floor(Math.random() * cornerIndices.length)
	while(this.squares[cornerIndices[randomIndex]].length == 1){
		randomIndex = Math.floor(Math.random() * cornerIndices.length) //random number between 0-3
	}
	return cornerIndices[randomIndex];
}

Board.prototype.pickRandomEdge = function(){
	var edgeIndices = [1, 3, 5, 7];
	var randomIndex = Math.floor(Math.random() * edgeIndices.length)
	while(this.squares[edgeIndices[randomIndex]].length == 1){
		randomIndex = Math.floor(Math.random() * edgeIndices.length)
	}
	return edgeIndices[randomIndex];
}

Board.prototype.checkForWinnerInNextMove = function(currentPlayer){
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
	//have an array of arrays where each nested array is a row, column, or diagonal
	//simulate a move, and go through the array to see if there are 2 of the same and 1 open space, if so, then increase a count variable of potential win methods by 1
	//if the count variable equals 2, we have a fork for that move
	var potentialMoves = this.getAvailableMoves();

	var squaresCopy = this.squares.slice();
	
	var potentialForkMoves = [];

	potentialMoves.forEach(function(potentialMoveIndex){
		var potentialForkCount = 0; //represents number of possible win paths with this move
		var boardCopy = new Board(squaresCopy)

		boardCopy.squares[potentialMoveIndex] = player;
		boardCopy.update(boardCopy.squares);
		var boardCopyTriples = boardCopy.getTriples();
		boardCopyTriples.forEach(function(triple){
			//check x and o counts
			var xAndOCount = getXandOCount(triple)
			if(xAndOCount[player] == 2 && xAndOCount[opponent] == 0){
				potentialForkCount++;
			}
		})
		if(potentialForkCount > 1){
			potentialForkMoves.push(potentialMoveIndex)
		}
		boardCopy.squares[potentialMoveIndex] = "";
		boardCopy.update(boardCopy.squares);
	})
	return potentialForkMoves;

}

Board.prototype.getTriples = function(){
	var triples = []
	this.rows.forEach(function(row){ triples.push(row)})
	this.columns.forEach(function(column){ triples.push(column)})
	triples.push(this.leftDiagonal)
	triples.push(this.rightDiagonal)
	return triples;
}

Board.prototype.getAvailableCorners = function(){
	var cornerIndices = [0, 2, 6, 8];
	var availableCorners = [];
	for(var cornerIndex = 0; cornerIndex < cornerIndices.length; cornerIndex++){
		if(this.squares[cornerIndices[cornerIndex]] == ""){
			availableCorners.push(cornerIndices[cornerIndex]);
		}
	}
	return availableCorners;
}

Board.prototype.getAvailableEdges = function(){
	var edgeIndices = [1, 3, 5, 7];
	var availableEdges = [];
	edgeIndices.forEach(function(edgeIndex){
		if(this.board[edgeIndex] == ""){
			availableEdges.push(edgeIndex);
		}
	})
	return availableEdges;
}

function matchArrays(array1, array2){
	for(var index = 0; index < array1.length; index++){
		if(array1[index] != array2[index]){
			return false;
		}
	}
	return true;
}

function getXandOCount(array){
	var xAndOCount = {"X": 0, "O": 0}
	for(var index = 0; index < array.length; index++){
		if(array[index] == "X"){
			xAndOCount["X"]++;
		}
		else if(array[index] == "O"){
			xAndOCount["O"]++;
		}
	}
	return xAndOCount;
}
