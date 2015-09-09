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
		console.log('all filled');
		if(arrayOfThreeCells.every(hasThreeXs)){
			console.log('x won')
		}
		else if(arrayOfThreeCells.every(hasThreeOs)){
			console.log('o won')
		}
	}
	else{
		console.log('some are empty')
	}
}

function checkRow(rowNumber, sortedGameBoard){
	row = sortedGameBoard[rowNumber]
	console.log(row)
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
	return sortedGameBoard
}

function checkForWinner(board){
	sortedBoard = sortBoard(board);
	console.log(sortedBoard)
	for(var rowColIndex = 0; rowColIndex < sortedBoard.length; rowColIndex++){
		console.log('checking')
		console.log(rowColIndex)
		checkRow(rowColIndex, sortedBoard)
		checkColumn(rowColIndex, sortedBoard)
	}
}