function flattenedBoard(currentSquareValues){
	var flattenedBoard = [];
	for(var squareIndex = 0; squareIndex < currentSquareValues.length; squareIndex++){
		flattenedBoard.push(currentSquareValues[squareIndex].innerText)
	}
	return flattenedBoard;
}

function hasThreeXs(cell, index, array){
	return cell === "X";
}

function hasThreeOs(cell, index, array){
	return cell === "O";
}

function isNotEmpty(cell, index, array){
	return cell != "";
}

function matchArrays(array1, array2){
	for(var index = 0; index < array1.length; index++){
		if(array1[index] != array2[index]){
			return false;
		}
	}
	return true;
}

function getXandOCount(array){
	var xAndOCount = {"X": 0, "O": 0}
	for(var index = 0; index < array.length; index++){
		if(array[index] == "X"){
			xAndOCount["X"]++;
		}
		else if(array[index] == "O"){
			xAndOCount["O"]++;
		}
	}
	return xAndOCount;
}