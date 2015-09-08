document.addEventListener("DOMContentLoaded", function(){

	var squares = document.getElementsByClassName('square')

	var takenSquares = document.getElementsByClassName('square taken');

	var assortedSquares = [[squares[0], squares[1], squares[2]], [squares[3], squares[4], squares[5]], [squares[6], squares[7], squares[8]]]


	var newGame = new Game(squares);
	// newGame.makeComputerMove(newGame.currentPlayer, 1);
	for(var squareNumber = 0; squareNumber < squares.length; squareNumber ++){
		squares[squareNumber].addEventListener('click', makePlayerMove);


	}

	function makePlayerMove(){
		if(newGame.winner || newGame.tie){
			return
		}
		else{
			if(this.innerText === ''){
				letter = document.createTextNode(newGame.currentPlayer)
				this.appendChild(letter)
				newGame.checkForWinner();
				newGame.checkForTie();
				if(newGame.winner || newGame.Tie){
					return
				}
				else{
				newGame.switchPlayers();
				newGame.makeComputerMove();
				}
			}
			else{
				alert('invalid move')
			}
		}
	}
});

var simulationCount = 0;
////////////////////////////////////////////

////////////////////////////////////////////

// game objects

function Game(board){
	this.winner,
	this.tie,
	this.turn = 0;
	this.board = board,
	this.humanPlayer = "X",
	this.computerPlayer = "O",
	this.currentPlayer = this.humanPlayer,
	this.sortedBoard = this.sortBoard(board)
}

Game.prototype.switchPlayers = function(){
	if(this.currentPlayer === this.humanPlayer){
		this.currentPlayer = this.computerPlayer
	}
	else {
		this.currentPlayer = this.humanPlayer
	}
	this.turn++;
}

Game.prototype.makeComputerMove = function(
	){
	availableMoves = this.getAvailableMoves();
	availableMovesAndScores = this.getMoveScores(availableMoves)
	for(var possibleMove = 0; possibleMove < availableMoves.length; possibleMove++){
			console.log('return value')
			//go through each move and update the score
			//return the updated game for each, call the check function on it, otherwise repeat the 
			//process
			availableMovesAndScores[availableMoves[possibleMove]] = this.simulateMove(new Game(this.board), availableMoves[possibleMove], this.currentPlayer)
	debugger
	}
	this.switchPlayers();
}

Game.prototype.getAvailableMoves = function(){
	availableMoves = [];
	for(var availableMoveIndex = 0; availableMoveIndex < this.board.length; availableMoveIndex++){
		if(this.board[availableMoveIndex].innerText === ''){
			availableMoves.push(availableMoveIndex)
		}
	}
	return availableMoves
}

// for in starts at 0
Game.prototype.getMoveScores = function(availableMoves){
	moveScores = {}
	for(var availableMoveIndex = 0; availableMoveIndex< availableMoves.length; availableMoveIndex++){
		moveScores[availableMoves[availableMoveIndex]] = 0
	}
	return moveScores
}

//have a simulator function that returns a game object, check if there's a value from that
	//the simulator function makes the move and calls the check for winner/tie and returns the game with the update status so that we can call win/loss

Game.prototype.simulateGame = function(){

}
Game.prototype.simulateMove = function(parentGame, moveIndex, currentPlayer){
	console.log(moveIndex)
	console.log(currentPlayer)
}

Game.prototype.makeMove = function (game, player){
	marker = document.createTextNode(player)	
	this.board[1].appendChild(marker)
}

Game.prototype.sortBoard = function(){
	sortedGameBoard = [[this.board[0], this.board[1], this.board[2]], [this.board[3], this.board[4], this.board[5]], [this.board[6], this.board[7], this.board[8]]]
	return sortedGameBoard
}

Game.prototype.checkThreeCells = function(arrayOfThreeCells){
	if(arrayOfThreeCells[0].innerText === this.currentPlayer && arrayOfThreeCells[0].innerText === arrayOfThreeCells[1].innerText && arrayOfThreeCells[1].innerText === arrayOfThreeCells[2].innerText){
		return true
	}
	else{
		return false;
	}
}

Game.prototype.checkRow = function(rowNumber, sortedGameBoard){
	row = sortedGameBoard[rowNumber]
	return this.checkThreeCells(row)
}

Game.prototype.checkColumn = function(columnNumber, sortedGameBoard){
	var column = [];
	for(var rowNumber = 0; rowNumber < sortedGameBoard.length; rowNumber++){
		column.push(sortedGameBoard[rowNumber][columnNumber])
	}
	return this.checkThreeCells(column)
}

Game.prototype.checkLeftDiagonal = function(sortedGameBoard){
	var leftDiagonal = [sortedGameBoard[0][0], sortedGameBoard[1][1], sortedGameBoard[2][2]]
	return this.checkThreeCells(leftDiagonal)
}

Game.prototype.checkRightDiagonal = function(sortedGameBoard){
	var rightDiagonal = [sortedGameBoard[0][2], sortedGameBoard[1][1], sortedGameBoard[2][0]]
	return this.checkThreeCells(rightDiagonal)
}

Game.prototype.checkForTie = function(){
	count = 0;
	for(var squareIndex =0; squareIndex < this.board.length; squareIndex++){
		if(this.board[squareIndex].innerText !== ''){
			count++;
		}
	}
	if(count === 9 && !this.checkForWinner()){
		this.tie = true;
		return true;
	}
	else if(count !== 9){
		return false
	}
}

Game.prototype.checkForWinner = function(){
	if(this.checkLeftDiagonal(this.sortedBoard) || this.checkRightDiagonal(this.sortedBoard)){
		this.winner = this.currentPlayer;
		return true
	}
	for(var index = 0; index < this.sortedBoard.length; index++){
		if(this.checkRow(index, this.sortedBoard) || this.checkColumn(index, this.sortedBoard)){
			this.winner = this.currentPlayer
			return true
		}
	}
	return false
}
