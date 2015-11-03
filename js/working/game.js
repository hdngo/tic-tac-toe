function Game(squareValues){
	this.winner = null;
	this.over = false;
	this.tie = false;
	this.turn = 0;
	this.board = new Board()
	this.humanPlayer = "X",
	this.computerPlayer = "O",
	this.currentPlayer = this.humanPlayer
}

Game.prototype.switchPlayers = function(){
	this.turn++;
	this.currentPlayer == this.humanPlayer ? ( 
		this.currentPlayer = this.computerPlayer 
		) : ( 
		this.currentPlayer = this.humanPlayer 
		);
}


Game.prototype.updateStatus = function(currentPlayer){
	if(this.board.checkForWinner(currentPlayer)){
		this.winner = currentPlayer;
		alert(currentPlayer + ' wins')
	}
	if(this.board.checkForTie()){
		this.tie = true;
		alert('We have a tie!')
	}
	this.isOver();
}

Game.prototype.isOver = function(){
	if(this.winner || this.tie){
		this.over = true;
	}
		return;
}


Game.prototype.makeComputerMove = function(currentBoardSquareValues){
	var moveIndex;
	if(this.turn == 1){
		moveIndex = this.makeFirstComputerMove();
	}
	else{
		if(this.board.checkForWinnerInNextMove() === 0 || this.board.checkForWinnerInNextMove()){
			moveIndex = this.board.checkForWinnerInNextMove()
		}
		else{
			if(this.board.checkForDiagonalFork()){
				moveIndex = this.board.pickRandomEdge();
			}
			else{
				var oForks = this.board.checkForPotentialForks("O", "X");
				var xForks = this.board.checkForPotentialForks("X", "O");
				//if xforks is greater than 1, pick a corner; if its equal to 1, make that move; if no forks at all, make an available corner move, else make an empty edge
				if(oForks.length > 0){
					var randomIndex = Math.floor(Math.random() * oForks.length)
					moveIndex = oForks[randomIndex];
				}
				else if(xForks.length > 1){
					moveIndex = this.board.pickRandomCorner();
				}
				else if(xForks.length == 1){
					moveIndex = xForks[0];
				}
				else if(oForks.length == 0 && xForks.length == 0){
					if(this.board.getAvailableCorners().length > 0){
						moveIndex = this.board.pickRandomCorner();
					} 
					else{
						moveIndex = this.board.pickRandomEdge();
					}
				}
			}
		}
	}
	return moveIndex;
}

Game.prototype.makeFirstComputerMove = function(){
	var firstMoveIndex;
	if(this.board.squares[4] == ""){
		firstMoveIndex = 4;
	}
	else{
		firstMoveIndex = this.board.pickRandomCorner();
	}
	return firstMoveIndex;
}