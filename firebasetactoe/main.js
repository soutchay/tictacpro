var app = angular.module("myApp", ["firebase"]);

app.controller("BoxController", ["$scope", "$firebase", function ($scope, $firebase){

 	$scope.remoteGameContainer = $firebase(new Firebase("https://tactictoe.firebaseio.com/databaseGameContainer")) ;
 	var firebasedata = new Firebase("https://tactictoe.firebaseio.com/databaseGameContainer");
 	//different variables for angularfire and firebase respectively
	$scope.restartArray = new Object;
		$scope.restartArray["0"] = {player:"A", placeholder: " "};
		$scope.restartArray["1"] = {player:"A", placeholder: " "};
		$scope.restartArray["2"] = {player:"A", placeholder: " "};
		$scope.restartArray["3"] = {player:"A", placeholder: " "};
		$scope.restartArray["4"] = {player:"A", placeholder: " "};
		$scope.restartArray["5"] = {player:"A", placeholder: " "};
		$scope.restartArray["6"] = {player:"A", placeholder: " "};
		$scope.restartArray["7"] = {player:"A", placeholder: " "};
		$scope.restartArray["8"] = {player:"A", placeholder: " "};

	$scope.gameScore =  {xScore: "", oScore: "", ties: ""};
	$scope.isXThenO = true;
	//variable isXThenO to switch between X and O	
	$scope.turn = 0;
	$scope.gameOver = false;
	//turn and gameOver defined for turns of the game and when the game is over respectively
	$scope.specialIsOff = true;
	//specialIsOff variable for when a player can hide their move

	firebasedata.once("value", function(data) {
		if(data.val().totalNumPlayers == 2) {
			$scope.currentPlayer = 0;
		}
		else {
			$scope.currentPlayer = 1;
		}
		//instantiates a local variable that gets referenced to in firebase to make sure one player cannot play when it is not their turn
		$scope.gameContainer = {
		  cellListArray: $scope.restartArray,
		  clickCounter: $scope.turn,
		  isGameOver: $scope.gameOver,
		  isXFirst: $scope.isXThenO,
		  totalScore: $scope.gameScore,
		  specialMoveOff: $scope.specialIsOff,
		  totalNumPlayers: $scope.currentPlayer +1
		} ;	
		//gameContainer is an object with properties that have the angular variables as their values in order to store data into firebase
		$scope.remoteGameContainer.$bind($scope, "gameContainer") ;
		//binds the variable gameContainer to the angularfire database
		$scope.restartGame();
	})	


	$scope.cellOnClick = function (cellID) {
		if ($scope.gameContainer.isGameOver == true) {
			return;
		}
		//function will return if the game is over
		if ($scope.gameContainer.specialMoveOff){
			if (cellID.player == "A" && $scope.gameContainer.isGameOver == false && $scope.currentPlayer == ($scope.gameContainer.clickCounter % 2) ) {
				if ($scope.gameContainer.clickCounter % 2 == 0) {
					cellID.placeholder = $scope.gameContainer.isXFirst ? "X" : "O";
					//selects the cell clicked on and puts an "X"
					cellID.player = "X";
				}
				else {
					cellID.placeholder = $scope.gameContainer.isXFirst ? "O" : "X";
					//selects the cell clicked on and puts an "O"
					cellID.player = "O";
				}
				$scope.gameContainer.clickCounter ++;
			}
		}

		//else statement if a player used the special move button
		else {
			if (cellID.player == "A" && $scope.gameContainer.isGameOver == false && $scope.currentPlayer == ($scope.gameContainer.clickCounter % 2))
				if ($scope.gameContainer.clickCounter % 2 == 0) {
					//selects the cell clicked on and puts an "X"
					cellID.placeholder = " ";
					cellID.player = "X";
				}
				else {
					//selects the cell clicked on and puts an "O"
					cellID.placeholder =  " ";
					cellID.player = "O";
				}
				$scope.gameContainer.clickCounter ++;	
				$scope.gameContainer.specialMoveOff = true;	
		}		
		//the above is to determine who's turn it is and what gets placed in the player property
		
		// conditions to win the game
		if ($scope.gameContainer.cellListArray["0"].player == "X" && $scope.gameContainer.cellListArray["1"].player == "X" && $scope.gameContainer.cellListArray["2"].player == "X" ||
			$scope.gameContainer.cellListArray["3"].player == "X" && $scope.gameContainer.cellListArray["4"].player == "X" && $scope.gameContainer.cellListArray["5"].player == "X" ||
			$scope.gameContainer.cellListArray["6"].player == "X" && $scope.gameContainer.cellListArray["7"].player == "X" && $scope.gameContainer.cellListArray["8"].player == "X" ||
			$scope.gameContainer.cellListArray["0"].player == "X" && $scope.gameContainer.cellListArray["3"].player == "X" && $scope.gameContainer.cellListArray["6"].player == "X" ||
			$scope.gameContainer.cellListArray["1"].player == "X" && $scope.gameContainer.cellListArray["4"].player == "X" && $scope.gameContainer.cellListArray["7"].player == "X" ||
			$scope.gameContainer.cellListArray["2"].player == "X" && $scope.gameContainer.cellListArray["5"].player == "X" && $scope.gameContainer.cellListArray["8"].player == "X" ||
			$scope.gameContainer.cellListArray["0"].player == "X" && $scope.gameContainer.cellListArray["4"].player == "X" && $scope.gameContainer.cellListArray["8"].player == "X" ||
			$scope.gameContainer.cellListArray["6"].player == "X" && $scope.gameContainer.cellListArray["4"].player == "X" && $scope.gameContainer.cellListArray["2"].player == "X" )	
		{	
		 	alert("Player " + ($scope.gameContainer.isXFirst ? "X" : "O") + " Win");
		 	console.log("someone won");
			if 	($scope.gameContainer.isXFirst) {
				$scope.gameContainer.totalScore.xScore ++;
				$scope.gameContainer.isXFirst = false;
			}
			else{
				$scope.gameContainer.totalScore.oScore ++;
				$scope.gameContainer.isXFirst = true;
			}	
			$scope.gameContainer.isGameOver = true;			 	
		}
		else if (
			$scope.gameContainer.cellListArray["0"].player == "O" && $scope.gameContainer.cellListArray["1"].player == "O" && $scope.gameContainer.cellListArray["2"].player == "O" ||
			$scope.gameContainer.cellListArray["3"].player == "O" && $scope.gameContainer.cellListArray["4"].player == "O" && $scope.gameContainer.cellListArray["5"].player == "O" ||
			$scope.gameContainer.cellListArray["6"].player == "O" && $scope.gameContainer.cellListArray["7"].player == "O" && $scope.gameContainer.cellListArray["8"].player == "O" ||
			$scope.gameContainer.cellListArray["0"].player == "O" && $scope.gameContainer.cellListArray["3"].player == "O" && $scope.gameContainer.cellListArray["6"].player == "O" ||
			$scope.gameContainer.cellListArray["1"].player == "O" && $scope.gameContainer.cellListArray["4"].player == "O" && $scope.gameContainer.cellListArray["7"].player == "O" ||
			$scope.gameContainer.cellListArray["2"].player == "O" && $scope.gameContainer.cellListArray["5"].player == "O" && $scope.gameContainer.cellListArray["8"].player == "O" ||
			$scope.gameContainer.cellListArray["0"].player == "O" && $scope.gameContainer.cellListArray["4"].player == "O" && $scope.gameContainer.cellListArray["8"].player == "O" ||
			$scope.gameContainer.cellListArray["6"].player == "O" && $scope.gameContainer.cellListArray["4"].player == "O" && $scope.gameContainer.cellListArray["2"].player == "O" ) 
		{
			alert("Player " + (!$scope.gameContainer.isXFirst? "X" : "O") + " Win");
			if 	(!$scope.gameContainer.isXFirst) {
				$scope.gameContainer.totalScore.xScore ++;
				$scope.gameContainer.isXFirst = false;
			}
			else{
				$scope.gameContainer.totalScore.oScore ++;
				$scope.gameContainer.isXFirst = true;
			}
			$scope.gameContainer.isGameOver = true;						 
		}
		else {
			console.log("it is turn " + $scope.gameContainer.clickCounter);
			if ($scope.gameContainer.clickCounter == 9 && $scope.gameContainer.isGameOver == false) {
				alert("Tie Game!");
				$scope.gameContainer.isGameOver = true;			
				$scope.gameContainer.totalScore.ties ++;			
			}
		}
		//results in a tie at 9 turns and if the game is not over
	};
	
	// RESET GAME
	$scope.restartGame = function() {
		$scope.gameContainer.cellListArray = $scope.restartArray;
		$scope.gameContainer.isGameOver = false;
		$scope.gameContainer.clickCounter = 0;
		$scope.gameContainer.specialMoveOff = true;
	};
	// Function to hide player's move
	$scope.special = function() {
		return $scope.gameContainer.specialMoveOff = false;
	}

}]);
