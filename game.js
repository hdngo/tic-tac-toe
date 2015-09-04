document.addEventListener("DOMContentLoaded", function(){

	var gameOver = false;
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

	var playerXScore = document.getElementById('X');
	var playerOScore = document.getElementById('O');
	
	var squares = document.getElementsByClassName('square')

	var takenSquares = document.getElementsByClassName('square taken');

	var newGameButton = document.getElementById('new-game-btn')
	newGameButton.addEventListener('click', newGame)

	var resetButton = document.getElementById('reset-btn')
	resetButton.addEventListener('click', resetScores)

	var assortedSquares = [[squares[0], squares[1], squares[2]], [squares[3], squares[4], squares[5]], [squares[6], squares[7], squares[8]]]

	for(var squareNumber = 0; squareNumber < squares.length; squareNumber ++){
		squares[squareNumber].addEventListener('click', makeMove);
	}

	function makeMove(){
		if (gameOver){
			return
		}
		if (checkSquare(this)){
			// alert("that square has been taken already, pick another one!")
			console.log("that square has been taken already, pick another one!")
		}
		else{
			if (turn % 2 == 0){
				marker = "X";
				currentPlayer = playerX;
				playerMarker = makePlayerMarker(marker) 
				this.appendChild(playerMarker);
				this.classList.add('taken');
				checkForWinner(assortedSquares);
				turn++;
				if(takenSquares.length !== 9){
				makeComputerMove();
				}
				else if(takenSquares.length === 9 & gameOver === false){
					alert('tie!')
					gameOver = true;
				}
			}
		}
	}

	
	function makeComputerMove(){
		// working on implementing simulation of unbeatable computer moves
		var simulationBoard = squares;
		var assortedSimulatedSquares = [[simulationBoard[0], simulationBoard[1], simulationBoard[2]], [simulationBoard[3], simulationBoard[4], simulationBoard[5]], [simulationBoard[6], simulationBoard[7], simulationBoard[8]]]
		// console.log(grabAvailableSquareIndices(simulationBoard));
		var availableSquares = grabAvailableSquareIndices(simulationBoard)
		// if (availableSquares.length === 2){
		// }
		// end
		debugger

		// move if gameOver above simulation part
		if(gameOver){
			return
		}
		var randomSquareIndex = Math.floor(Math.random() * 9)
		while (checkSquare(squares[randomSquareIndex])){
			randomSquareIndex =	Math.floor(Math.random() * 9)
		}
		marker = "O";
		currentPlayer = playerO;
		playerMarker = makePlayerMarker(marker)
		squares[randomSquareIndex].appendChild(playerMarker);
		squares[randomSquareIndex].classList.add('taken');
		checkForWinner(assortedSquares);
		turn++;
	}

	function grabAvailableSquareIndices(board){
		console.log(board)
		var availableIndices = [];
		for(var boardIndex = 0; boardIndex < board.length; boardIndex++){
			if (board[boardIndex].classList.length === 1){
				availableIndices.push(boardIndex)
			}
		}
		return availableIndices
	}

	function makeMinimumChoice(){
		// for a given array/hash where each element has a cell index and score, pick the cell index with the lowest score value
	}

	function makeMaximumChoice(){
		// for a given array/hash where each element has a cell index and score, pick the cell index with the lowest score value
	}

	function makePlayerMarker(markerValue){
		marker = document.createTextNode(markerValue)
		return marker
	}

	function checkSquare(square){
		if (square.classList.contains('taken')){
			return true
		}
		else{
			return false
		}
	}

	function checkRow(row){
		return checkThreeCells(row)
	}

	function checkColumn(columnNumber){
		var column = [];
		for(var rowNumber = 0; rowNumber < assortedSquares.length; rowNumber++){
			column.push(assortedSquares[rowNumber][columnNumber])
		}
		return checkThreeCells(column)
	}

	function checkLeftDiagonal(board){
		var diagonal = [board[0][0], board[1][1], board[2][2]]
		return checkThreeCells(diagonal);
	}

	function checkRightDiagonal(board){
		var diagonal = [board[0][2], board[1][1], board[2][0]]
		return checkThreeCells(diagonal);
	}

	function checkThreeCells(arrayOfThreeCells){
		if(arrayOfThreeCells[0].classList.contains('taken') && arrayOfThreeCells[1].classList.contains('taken') && arrayOfThreeCells[2].classList.contains('taken')){
			if(arrayOfThreeCells[0].innerText == arrayOfThreeCells[1].innerText && arrayOfThreeCells[1].innerText == arrayOfThreeCells[2].innerText){
				return true
			}
		}
		else {
			return false
		}
	}

	function checkForWinner(board){
		if(checkLeftDiagonal(board) || checkRightDiagonal(board)){
			// alert(currentPlayer.name + " wins!");
			// updateWins();
			gameOver = true;
			return true
		}
		for (var rowColIndex = 0; rowColIndex < board.length; rowColIndex++){
			if(checkRow(board[rowColIndex]) || checkColumn(rowColIndex)){
				// alert(currentPlayer.name + " wins!")
				// updateWins();
				gameOver = true;
				return true
			}
		}
		return false
	}


	//extraneous functionality to reset game and keep track of scores

	function newGame(){
		for(var cellIndex = 0; cellIndex < squares.length; cellIndex++){
			squares[cellIndex].innerText = '';
			squares[cellIndex].classList.remove('taken');
		}
		gameOver = false;
		turn = 0;
	}

	function updateWins(){
		currentPlayer.score++;
		playerXScore.innerText = playerX.score;
		playerOScore.innerText = playerO.score;
	}

	function resetScores(){
		playerX.score = 0;
		playerO.score = 0;
		playerXScore.innerText = playerX.score;
		playerOScore.innerText = playerO.score;
		newGame();
	}

});