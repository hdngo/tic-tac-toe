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
		if(this.innerText === ''){
			letter = document.createTextNode(newGame.currentPlayer)
			this.appendChild(letter)
			newGame.switchPlayers();
			newGame.makeComputerMove();
		}
		else{
			alert('invalid move')
		}
	}

	
});

// game objects

function Game(board){
	this.winner = null;
	this.turn = 0;
	this.board = board,
	this.humanPlayer = "X",
	this.computerPlayer = "O",
	this.currentPlayer = this.humanPlayer;
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
	console.log('this is the board')
	console.log(this.board);
	availableMoves = this.getAvailableMoves();
	console.log(availableMoves)
	//currentPlayer, squareIndex){


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

Game.prototype.makeMove = function (game, player){
	marker = document.createTextNode(player)	
	console.log(player)
	this.board[1].appendChild(marker)
}


