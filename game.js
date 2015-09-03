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
			alert("that square has been taken already, pick another one!")
		}
		else{
			if (turn % 2 == 0){
				marker = "X";
				currentPlayer = playerX;
				playerMarker = makePlayerMarker(marker) 
				this.appendChild(playerMarker);
				this.classList.add('taken');
				checkForWinner();
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
		checkForWinner();
		turn++;
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

	function checkLeftDiagonal(){
		
		var diagonal = [assortedSquares[0][0], assortedSquares[1][1], assortedSquares[2][2]]
		console.log(diagonal)
		return checkThreeCells(diagonal);
	}

	function checkRightDiagonal(){
		var diagonal = [assortedSquares[0][2], assortedSquares[1][1], assortedSquares[2][0]]
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

	function checkForWinner(){
		if(checkLeftDiagonal() || checkRightDiagonal()){
			alert("we have a winner");
			updateWins();
			gameOver = true;
		}
		for (var rowColIndex = 0; rowColIndex < assortedSquares.length; rowColIndex++){
			if(checkRow(assortedSquares[rowColIndex]) || checkColumn(rowColIndex)){
				alert("we have a winner")
				updateWins();
				gameOver = true;
				return
			}
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