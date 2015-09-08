document.addEventListener("DOMContentLoaded", function(){

	// var winner;
	// var gameOver = false;
	// var tie = false;

	// var turn = 0;

	// var playerX = {
	// 	name: "X",
	// 	score: 0
	// };
	// var playerO = {
	// 	name: "O",
	// 	score: 0
	// };

	// var currentPlayer = playerX;
	
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
				newGame.makeComputerMove();
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
	if(this.winner){
		return
	}
	availableMoves = this.getAvailableMoves();
	//currentPlayer, squareIndex){
	// console.log(this.getMoveScores(availableMoves))

	for(var possibleMove = 0; possibleMove < availableMoves.length; possibleMove++){
		if(this.simulateMove(new Game(this.board), availableMoves[possibleMove], this.currentPlayer)){
			this.board[(this.simulateMove(new Game(this.board), availableMoves[possibleMove], this.currentPlayer))].innerText = this.currentPlayer;
			break;
		}
		console.log('STOP LOOK')
		console.log(this.currentPlayer)
	}
	this.switchPlayers();
	// this.simulateMove(new Game(this.board), this.currentPlayer)

	// marker = document.createTextNode(currentPlayer)
	// this.board[squareIndex].appendChild(marker)
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

Game.prototype.simulateMove = function(simGame, moveIndex, currentPlayer){
	console.log('the currentplayer is ' +currentPlayer)
	simGame.board[moveIndex].innerText = simGame.currentPlayer;
	var moveIndex;
	if(simGame.checkForWinner()){
		if(simGame.winner === simGame.humanPlayer){
			console.log('player will win at ' + moveIndex)
			console.log('MAKE THIS MOVE NOW')
			simGame.board[moveIndex].innerText = '';
			return moveIndex
		}
		else{
			console.log('computer will win at ' + moveIndex)
		}
	}
	simGame.board[moveIndex].innerText = '';
	return false;
	// letter = document.createTextNode(simGame.currentPlayer)
	// simGame.board[moveIndex].appendChild(letter)
	// simGame.switchPlayers()
	// console.log(simGame.currentPlayer)
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

Game.prototype.checkIfBoardIsFilled = function(){
	count = 0;
	for(var squareIndex =0; squareIndex < this.board.length; squareIndex++){
		if(this.board[squareIndex].innerText !== ''){
			count++;
		}
	}
	if(count === 9){
		return true
	}
	else{
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
