// incomplete solution
document.addEventListener("DOMContentLoaded", function(){

	var newGameButton = document.getElementById('new-game-btn')
	newGameButton.addEventListener('click', newGame)

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
		// else{
			if(this.innerText === ''){
				letter = document.createTextNode(newGame.currentPlayer)
				this.appendChild(letter)

				//make the player move, then check to see if there's a win, if there is, 
				//don't execute the computer's move
				// flattenedBoard = generateFlattenedDomBoard(newGame.board)
				// if(checkForWinner(flattenedBoard)){
				// 	newGame.winner = newGame.currentPlayer;
				// 	alert('winner' + newGame.winner)
				// 	return
				// }
				// else if(checkForTie(flattenedBoard)){
				// 	newGame.tie = true;
				// 	return
				// }
				checkIfGameIsOver(newGame)
				if(newGame.winner || newGame.tie){
					return
				}
				//if there is no winner after the player's move, execute the computer's
				else{
					newGame.switchPlayers();
					// newGame.makeComputerMove();

					//check to see if the computer made a winning move
					// flattenedBoard = generateFlattenedDomBoard(newGame.board)
					// if(checkForWinner(flattenedBoard)){
					// 	newGame.winner = newGame.currentPlayer;
					// 	alert('winner' + newGame.winner)
					// 	return
					// }
					// if(checkForTie(flattenedBoard)){
					// 	newGame.tie = true;
					// 	return
					// }
					checkIfGameIsOver(newGame)
				}
			}
			// }
			else{
				alert('invalid move')
			}			
		}
	// }
});

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

Game.prototype.getBestMove = function(
	){
	flattenedBoard = generateFlattenedDomBoard(this.board)
	availableMoves = getAvailableMoves(flattenedBoard)


	//select the index of the move with the greatest score
	//show the available moves and scores pick the index that has the greatest score
	availableMovesWithScores = {}
	for(var moveIndex = 0; moveIndex < availableMoves.length; moveIndex++){

		//slice can essentially 'clone' an array
		simulatedBoard = flattenedBoard.slice()
		//make a move and then grab the score
		simulatedBoard[availableMoves[moveIndex]] = this.currentPlayer;
		availableMovesWithScores[availableMoves[moveIndex]] = miniMax(simulatedBoard, availableMoves[moveIndex], this.currentPlayer, 0)
		console.log(availableMovesWithScores)
	}
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
		return true;
	}
}

function checkIfGameIsOver(game){
	flattenedBoard = generateFlattenedDomBoard(game.board)
	if(checkForWinner(flattenedBoard)){
		game.winner = game.currentPlayer;
		alert('winner' + game.winner)
		return true
	}
	if(checkForTie(flattenedBoard)){
		game.tie = true;
		alert('we have a tie')
		return true
	}
	return false
}

function newGame(){
	for(var cellIndex = 0; cellIndex < squares.length; cellIndex++){
		squares[cellIndex].innerText = '';
		squares[cellIndex].classList.remove('taken');
	}
	gameOver = false;
	turn = 0;
}



//more pseudocode
// function getBestMove( currentBoard, cpu, 0);


//function getBestMove( board, currentPlayer, turn number){
	// Check if game is over
		// If lose return 1000
		// Else return turn number
	// Otherwise
	//	make scores array --> initalize to big number?
	//	loop through each possible moves
			// {
		//			make the move
		//			scores[current move] = call function (board, opposite player, turn++)
		// 			undo current move
	//			}
	//  loop through scores array and return min

// }