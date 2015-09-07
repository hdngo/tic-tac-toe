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
	newGame.makeComputerMove(newGame.currentPlayer, 1);
	for(var squareNumber = 0; squareNumber < squares.length; squareNumber ++){
		squares[squareNumber].addEventListener('click', newGame.validateMove);
	}

	// debugger


});

function Game(board){
	this.winner = null;
	this.turn = 0;
	this.board = board,
	this.humanPlayer = "X",
	this.computerPlayer = "O",
	this.currentPlayer = this.humanPlayer;
}

Game.prototype.validateMove = function(){
	if (this.innerText == ''){
		console.log('okay you can do that')
	}
	else{
		console.log('invalid move pal')
	}
}

Game.prototype.makeComputerMove = function(currentPlayer, squareIndex){
	console.log(currentPlayer) 
	marker = document.createTextNode(currentPlayer)
	this.board[squareIndex].appendChild(marker)

	// return marker
	console.log(this.board[squareIndex].innerText)
	if(this.board[squareIndex.innerText] === ''){
		console.log('hi')
	}
	else{
		console.log('taken')
	}
}


