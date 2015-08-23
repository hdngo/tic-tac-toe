document.addEventListener("DOMContentLoaded", function(){

	var turn = 0;
	var squares = document.getElementsByClassName('square')
	var newGameButton = document.getElementById('new-game-btn')
	newGameButton.addEventListener('click', newGame)
	var gameOver = false;

	var assortedSquares = [[squares[0], squares[1], squares[2]], [squares[3], squares[4], squares[5]], [squares[6], squares[7], squares[8]]]

	for(var squareNumber = 0; squareNumber < squares.length; squareNumber ++){
		squares[squareNumber].addEventListener('click', makeMove);
	}

	function makeMove(){
		if (gameOver){
			return
		}
		checkSquare(event.target);
		if (checkSquare(event.target)){
			alert("that square has been taken already, pick another one!")
		}
		else{
		if (turn % 2 == 0){
			marker = "X";
		}
		else {
			marker = "O";
		}
			playerMarker = makePlayerMarker(marker)
			event.target.appendChild(playerMarker);
			event.target.classList.add('taken');
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
			alert("we have a winner")
			gameOver = true;
		}
		for (var rowColIndex = 0; rowColIndex < assortedSquares.length; rowColIndex++){
			if(checkRow(assortedSquares[rowColIndex]) || checkColumn(rowColIndex)){
				alert("we have a winner")
				gameOver = true;
			}
		}
	}

	function newGame(){
		for(var cellIndex = 0; cellIndex < squares.length; cellIndex++){
			squares[cellIndex].innerText = '';
			squares[cellIndex].classList.remove('taken');
		}
	}

});