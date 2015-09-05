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
		var currentTurnNumber = turn;
		var simulationBoard = squares;
		var assortedSimulatedSquares = [[simulationBoard[0], simulationBoard[1], simulationBoard[2]], [simulationBoard[3], simulationBoard[4], simulationBoard[5]], [simulationBoard[6], simulationBoard[7], simulationBoard[8]]]

		availableSquares = grabAvailableSquareIndices(simulationBoard)

		movesAndScoresRecord = {}
		for(var availableSquareIndex = 0; availableSquareIndex < availableSquares.length; availableSquareIndex++){
			movesAndScoresRecord[availableSquareIndex] = 0;
		}

		// for each option, make a move
		for(var availableSquareIndex = 0; availableSquareIndex < availableSquares.length; availableSquareIndex++){
			simulateMoveChain(simulationBoard, availableSquareIndex, movesAndScoresRecord)
		}

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

	function simulateMoveChain(board, squareIndex, currentMoveAndScoresRecord, fakeTurn, boardStatus){

		//base case - return variable score if available moves left is 2
		// if(grabAvailableSquareIndices(board).length === 2){
		// 	console.log('LAST MOVE BRUH')
		// }



		fakeTurn = typeof(fakeTurn) == 'undefined' ?  1 : fakeTurn;

		// here is where i need to recurse and go through the board 
		var marker;
		if (fakeTurn % 2 === 0){
			//simulate player move
			marker = "X";
			playerMarker = makePlayerMarker(marker) 
		}
		else{
			marker = "O";
			playerMarker = makePlayerMarker(marker) 
		}
		// for(var i = 0; i<board.length; i++){
			// console.log('hi')
			// console.log(board[1])
			// squares[1].appendChild(playerMarker)
			// squares[1].classList.add('taken')
		// }
    

		// simulateMoveChain(board, squareIndex, currentMoveAndScoresRecord, fakeTurn + 1)
	}

	function grabAvailableSquareIndices(board){
		// console.log(board)
		var availableIndices = [];
		for(var boardIndex = 0; boardIndex < board.length; boardIndex++){
			if (board[boardIndex].classList.length === 1){
				availableIndices.push(boardIndex)
			}
		}
		return availableIndices
	}

	function makeMaximumChoice(moveScoreHash){
		// for a given array/hash where each element has a cell index and score, pick the cell index with the lowest score value
		moveScoreHashKeys = Object.keys(moveScoreHash)
		maxScore = moveScoreHash[moveScoreHashKeys[0]]
		indexOfOptimalSquare = moveScoreHashKeys[0]
		for(squareIndex in moveScoreHash){
			
			if(moveScoreHash[squareIndex] > maxScore){
				maxScore = moveScoreHash[squareIndex]
				indexOfOptimalSquare = squareIndex - 1;
				//subtract 1 because the actual board array starts with a 0 index
			}
		}
		// console.log(indexOfOptimalSquare)
	}

	function makePlayerMarker(markerValue){
		marker = document.createTextNode(markerValue)
		return marker
	}

	function makeMinimumChoice(moveScoreHash){

		// for a given array/hash where each element has a cell index and score, pick the cell index with the lowest score value

		moveScoreHashKeys = Object.keys(moveScoreHash)
		var minScore = moveScoreHash[moveScoreHashKeys[0]]
		var indexOfOptimalSquare = moveScoreHashKeys[0]
		for(squareIndex in moveScoreHash){
			
			if(moveScoreHash[squareIndex] < minScore){
				minScore = moveScoreHash[squareIndex]
				indexOfOptimalSquare = squareIndex - 1;
			}
		}
		return indexOfOptimalSquare
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

	function checkColumn(columnNumber, assortedBoard){
		var column = [];
		for(var rowNumber = 0; rowNumber < assortedBoard.length; rowNumber++){
			column.push(assortedBoard[rowNumber][columnNumber])
		}
		return checkThreeCells(column)
	}

	function checkLeftDiagonal(assortedBoard){
		var diagonal = [assortedBoard[0][0], assortedBoard[1][1], assortedBoard[2][2]]
		return checkThreeCells(diagonal);
	}

	function sortBoard(board){
		sortedBoard = [[board[0], board[1], board[2]], [board[3], board[4], board[5]], [board[6], board[7], board[8]]]
		return sortedBoard
	}

	function checkRightDiagonal(assortedBoard){
		var diagonal = [assortedBoard[0][2], assortedBoard[1][1], assortedBoard[2][0]]
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

	function checkForWinner(assortedBoard){
		if(checkLeftDiagonal(assortedBoard) || checkRightDiagonal(assortedBoard)){
			alert(currentPlayer.name + " wins!");
			updateWins();
			gameOver = true;
			return true
		}
		for (var rowColIndex = 0; rowColIndex < assortedBoard.length; rowColIndex++){
			if(checkRow(assortedBoard[rowColIndex]) || checkColumn(rowColIndex, assortedBoard)){
				alert(currentPlayer.name + " wins!")
				updateWins();
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