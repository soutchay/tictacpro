var app = angular.module("myApp", []);

app.directive('ourRating', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" class="filled">' +
                      '\u2605' +
                  '</li>' +
                '</ul>',
        //template is what gets put into the div
      scope: {
      	// ratingValue: '=ratingValuee'
      	ratingValue: '=rateme'
      },      

      link: function (scope, elem, attrs) {
      	//scope, elem attached to, attrs are other parameters
        //console.log(scope, "Directive", elem, elem.scope(), "Attributes", attrs.ourRating.split(":"));
        //separate scope on every element, elem refers to the div, scope is elem.scope(), scope of THE DIV
        // comma can be used as a space and +
        console.log(scope.ratingValue);
        rating = 5;
        console.log(rating);
        //in scope, rating value is defined to equal itself in the html or whatever it is referencing to
        scope.stars = [];
        for (var i = 0; i < scope.ratingValue; i++) {
          scope.stars.push({});
        }
            
      }
        //u2605 is the unicode for a star
    }
    //returning an object that contains a function
});

app.controller("BoxController", ["$scope","$http", function ($scope, $http){
	// console.log('shit works');
	// console.log($scope.rateme);
	var users = new Firebase("https://tictacyo.firebaseio.com/");


	var restartArray = 
	[{player: 0}, {player: 0}, {player: 0},
	 {player: 0}, {player: 0}, {player: 0},
	 {player: 0}, {player: 0}, {player: 0}];
	var something = restartArray;
	$scope.gameScore =  {xScore: 0, oScore: 0, ties: 0};
	//turn and gameOver defined for turns of the game and when the game is over respectively
	$scope.isXThenO = true;
	//variable to switch between X and O
	$scope.cellOnClick = function () {
		// console.log("clicked " + this.$index);
		console.log("this is", something);
		console.log("restart array is", restartArray);
		if ($scope.gameOver ==true) {
			return;
		}
		if (this.cell.player == 0 && $scope.gameOver == false) {
			if ($scope.turn % 2 == 0) {
				$scope.boxArray[this.$index].placeholder = $scope.isXThenO ? "X" : "O";
				//selects the cell clicked on and puts an "X"
				this.cell.player = 1;
			}
			else {
				$scope.boxArray[this.$index].placeholder = $scope.isXThenO ? "O" : "X";
				//selects the cell clicked on and puts an "O"
				this.cell.player = 2;
			}
			$scope.turn ++;
			console.log(this.cell.player + " this is what it is");
		}		
		//the above is to determine who's turn it is and what gets placed in the property player
		// console.log(this.$index);
		// console.log(this.cell.player)
		
		if ($scope.boxArray[0].player == 1 && $scope.boxArray[1].player == 1 && $scope.boxArray[2].player == 1 ||
			$scope.boxArray[3].player == 1 && $scope.boxArray[4].player == 1 && $scope.boxArray[5].player == 1 ||
			$scope.boxArray[6].player == 1 && $scope.boxArray[7].player == 1 && $scope.boxArray[8].player == 1 ||
			$scope.boxArray[0].player == 1 && $scope.boxArray[3].player == 1 && $scope.boxArray[6].player == 1 ||
			$scope.boxArray[1].player == 1 && $scope.boxArray[4].player == 1 && $scope.boxArray[7].player == 1 ||
			$scope.boxArray[2].player == 1 && $scope.boxArray[5].player == 1 && $scope.boxArray[8].player == 1 ||
			$scope.boxArray[0].player == 1 && $scope.boxArray[4].player == 1 && $scope.boxArray[8].player == 1 ||
			$scope.boxArray[6].player == 1 && $scope.boxArray[4].player == 1 && $scope.boxArray[2].player == 1 )	
		{	
		 	alert("Player " + ($scope.isXThenO ? "X" : "O") + " Win");
			if 	($scope.isXThenO) {
				$scope.gameScore.xScore ++;
				$scope.isXThenO = false;
			}
			else{
				$scope.gameScore.oScore ++;
				$scope.isXThenO = true;
			}
			$scope.gameOver = true;				 	
		}
		else if (
			$scope.boxArray[0].player == 2 && $scope.boxArray[1].player == 2 && $scope.boxArray[2].player == 2 ||
			$scope.boxArray[3].player == 2 && $scope.boxArray[4].player == 2 && $scope.boxArray[5].player == 2 ||
			$scope.boxArray[6].player == 2 && $scope.boxArray[7].player == 2 && $scope.boxArray[8].player == 2 ||
			$scope.boxArray[0].player == 2 && $scope.boxArray[3].player == 2 && $scope.boxArray[6].player == 2 ||
			$scope.boxArray[1].player == 2 && $scope.boxArray[4].player == 2 && $scope.boxArray[7].player == 2 ||
			$scope.boxArray[2].player == 2 && $scope.boxArray[5].player == 2 && $scope.boxArray[8].player == 2 ||
			$scope.boxArray[0].player == 2 && $scope.boxArray[4].player == 2 && $scope.boxArray[8].player == 2 ||
			$scope.boxArray[6].player == 2 && $scope.boxArray[4].player == 2 && $scope.boxArray[2].player == 2 ) 
		{
			alert("Player " + (!$scope.isXThenO ? "X" : "O") + " Win");
			if 	(!$scope.isXThenO) {
				$scope.gameScore.xScore ++;
				$scope.isXThenO = false;
			}
			else{
				$scope.gameScore.oScore ++;
				$scope.isXThenO = true;
			}
			$scope.gameOver = true;	 
		}
		// conditions to win the game
		else {
			console.log("it is turn " + $scope.turn);
			if ($scope.turn == 9 && $scope.gameOver == false) {
				alert("Tie Game!");
				$scope.gameOver = true;	
				$scope.gameScore.ties ++;			
			}
		}
		//results in a tie at 9 turns and if the game is not over
	console.log($scope.gameScore);
	};

	$scope.restartGame = function() {
		$scope.boxArray = angular.copy(restartArray);
		$scope.gameOver = false;
		$scope.turn = 0;
		console.log("reset game");
		console.log($scope.boxArray);
	};

	$scope.restartGame();
}]);