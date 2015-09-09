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
				// newGame.checkForWinner();
				// newGame.checkForTie();
				// if(newGame.winner || newGame.Tie){
					// return
				// }
				// else{

				//make the player move, then check to see if there's a win, if there is, 
				//don't execute the computer's move
				flattenedBoard = generateFlattenedDomBoard(newGame.board)
				if(checkForWinner(flattenedBoard)){
					newGame.winner = newGame.humanPlayer;
					return
				}

				//if there is no winner after the player's move, execute the computer's
				else{
				newGame.switchPlayers();
				newGame.makeComputerMove();
				//check to see if the computer made a winning move
				flattenedBoard = generateFlattenedDomBoard(newGame.board)
				checkForWinner(flattenedBoard);
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
	// this.sortedBoard = this.sortBoard(board)
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
	// console.log('current player: ' + this.currentPlayer)
	// console.log('board after the player moved')
	flattenedBoard = generateFlattenedDomBoard(this.board)
	console.log('available squares left')
	console.log(getAvailableMoves(flattenedBoard))
	availableMoves = getAvailableMoves(flattenedBoard)


	//select the index of the move with the greatest score
	//show the available moves and scores pick the index that has the greatest score
	availableMovesWithScores = {}
	for(var moveIndex = 0; moveIndex < availableMoves.length; moveIndex++){
		// console.log('make a move at square ' + availableMoves[moveIndex]);

		//slice can essentially 'clone' an array
		simulatedBoard = flattenedBoard.slice()
		simulatedBoard[availableMoves[moveIndex]] = this.currentPlayer;
		availableMovesWithScores[availableMoves[moveIndex]] = miniMax(simulatedBoard, availableMoves[moveIndex], this.currentPlayer, 0)

	}
	console.log('scores')
	console.log(availableMovesWithScores);


	

	// for(var index = 0; index< flattenedBoard.length; index++){
		// console.log(flat)
	// }

	// availableMoves = this.getAvailableMoves();
	// availableMovesAndScores = this.getMoveScores(availableMoves)
	// for(var possibleMove = 0; possibleMove < availableMoves.length; possibleMove++){
	// 		console.log('return value')
	// 		//go through each move and update the score
	// 		//return the updated game for each, call the check function on it, otherwise repeat the 
	// 		//process
	// 		simulatedGame = this.simulateMove(new Game(this.board), availableMoves[possibleMove], this.currentPlayer)
	// 		scoreForSimulatedGame = simulatedGame.getSimulatedMoveScore(simulatedGame)
	// 		console.log(scoreForSimulatedGame)
	// debugger
	// }
	// this.switchPlayers();
}


function miniMax(simulatedBoard, moveIndex, playerMark, turn){
	console.log('fill in square ' + moveIndex + ' with an ' + playerMark)
	console.log(simulatedBoard)
	if(checkForWinner(simulatedBoard)){
		console.log('winner winner chicken dinner')
	}
	else{
		console.log('no winner mr.beginner')
	}
	debugger

}

// Game.prototype.getAvailableMoves = function(){
// 	availableMoves = [];
// 	for(var availableMoveIndex = 0; availableMoveIndex < this.board.length; availableMoveIndex++){
// 		if(this.board[availableMoveIndex].innerText === ''){
// 			availableMoves.push(availableMoveIndex)
// 		}
// 	}
// 	return availableMoves
// }

// for in starts at 0
// Game.prototype.getMoveScores = function(availableMoves){
// 	moveScores = {}
// 	for(var availableMoveIndex = 0; availableMoveIndex< availableMoves.length; availableMoveIndex++){
// 		moveScores[availableMoves[availableMoveIndex]] = 0
// 	}
// 	return moveScores
// }

//have a simulator function that returns a game object, check if there's a value from that
	//the simulator function makes the move and calls the check for winner/tie and returns the game with the update status so that we can call win/loss

// Game.prototype.getSimulatedMoveScore = function(simulatedGame){
// 	//possibly group checks into a game over function
// 	if(simulatedGame.isOver()){
// 		if(simulatedGame.winner === simulatedGame.humanPlayer){
// 			return 10
// 		}
// 		else if(simulatedGame.winner === simulatedGame.computerPlayer){
// 			return -10
// 		}
// 		else if(simulatedGame.tie){
// 			console.log('tie')
// 			return 0
// 		}
// 	}
// 	else{
// 		console.log('hi')
// 		console.log(simulatedGame.currentPlayer)
// 		nextPossibleMoves = simulatedGame.getAvailableMoves();
// 		console.log(nextPossibleMoves)
// 		for(var index = 0; index < nextPossibleMoves.length; index++){
// 			console.log('simulate move for this player')
// 			console.log(simulatedGame.currentPlayer)
// 			childGame = simulatedGame.simulateMove(new Game(simulatedGame.board), nextPossibleMoves[index], simulatedGame.currentPlayer)
// 			childGameScore = simulatedGame.getSimulatedMoveScore(childGame)
// 			console.log(childGameScore)
// 			console.log('original board')
// 			console.log(simulatedGame.board)
// 		}
// 		// x = x.map(function(num){ return 2})
// 		// y = Object.assign({"key": x[1]})

// 	}
// }

// Game.prototype.simulateMove = function(parentGame, moveIndex, currentPlayer){
// 	// console.log(moveIndex)
// 	// console.log(currentPlayer)
// 	console.log('add this marker')
// 	console.log(currentPlayer)
// 	parentGame.currentPlayer = currentPlayer;
// 	parentGame.board[moveIndex].innerText = currentPlayer
// 	parentGame.checkForWinner();
// 	parentGame.checkForTie();
// 	// console.log(parentGame.board)
// 	return new Game(parentGame.board)
// }

// Game.prototype.isOver = function(){
// 	if(this.winner || this.tie){
// 		return true
// 	}
// 	else{
// 		return false
// 	}
// }

// Game.prototype.makeMove = function (game, player){
// 	marker = document.createTextNode(player)	
// 	this.board[1].appendChild(marker)
// }

// Game.prototype.sortBoard = function(){
// 	sortedGameBoard = [[this.board[0], this.board[1], this.board[2]], [this.board[3], this.board[4], this.board[5]], [this.board[6], this.board[7], this.board[8]]]
// 	return sortedGameBoard
// }

// Game.prototype.checkThreeCells = function(arrayOfThreeCells){
// 	if(arrayOfThreeCells[0].innerText === this.currentPlayer && arrayOfThreeCells[0].innerText === arrayOfThreeCells[1].innerText && arrayOfThreeCells[1].innerText === arrayOfThreeCells[2].innerText){
// 		return true
// 	}
// 	else{
// 		return false;
// 	}
// }

// Game.prototype.checkRow = function(rowNumber, sortedGameBoard){
// 	row = sortedGameBoard[rowNumber]
// 	return this.checkThreeCells(row)
// }

// Game.prototype.checkColumn = function(columnNumber, sortedGameBoard){
// 	var column = [];
// 	for(var rowNumber = 0; rowNumber < sortedGameBoard.length; rowNumber++){
// 		column.push(sortedGameBoard[rowNumber][columnNumber])
// 	}
// 	return this.checkThreeCells(column)
// }

// Game.prototype.checkLeftDiagonal = function(sortedGameBoard){
// 	var leftDiagonal = [sortedGameBoard[0][0], sortedGameBoard[1][1], sortedGameBoard[2][2]]
// 	return this.checkThreeCells(leftDiagonal)
// }

// Game.prototype.checkRightDiagonal = function(sortedGameBoard){
// 	var rightDiagonal = [sortedGameBoard[0][2], sortedGameBoard[1][1], sortedGameBoard[2][0]]
// 	return this.checkThreeCells(rightDiagonal)
// }

// Game.prototype.checkForTie = function(){
// 	count = 0;
// 	for(var squareIndex =0; squareIndex < this.board.length; squareIndex++){
// 		if(this.board[squareIndex].innerText !== ''){
// 			count++;
// 		}
// 	}
// 	if(count === 9 && !this.checkForWinner()){
// 		this.tie = true;
// 		return true;
// 	}
// 	else if(count !== 9){
// 		return false
// 	}
// }

// Game.prototype.checkForWinner = function(){
// 	if(this.checkLeftDiagonal(this.sortedBoard) || this.checkRightDiagonal(this.sortedBoard)){
// 		this.winner = this.currentPlayer;
// 		return true
// 	}
// 	for(var index = 0; index < this.sortedBoard.length; index++){
// 		if(this.checkRow(index, this.sortedBoard) || this.checkColumn(index, this.sortedBoard)){
// 			this.winner = this.currentPlayer
// 			return true
// 		}
// 	}
// 	return false
// }


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
			return true
		}
		else if(arrayOfThreeCells.every(hasThreeOs)){
			console.log('o won')
			return true
		}
	}
	else{
		// console.log('some are empty')
		return false
	}
}

function checkRow(rowNumber, sortedGameBoard){
	row = sortedGameBoard[rowNumber]
	// console.log(row)
	return checkThreeCells(row)
}

function checkColumn(columnNumber, sortedGameBoard){
	var column = [];
	for(var rowNumber = 0; rowNumber < sortedGameBoard.length; rowNumber++){
		column.push(sortedGameBoard[rowNumber][columnNumber])
	}
	return checkThreeCells(column)
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
	console.log(sortedBoard)
	for(var rowColIndex = 0; rowColIndex < sortedBoard.length; rowColIndex++){
		if(checkRow(rowColIndex, sortedBoard) || checkColumn(rowColIndex, sortedBoard)){
			alert('we have a winner')
			return true
		}
	}
}