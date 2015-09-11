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
		if(turn === 3){
			stateOfDiagonals = this.checkDiagonalsForPotentialPlayerWin();
			console.log(stateOfDiagonals)
			if(stateOfDiagonals['leftDiagXCount'] === 2 && stateOfDiagonals['leftDiagOCount'] === 1){
				console.log('need to address this')
				//make edge move where available
				return
			}
			else if(stateOfDiagonals['rightDiagXCount'] === 2 && stateOfDiagonals['rightDiagOCount'] === 1){
				console.log('also need to address this')
				//make edge move next to the x
				return
			}
			else if(stateOfDiagonals['leftDiagXCount'] === 2 && stateOfDiagonals['leftDiagOCount'] == 0){
				this.board[8].innerText = this.computerPlayer
				return
			}
			else if(stateOfDiagonals['rightDiagXCount'] === 2 && stateOfDiagonals['rightDiagOCount'] ===0){
				//make available edge move
				this.board[6].innerText = this.computerPlayer
				return
			}
			else if((stateOfDiagonals['leftDiagXCount'] === 1 && stateOfDiagonals['leftDiagOCount'] === 1) || (stateOfDiagonals['rightDiagXCount'] === 1 && stateOfDiagonals['rightDiagOCount'] === 1)){
				// this.makeComputerEdgeMove();
				this.makeWinningOrBlockingMove();
				return
			}
		}

		this.makeWinningOrBlockingMove();
	}	
}

Game.prototype.getIndexOfComputersFirstMove = function(){
	firstMoveIndex = null;
	for(var index = 0; index < this.board.length; oIndex++){
		if(this.board[oIndex].innerText === "O"){
			firstMoveIndex = index;
		}
	}
	// if it's at the top left(0), return either 1 or 3
	// if it's in the middle, return either 1, 3, 5, or 7 (make an edge move)
	// if it's at the top right(2), return either 1 or 5
	// if it's at the bottom left, return either 3 or 7
	// bottom right, return either 5 or 7
}

Game.prototype.makeWinningOrBlockingMove = function(){
			flattenedBoard = generateFlattenedDomBoard(this.board)
			availableMoves = getAvailableMoves(flattenedBoard)
			winnerAfterNextMove = false;
			winIndex = null;
			blockIndex = null;
			//currently the loop checks each move and sees if there will be a win at a spot for the computer and player, if not computer, it checks the player and quickly blocks it, but the computer has to go through the whole loop, and find the index at which there is a win if any

			for(var availableMoveIndex = 0; availableMoveIndex < availableMoves.length; availableMoveIndex++){
				//try computer move first
				this.board[availableMoves[availableMoveIndex]].innerText = this.computerPlayer
				if(checkForWinner(generateFlattenedDomBoard(this.board))){
					winnerAfterNextMove = true;
					winIndex = availableMoves[availableMoveIndex]
					console.log('win here' + winIndex)

					// this.board[availableMoves[availableMoveIndex]].innerText = this.computerPlayer
				}	
				//make fake player move
				this.board[availableMoves[availableMoveIndex]].innerText = this.humanPlayer
				if(checkForWinner(generateFlattenedDomBoard(this.board))){
					console.log('should block at ' + availableMoves[availableMoveIndex])
					winnerAfterNextMove = true;
					blockIndex = availableMoves[availableMoveIndex]
					// this.board[availableMoves[availableMoveIndex]].innerText = this.computerPlayer
				}			
				this.board[availableMoves[availableMoveIndex]].innerText = ''
			}
			console.log('win index' + winIndex + ' block index ' + blockIndex)

			//if theres a win index, make it first, if there's only a loss, block it
	 	 if(winIndex !== null){
	 	 	this.board[winIndex].innerText = this.computerPlayer
	 	 	return
	 	 }
	 	 else if(winIndex === null && blockIndex !== null){
	 	 	this.board[blockIndex].innerText = this.computerPlayer
	 	 	return
	 	 }
	 	 else{
	 	 		if(this.getAvailableCorners().length !== 0){
	 	 			this.makeRandomComputerCornerMove()
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
	return {'leftDiagXCount': leftDiagXCount, 'leftDiagOCount': leftDiagOCount, 'rightDiagXCount': rightDiagXCount, 'rightDiagOCount': rightDiagOCount}
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
	console.log(availableCornerSquareIndices)
	return availableCornerSquareIndices
}

Game.prototype.makeRandomComputerCornerMove = function(){
	availableCorners = this.getAvailableCorners();
	randomCornerIndexSelection = Math.floor(Math.random() * availableCorners.length)
	corner = availableCorners[randomCornerIndexSelection]
	this.board[corner].innerText = this.computerPlayer; 
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
	while(this.board[edge].innerText !== ''){
		randomIndexSelection = Math.floor(Math.random() * 4)
		edge = edgeSquareIndices[randomIndexSelection]
	}	
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