document.addEventListener("DOMContentLoaded", function(){

	var squares = document.getElementsByClassName('square')

	var takenSquares = document.getElementsByClassName('square taken');

	var assortedSquares = [[squares[0], squares[1], squares[2]], [squares[3], squares[4], squares[5]], [squares[6], squares[7], squares[8]]]


	var newGame = new Game(squares);
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
				//make the player move, then check to see if there's a win, if there is, 
				//don't execute the computer's move
				flattenedBoard = generateFlattenedDomBoard(newGame.board)
				if(checkForWinner(flattenedBoard)){
					newGame.winner = newGame.humanPlayer;
					alert('winner')
					return
				}
				if(checkForTie(flattenedBoard)){
					newGame.tie = true;
					return
				}
				//if there is no winner after the player's move, execute the computer's
				else{
				newGame.switchPlayers();
				newGame.makeComputerMove(newGame.turn);
				//check to see if the computer made a winning move
				flattenedBoard = generateFlattenedDomBoard(newGame.board)
				checkForWinner(flattenedBoard);
				newGame.switchPlayers();
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
	this.currentPlayer = this.humanPlayer
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

Game.prototype.checkPlayersFirstMove = function(){
	playersFirstMove = {}
	currentBoard = sortBoard(generateFlattenedDomBoard(this.board))
	for(var rowIndex = 0; rowIndex < currentBoard.length; rowIndex++){
		for(var colIndex = 0; colIndex < currentBoard.length; colIndex++){
			if(currentBoard[rowIndex][colIndex] === "X"){
				playersFirstMove['row'] = rowIndex
				playersFirstMove['col'] = colIndex
				return playersFirstMove;
			}
		}
	}
}

Game.prototype.makeComputerMove = function(turn){
	if(turn === 1){
		playersFirstMove = this.checkPlayersFirstMove()
		if(this.checkForCenterMove(playersFirstMove)){
			this.makeComputerCornerMove()
		}
		else if(this.checkForCornerMove(playersFirstMove)){
			this.makeComputerCenterMove()
		}
		else if(!this.checkForCenterMove(playersFirstMove) && !this.checkForCornerMove(playersFirstMove)){
			this.makeComputerCenterMove();
		}
	}
	else{
		//for each available move, fake it, check if there's a win, if there is with that move
		//execute the following

		flattenedBoard = generateFlattenedDomBoard(this.board)
		availableMoves = getAvailableMoves(flattenedBoard)

		winnerAfterNextMove = false;
		for(var availableMoveIndex = 0; availableMoveIndex < availableMoves.length; availableMoveIndex++){
			//try computer move first
			this.board[availableMoves[availableMoveIndex]].innerText = this.computerPlayer
			if(checkForWinner(generateFlattenedDomBoard(this.board))){
				// winnerAfterNextMove = true;
				// break;
				return
			}			
			else{
				this.board[availableMoves[availableMoveIndex]].innerText = ''
			}

			this.board[availableMoves[availableMoveIndex]].innerText = this.humanPlayer
			if(checkForWinner(generateFlattenedDomBoard(this.board))){
				winnerAfterNextMove = true;
				console.log('player is about to win if you let him choose square' + availableMoves[availableMoveIndex])
				this.board[availableMoves[availableMoveIndex]].innerText = this.computerPlayer
				// break;
				return
			}			
			else{
				this.board[availableMoves[availableMoveIndex]].innerText = ''
			}
		}

		if(!winnerAfterNextMove){
			console.log('make the computer make a leading move!')
			//check diagonal first
			this.checkDiagonalsForPotentialPlayerWin();
			this.makeComputerEdgeMove()
		}
		//check if computer can win in 1 move, make it if there is one

		//check if player will in in 1 move, block it if there is one 

		//make a corner move if its open

		//
	}	

}


Game.prototype.checkForCenterMove = function(move){
	if(move['row'] == 1 && move['col'] == 1){
		return true
	}
}

Game.prototype.checkForCornerMove = function(move){
	if(move['row'] == 0){
		if(move['col'] == 0 || move['col'] == 2){
			return true
		}
	}
	else if(move['row'] == 2){
		if(move['col'] == 0 || move['col'] == 2){
			return true
		}
	}
}

Game.prototype.getLeftDiagonal = function(){
	flattenedBoard = generateFlattenedDomBoard(this.board)
	return [flattenedBoard[0], flattenedBoard[4], flattenedBoard[8]] 
}

Game.prototype.getRightDiagonal = function(){
	flattenedBoard = generateFlattenedDomBoard(this.board)
	return [flattenedBoard[2], flattenedBoard[4], flattenedBoard[6]] 
}

Game.prototype.checkDiagonalsForPotentialPlayerWin = function(){
	leftDiagXCount = 0;
	rightDiagXCount = 0;
	leftDiagonal = this.getLeftDiagonal();
	rightDiagonal = this.getRightDiagonal();
	console.log(leftDiagonal.length)
	for(var diagonalIndex = 0; diagonalIndex < leftDiagonal.length; leftDiagonal++){
		if(leftDiagonal[diagonalIndex] === "X"){
			console.log('x in left')
		}
		else if(rightDiagonal[diagonalIndex] === "X"){
			console.log('x in right')
		}
		console.log(leftDiagonal[diagonalIndex])
	}
	// if(leftDiagXCount === 2 || rightDiagXCount === 2){
		// console.log('choose a random edge')
	// }
}


Game.prototype.makeComputerCenterMove = function(){
	//make the computer place an 'o' in the center
	this.board[4].innerText = this.computerPlayer;
}

Game.prototype.makeComputerCornerMove = function(){
	//pick a random index that corresponds to a corner square from the board (0, 2, 6, 8)
	cornerSquareIndices = [0, 2, 6, 8]
	randomIndexSelection = Math.floor(Math.random() * 4)
	corner = cornerSquareIndices[randomIndexSelection]
	this.board[corner].innerText = this.computerPlayer;
}

Game.prototype.makeComputerEdgeMove = function(){
	//pick a random index that corresponds to an edge square from the board (1, 3, 5, 7)
	edgeSquareIndices = [1, 3, 5, 7]
	randomIndexSelection = Math.floor(Math.random() * 4)
	edge = edgeSquareIndices[randomIndexSelection]
	this.board[edge].innerText = this.computerPlayer;
}

////////
function isNotEmpty(cell, index, array){
	return cell !== '';
}

function hasThreeXs(cell, index, array){
	return cell === "X";
}

function hasThreeOs(cell, index, array){
	return cell === "O";
}

function checkThreeCells(arrayOfThreeCells){
	if(arrayOfThreeCells.every(isNotEmpty)){
		if(arrayOfThreeCells.every(hasThreeXs)){
			console.log('x won')
			return "X"
		}
		else if(arrayOfThreeCells.every(hasThreeOs)){
			console.log('o won')
			return "O"
		}
	}
	else{
		return false
	}
}

function checkRow(rowNumber, sortedGameBoard){
	row = sortedGameBoard[rowNumber]
	return checkThreeCells(row)
}

function checkColumn(columnNumber, sortedGameBoard){
	var column = [];
	for(var rowNumber = 0; rowNumber < sortedGameBoard.length; rowNumber++){
		column.push(sortedGameBoard[rowNumber][columnNumber])
	}
	return checkThreeCells(column)
}

function checkLeftDiagonal(sortedGameBoard){
	var leftDiagonal = [sortedGameBoard[0][0], sortedGameBoard[1][1], sortedGameBoard[2][2]]
	return checkThreeCells(leftDiagonal)
}

function checkRightDiagonal(sortedGameBoard){
	var rightDiagonal = [sortedGameBoard[0][2], sortedGameBoard[1][1], sortedGameBoard[2][0]]
	return checkThreeCells(rightDiagonal)
}

function sortBoard(board){
	sortedBoard = [[board[0], board[1], board[2]], [board[3], board[4], board[5]], [board[6], board[7], board[8]]]
	return sortedBoard
}

function generateFlattenedDomBoard(board){
	flatBoard = [];
	for(var index = 0; index < board.length; index++){
		flatBoard.push(board[index].innerText);
	}
	return flatBoard;
}

function getAvailableMoves(flattenedBoard){
	availableMoves = [];
	for(var index = 0; index < flattenedBoard.length; index++){
		if(flattenedBoard[index] === ''){
			availableMoves.push(index);
		}
	}
	return availableMoves;
}

function checkForWinner(board){
	sortedBoard = sortBoard(board);
	if(checkLeftDiagonal(sortedBoard)){
		return checkLeftDiagonal(sortedBoard)
	}
	if(checkRightDiagonal(sortedBoard)){
		return checkRightDiagonal(sortedBoard)
	}
	for(var rowColIndex = 0; rowColIndex < sortedBoard.length; rowColIndex++){
		if(checkRow(rowColIndex, sortedBoard)){
			return checkRow(rowColIndex,sortedBoard)
		}
		if(checkColumn(rowColIndex, sortedBoard)){
			return checkColumn(rowColIndex, sortedBoard)
		}
	}
}

function checkForTie(board){
	if(getAvailableMoves(board).length === 0 && !checkForWinner(flattenedBoard)){
		alert('we have a tie!')
		return true;
	}
}