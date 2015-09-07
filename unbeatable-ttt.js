document.addEventListener("DOMContentLoaded", function(){

	var winner;
	var gameOver = false;
	var tie = false;

	var turn = 0;

	var playerX = {
		name: "X",
		score: 0
	};
	var playerO = {
		name: "O",
		score: 0
	};

	var currentPlayer = playerX;
	
	var squares = document.getElementsByClassName('square')

	var takenSquares = document.getElementsByClassName('square taken');

	var assortedSquares = [[squares[0], squares[1], squares[2]], [squares[3], squares[4], squares[5]], [squares[6], squares[7], squares[8]]]


	var newGame = new Game(squares);
	// newGame.makeComputerMove(newGame.currentPlayer, 1);
	for(var squareNumber = 0; squareNumber < squares.length; squareNumber ++){
		squares[squareNumber].addEventListener('click', makePlayerMove);


	}

	function makePlayerMove(){
		if(newGame.winner){
			return
		}
		else{
			if(this.innerText === ''){
				letter = document.createTextNode(newGame.currentPlayer)
				this.appendChild(letter)
				newGame.checkForWinner();
				newGame.switchPlayers();
				// newGame.makeComputerMove();
			}
			else{
				alert('invalid move')
			}
		}
		console.log(newGame.sortedBoard)
	}
});

var simulationCount = 0;
////////////////////////////////////////////

////////////////////////////////////////////

// game objects

function Game(board){
	this.winner,
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
	// console.log('this is the board')
	// console.log(this.board);
	availableMoves = this.getAvailableMoves();
	// console.log(availableMoves)
	//currentPlayer, squareIndex){
	this.simulate(new Game(this.board), this.currentPlayer)
	// console.log('no winner')
	// console.log(this.winner)
	// console.log(currentPlayer) 
	// marker = document.createTextNode(currentPlayer)
	// this.board[squareIndex].appendChild(marker)

	// // return marker
	// console.log(this.board[squareIndex].innerText)
	// if(this.board[squareIndex.innerText] === ''){
	// 	console.log('hi')
	// }
	// else{
	// 	console.log('taken')
	// }

}

Game.prototype.getAvailableMoves = function(){
	availableMoves = [];
	for(squareIndex in this.board){
		if(this.board[squareIndex].innerText === '')
			availableMoves.push(squareIndex)
	}
	return availableMoves
}

Game.prototype.simulate = function(simGame, currentPlayer){
	simGame.winner = true;
	// console.log('fake win')
	// console.log(simGame.winner)
	// console.log(simGame.getAvailableMoves())
}

Game.prototype.makeMove = function (game, player){
	marker = document.createTextNode(player)	
	console.log(player)
	this.board[1].appendChild(marker)
}

Game.prototype.sortBoard = function(){
	sortedGameBoard = [[this.board[0], this.board[1], this.board[2]], [this.board[3], this.board[4], this.board[5]], [this.board[6], this.board[7], this.board[8]]]
	return sortedGameBoard
}

Game.prototype.checkThreeCells = function(arrayOfThreeCells){
	// console.log(arrayOfThreeCells)
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
	console.log()
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

Game.prototype.checkForWinner = function(){
	console.log('hello?')
	if(this.checkLeftDiagonal(this.sortedBoard) || this.checkRightDiagonal(this.sortedBoard)){
		console.log(this.currentPlayer)
		this.winner = this.currentPlayer;
		return true
	}
	for(var index = 0; index < this.sortedBoard.length; index++){
		if(this.checkRow(index, this.sortedBoard) || this.checkColumn(index, this.sortedBoard)){
			console.log('hi')
			this.winner = this.currentPlayer
			console.log(this.currentPlayer)
			return true
		}
	}
}
