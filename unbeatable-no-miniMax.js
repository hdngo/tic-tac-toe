//WORKING ON A CLEANER SOLUTION USING MINIMAX, STAY TUNED!
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
				else{
				newGame.switchPlayers();
				newGame.makeComputerMove(newGame.turn);
				flattenedBoard = generateFlattenedDomBoard(newGame.board)
				checkForWinner(flattenedBoard);
				if(checkForWinner(flattenedBoard)){
					newGame.winner = newGame.computerPlayer;
					alert('computer winner')
					return
				}
				if(checkForTie(flattenedBoard)){
					newGame.tie = true;
					return
				}
				newGame.switchPlayers();
				}
			}
			else{
				alert('invalid move')
			}			
		}
	}

});

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
		if(turn === 3){
			//
			stateOfDiagonals = this.checkDiagonalsForPotentialPlayerWin();
			if((stateOfDiagonals['leftDiagXCount'] === 2 && stateOfDiagonals['leftDiagOCount'] === 1) || (stateOfDiagonals['rightDiagXCount'] === 2 && stateOfDiagonals['rightDiagOCount'] === 1)){
				firstMoveIndex = this.getIndexOfComputersFirstMove()
				switch(firstMoveIndex){
					//if the element is at a corner, make an available corner move
					//if it's in the middle(4), return either 1, 3, 5, or 7 (make an edge move)
					case 0:
					case 2:
					case 6: 
					case 8:
						this.makeRandomComputerCornerMove();
						break;
					case 4:
						nearByEdgeIndices = [1, 3, 5, 7]
						randomIndexSelection = Math.floor(Math.random() * nearByEdgeIndices.length)
					  edgeIndex = nearByEdgeIndices[randomIndexSelection];
					  this.board[edgeIndex].innerText = this.computerPlayer;
					  break;
					default:
						console.log('the computer did not place an O in any diagonal!')
				}
				return
			}
			else if(stateOfDiagonals['leftDiagXCount'] === 2 && stateOfDiagonals['leftDiagOCount'] == 0){
				//grab the index of the empty diagonal space here
				if(stateOfDiagonals['leftDiagonal'][0] === ''){
					this.board[0].innerText = this.computerPlayer
				}
				else if(stateOfDiagonals['leftDiagonal'][1] === ''){
					this.board[4].innerText = this.computerPlayer
				}
				else if(stateOfDiagonals['leftDiagonal'][2] === ''){
					this.board[8].innerText = this.computerPlayer
				}
				return
			}
			else if(stateOfDiagonals['rightDiagXCount'] === 2 && stateOfDiagonals['rightDiagOCount'] ===0){
				if(stateOfDiagonals['rightDiagonal'][0] === ''){
					this.board[2].innerText = this.computerPlayer
				}
				else if(stateOfDiagonals['rightDiagonal'][1] === ''){
					this.board[4].innerText = this.computerPlayer
				}
				else if(stateOfDiagonals['rightDiagonal'][2] === ''){
					this.board[6].innerText = this.computerPlayer
				}
				return
			}
			else if((stateOfDiagonals['leftDiagXCount'] === 1 && stateOfDiagonals['leftDiagOCount'] === 1) || (stateOfDiagonals['rightDiagXCount'] === 1 && stateOfDiagonals['rightDiagOCount'] === 1) || (stateOfDiagonals['leftDiagXCount'] === 0 && stateOfDiagonals['rightDiagXCount'] === 0)){

				if(this.checkIfPlayerCanWinNextMove()){
					this.makeWinningOrBlockingMove();
					return
				}
				else{
				//should block a corner on the side where there is an x in the middle
				if(this.board[3].innerText === "X"){
					possibleCorners = [0, 6]
					randomCornerSelection = Math.floor(Math.random() * possibleCorners.length)
					corner = possibleCorners[randomCornerSelection]
					while(this.board[corner].innerText !== ''){
						randomCornerSelection = Math.floor(Math.random() * possibleCorners.length)
						corner = possibleCorners[randomCornerSelection]
					}
					this.board[corner].innerText = this.computerPlayer
					return
				}
				else if(this.board[5].innerText === "X"){
					possibleCorners = [2, 8]
					randomCornerSelection = Math.floor(Math.random() * possibleCorners.length)
					corner = possibleCorners[randomCornerSelection]
					while(this.board[corner].innerText !== ''){
						randomCornerSelection = Math.floor(Math.random() * possibleCorners.length)
						corner = possibleCorners[randomCornerSelection]
					}
					this.board[corner].innerText = this.computerPlayer
					return
				}
				else if(this.board[1].innerText === "X" || this.board[7].innerText === "X"){
					possibleEdges = [3, 5]
					randomEdgeSelection = Math.floor(Math.random() * possibleEdges.length)
					edge = possibleEdges[randomEdgeSelection]
					while(this.board[edge].innerText !== ''){
						randomEdgeSelection = Math.floor(Math.random() * possibleEdges.length)
						edge= possibleEdges[randomEdgeSelection]
					}
					this.board[edge].innerText = this.computerPlayer
					return
				}
				}
				this.makeWinningOrBlockingMove();
				return
			}
		}
		//if there aren't any potential ways for a player to win using a diagonal, just follow the typical 'make a winning or blocking move' procedure
		this.makeWinningOrBlockingMove();
		return
	}	
}

Game.prototype.getIndexOfComputersFirstMove = function(){
	firstMoveIndex = null;
	for(var index = 0; index < this.board.length; index++){
		if(this.board[index].innerText === "O"){
			firstMoveIndex = index;
		}
	}
	return firstMoveIndex
}

Game.prototype.checkIfPlayerCanWinNextMove = function(){
	flattenedBoard = generateFlattenedDomBoard(this.board)
	availableMoves = getAvailableMoves(flattenedBoard)
	winnerAfterNextMove = false;
	for(var availableMoveIndex = 0; availableMoveIndex < availableMoves.length; availableMoveIndex++){
		//make fake player move
		this.board[availableMoves[availableMoveIndex]].innerText = this.humanPlayer
		if(checkForWinner(generateFlattenedDomBoard(this.board))){
			winnerAfterNextMove = true;
		}			
		this.board[availableMoves[availableMoveIndex]].innerText = ''
	}
	return winnerAfterNextMove;
}

Game.prototype.makeWinningOrBlockingMove = function(){
			flattenedBoard = generateFlattenedDomBoard(this.board)
			availableMoves = getAvailableMoves(flattenedBoard)
			winnerAfterNextMove = false;
			winIndex = null;
			blockIndex = null;

			for(var availableMoveIndex = 0; availableMoveIndex < availableMoves.length; availableMoveIndex++){
				//try computer move first
				this.board[availableMoves[availableMoveIndex]].innerText = this.computerPlayer
				if(checkForWinner(generateFlattenedDomBoard(this.board))){
					winnerAfterNextMove = true;
					winIndex = availableMoves[availableMoveIndex]
				}	
				//make fake player move
				this.board[availableMoves[availableMoveIndex]].innerText = this.humanPlayer
				if(checkForWinner(generateFlattenedDomBoard(this.board))){
					winnerAfterNextMove = true;
					blockIndex = availableMoves[availableMoveIndex]
				}			
				this.board[availableMoves[availableMoveIndex]].innerText = ''
			}
		 //if theres a win index, make it first, if there's only a loss, block it
	 	 if(winIndex !== null){
	 	 	this.board[winIndex].innerText = this.computerPlayer
	 	 }
	 	 else if(winIndex === null && blockIndex !== null){
	 	 	this.board[blockIndex].innerText = this.computerPlayer
	 	 }
	 	 else{
	 	 		
	 	 		//if there's no winner within the last 2 moves, make a random move
	 	 		if(availableMoves.length == 2){
	 	 			randomLastMoveIndex = Math.floor(Math.random() * 2)
	 	 			randomSquare = availableMoves[randomLastMoveIndex]
	 	 			this.board[randomSquare].innerText = this.computerPlayer
	 	 			return
	 	 		}
	 	 		//if there's more than 2 moves left, make a random corner move if possibles
	 	 		if(this.getAvailableCorners().length !== 0){
	 	 			this.makeRandomComputerCornerMove()
	 	 			return
	 	 		}
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
	leftDiagOCount = 0;
	rightDiagXCount = 0;
	rightDiagOCount = 0;
	leftDiagonal = this.getLeftDiagonal();
	rightDiagonal = this.getRightDiagonal();
	for(var diagonalIndex = 0; diagonalIndex < 3; diagonalIndex++){
		if(leftDiagonal[diagonalIndex] === "X"){
			leftDiagXCount++;
		}
		else if(leftDiagonal[diagonalIndex] === "O"){
			leftDiagOCount++;
		}
		if(rightDiagonal[diagonalIndex] === "X"){
			rightDiagXCount++;
		}
		else if(rightDiagonal[diagonalIndex] === "O"){
			rightDiagOCount++;
		}
	}
	return {'leftDiagonal': leftDiagonal, 'leftDiagXCount': leftDiagXCount, 'leftDiagOCount': leftDiagOCount, 'rightDiagonal': rightDiagonal, 'rightDiagXCount': rightDiagXCount, 'rightDiagOCount': rightDiagOCount}
}

Game.prototype.makeComputerCenterMove = function(){
	this.board[4].innerText = this.computerPlayer;
}

Game.prototype.getAvailableCorners = function(){
	var cornerSquareIndices = [0, 2, 6, 8]
	availableCornerSquareIndices = []
	for(var cornerSquareIndice = 0; cornerSquareIndice < cornerSquareIndices.length; cornerSquareIndice++){
		if(this.board[cornerSquareIndices[cornerSquareIndice]].innerText === ''){
			availableCornerSquareIndices.push(cornerSquareIndices[cornerSquareIndice])
		}
	}
	return availableCornerSquareIndices
}

Game.prototype.makeRandomComputerCornerMove = function(){
	availableCorners = this.getAvailableCorners();
	randomCornerIndexSelection = Math.floor(Math.random() * availableCorners.length)
	corner = availableCorners[randomCornerIndexSelection]
	this.board[corner].innerText = this.computerPlayer; 
}

Game.prototype.makeComputerCornerMove = function(){
	cornerSquareIndices = [0, 2, 6, 8]
	randomIndexSelection = Math.floor(Math.random() * 4)
	corner = cornerSquareIndices[randomIndexSelection]
	this.board[corner].innerText = this.computerPlayer;
}

Game.prototype.makeComputerEdgeMove = function(){
	edgeSquareIndices = [1, 3, 5, 7]
	randomIndexSelection = Math.floor(Math.random() * 4)
	edge = edgeSquareIndices[randomIndexSelection]
	while(this.board[edge].innerText !== ''){
		randomIndexSelection = Math.floor(Math.random() * 4)
		edge = edgeSquareIndices[randomIndexSelection]
	}	
	this.board[edge].innerText = this.computerPlayer;
}

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
			return "X"
		}
		else if(arrayOfThreeCells.every(hasThreeOs)){
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

