document.addEventListener("DOMContentLoaded", function(){

	//test page loading
	console.log('page loaded');

	//initialize a variable to represent the first turn
	var turn = 0;
	var squares = document.getElementsByClassName('square')

	var assortedSquares = [[squares[0], squares[1], squares[2]], [squares[3], squares[4], squares[5]], [squares[6], squares[7], squares[8]]]

	//test to see if table elements were retrieved successfully
	// console.log(squares)

	//add an event listener for each square 
	for(var squareNumber = 0; squareNumber < squares.length; squareNumber ++){
		squares[squareNumber].addEventListener('click', makeMove);
	}

	function makeMove(){
		checkSquare(event.target);
		if (checkSquare(event.target)){
			alert("that square has been taken already, pick another one!")
		}
		else{
		console.log(event.target)
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
		for (var rowIndex = 0; rowIndex < assortedSquares.length; rowIndex++){
		}
	}

	function checkRightDiagonal(){

	}

	function checkForWin(){
		for (var rowColIndex = 0; rowColIndex < assortedSquares.length; rowColIndex++){
			if(checkRow(assortedSquares[rowColIndex]) || checkColumn(rowColIndex)){
				alert("we have a winner")
			}
		}
	}

});