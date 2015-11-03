(function(){
	document.addEventListener("DOMContentLoaded", function(){
		var squares = document.getElementsByClassName('square')
		var newGame = new Game();

		for(var squareNumber = 0; squareNumber < squares.length; squareNumber ++){
			squares[squareNumber].addEventListener('click', makePlayerMove);
		}

		function makePlayerMove(){
			if(newGame.over){
				return
			}
			if(this.innerText){
				badMoveSound.play();
			}
			else{
				this.innerText = newGame.currentPlayer;
				newGame.board.update(flattenedBoard(squares))
				newGame.updateStatus(newGame.currentPlayer);
				if(!newGame.over){
					newGame.switchPlayers();
					var computerMoveIndex = newGame.makeComputerMove();
					document.getElementById(computerMoveIndex).innerText = newGame.computerPlayer;
					newGame.board.update(flattenedBoard(squares))
					newGame.updateStatus(newGame.currentPlayer);
					newGame.switchPlayers();
				}
			}
		}

		var newGameButton = document.getElementById('new-game-btn')
		newGameButton.addEventListener('click', reset)

		function reset(){
			for(var squareIndex = 0; squareIndex < squares.length; squareIndex++){
				squares[squareIndex].innerText = "";
			}
			newGame = new Game();
		}
	})
}())
