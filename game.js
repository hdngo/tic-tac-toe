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
			}
			else {
				marker = "O";
				currentPlayer = playerO;
			}
			playerMarker = makePlayerMarker(marker)
			this.appendChild(playerMarker);
			this.classList.add('taken');
			checkForWin();
			turn++;
		}
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
		if(row[0].classList.contains('taken') && row[1].classList.contains('taken') && row[2].classList.contains('taken')){
			if (row[0].innerText === row[1].innerText && row[1].innerText === row[2].innerText){
				return true
			}
		}
		else{
			return false
		}
	}

	function checkColumn(columnNumber){
		var column = [];
		for(var rowNumber = 0; rowNumber < assortedSquares.length; rowNumber++){
			column.push(assortedSquares[rowNumber][columnNumber])
		}
		return checkRow(column)
	}

	function checkLeftDiagonal(){
		var diagonal = [];
		for (var cellIndex = 0; cellIndex < assortedSquares.length; cellIndex++){
			diagonal.push(assortedSquares[cellIndex][cellIndex])
		}

		if(diagonal[0].classList.contains('taken') && diagonal[1].classList.contains('taken') && diagonal[2].classList.contains('taken')){
			if(diagonal[0].innerText == diagonal[1].innerText && diagonal[1].innerText == diagonal[2].innerText){
				return true
			}
		}
		else {
			return false
		}
	}

	function checkRightDiagonal(){
		var diagonal = [];
		for (var cellIndex = 0; cellIndex < assortedSquares.length; cellIndex++){
			diagonal.push(assortedSquares[cellIndex][assortedSquares.length - 1 - cellIndex])
		}

		if(diagonal[0].classList.contains('taken') && diagonal[1].classList.contains('taken') && diagonal[2].classList.contains('taken')){
			if(diagonal[0].innerText == diagonal[1].innerText && diagonal[1].innerText == diagonal[2].innerText){
				return true
			}
		}
		else {
			return false
		}
	}

	function checkForWin(){
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
			}
		}
	}

	function newGame(){
		for(var cellIndex = 0; cellIndex < squares.length; cellIndex++){
			squares[cellIndex].innerText = '';
			squares[cellIndex].classList.remove('taken');
		}
		gameOver = false;
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