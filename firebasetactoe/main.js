// with angular we can do stuff that curl does
// var myHttp;
//declare variable myHttp


var app = angular.module("myApp", ["firebase"]);

app.controller("BoxController", ["$scope", "$firebase", function ($scope, $firebase){
	// console.log('shit works');
	// console.log($scope.rateme);
 	$scope.remoteGameContainer = $firebase(new Firebase("https://tactictoe.firebaseio.com/databaseGameContainer")) ;

	var restartArray = 
	[{player: 0, placeholder:""}, {player: 0, placeholder:""}, {player: 0, placeholder:""},
	 {player: 0, placeholder:""}, {player: 0, placeholder:""}, {player: 0, placeholder:""},
	 {player: 0, placeholder:""}, {player: 0, placeholder:""}, {player: 0, placeholder:""}];
	// $scope.boxArray = angular.copy($scope.restartArray);
	// //an array used to make the board
	// // console.log($scope.boxArray);
	// // $scope.scoreBoard = [{first: }, {second: }]
	// $scope.turn = 0;
	// $scope.gameOver = false;
	$scope.gameScore =  {xScore: 0, oScore: 0, ties: 0};
	//turn and gameOver defined for turns of the game and when the game is over respectively
	$scope.isXThenO = true;
	//variable to switch between X and O	
	$scope.turn = 0;
	$scope.boxArray = angular.copy(restartArray);
	$scope.gameOver = false;
	var specialIsOff = true;

	$scope.gameContainer = {
	  cellListArray: $scope.boxArray,
	  clickCounter: $scope.turn,
	  isGameOver: $scope.gameOver,
	  isXFirst: $scope.isXThenO,
	  totalScore: $scope.gameScore
	} ;	
	$scope.remoteGameContainer.$bind($scope, "gameContainer") ;
	if (specialIsOff){	
	$scope.cellOnClick = function (cellID) {

		console.log("clicked " + cellID.player);
		// console.log("this is", something);
		// console.log("restart array is", restartArray);
		if ($scope.gameContainer.isGameOver ==true) {
			return;
		}
		if (cellID.player == 0 && $scope.gameContainer.isGameOver == false) {
						// console.log("true or false"+$scope.gameContainer.clickCounter % 2 == 0);
			if ($scope.gameContainer.clickCounter % 2 == 0) {
				cellID.placeholder = $scope.gameContainer.isXFirst ? "X" : "O";
				//selects the cell clicked on and puts an "X"
				cellID.player = 1;
			}
			else {
				cellID.placeholder = $scope.gameContainer.isXFirst ? "O" : "X";
				//selects the cell clicked on and puts an "O"
				cellID.player = 2;
			}
			$scope.gameContainer.clickCounter ++;
			console.log(cellID.player + " this is what it is");
		}		
		//the above is to determine who's turn it is and what gets placed in the property player
		// console.log(this.$index);
		// console.log(this.cell.player)
		
		if ($scope.gameContainer.cellListArray[0].player == 1 && $scope.gameContainer.cellListArray[1].player == 1 && $scope.gameContainer.cellListArray[2].player == 1 ||
			$scope.gameContainer.cellListArray[3].player == 1 && $scope.gameContainer.cellListArray[4].player == 1 && $scope.gameContainer.cellListArray[5].player == 1 ||
			$scope.gameContainer.cellListArray[6].player == 1 && $scope.gameContainer.cellListArray[7].player == 1 && $scope.gameContainer.cellListArray[8].player == 1 ||
			$scope.gameContainer.cellListArray[0].player == 1 && $scope.gameContainer.cellListArray[3].player == 1 && $scope.gameContainer.cellListArray[6].player == 1 ||
			$scope.gameContainer.cellListArray[1].player == 1 && $scope.gameContainer.cellListArray[4].player == 1 && $scope.gameContainer.cellListArray[7].player == 1 ||
			$scope.gameContainer.cellListArray[2].player == 1 && $scope.gameContainer.cellListArray[5].player == 1 && $scope.gameContainer.cellListArray[8].player == 1 ||
			$scope.gameContainer.cellListArray[0].player == 1 && $scope.gameContainer.cellListArray[4].player == 1 && $scope.gameContainer.cellListArray[8].player == 1 ||
			$scope.gameContainer.cellListArray[6].player == 1 && $scope.gameContainer.cellListArray[4].player == 1 && $scope.gameContainer.cellListArray[2].player == 1 )	
		{	
		 	alert("Player " + ($scope.gameContainer.isXFirst ? "X" : "O") + " Win");
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
			$scope.gameContainer.cellListArray[0].player == 2 && $scope.gameContainer.cellListArray[1].player == 2 && $scope.gameContainer.cellListArray[2].player == 2 ||
			$scope.gameContainer.cellListArray[3].player == 2 && $scope.gameContainer.cellListArray[4].player == 2 && $scope.gameContainer.cellListArray[5].player == 2 ||
			$scope.gameContainer.cellListArray[6].player == 2 && $scope.gameContainer.cellListArray[7].player == 2 && $scope.gameContainer.cellListArray[8].player == 2 ||
			$scope.gameContainer.cellListArray[0].player == 2 && $scope.gameContainer.cellListArray[3].player == 2 && $scope.gameContainer.cellListArray[6].player == 2 ||
			$scope.gameContainer.cellListArray[1].player == 2 && $scope.gameContainer.cellListArray[4].player == 2 && $scope.gameContainer.cellListArray[7].player == 2 ||
			$scope.gameContainer.cellListArray[2].player == 2 && $scope.gameContainer.cellListArray[5].player == 2 && $scope.gameContainer.cellListArray[8].player == 2 ||
			$scope.gameContainer.cellListArray[0].player == 2 && $scope.gameContainer.cellListArray[4].player == 2 && $scope.gameContainer.cellListArray[8].player == 2 ||
			$scope.gameContainer.cellListArray[6].player == 2 && $scope.gameContainer.cellListArray[4].player == 2 && $scope.gameContainer.cellListArray[2].player == 2 ) 
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
		// conditions to win the game
		else {
			console.log("it is turn " + $scope.gameContainer.clickCounter);
			if ($scope.gameContainer.clickCounter == 9 && $scope.gameContainer.isGameOver == false) {
				alert("Tie Game!");
				$scope.gameContainer.isGameOver = true;			
				$scope.gameContainer.totalScore.ties ++;			
			}
		}
		//results in a tie at 9 turns and if the game is not over
	// console.log($scope.gameScore);
	};
	}
	// RESET GAME
	$scope.restartGame = function() {
		$scope.gameContainer.cellListArray = 
	[{player: 0, placeholder:""}, {player: 0, placeholder:""}, {player: 0, placeholder:""},
	 {player: 0, placeholder:""}, {player: 0, placeholder:""}, {player: 0, placeholder:""},
	 {player: 0, placeholder:""}, {player: 0, placeholder:""}, {player: 0, placeholder:""}];
		$scope.gameContainer.isGameOver = false;
		$scope.gameContainer.clickCounter = 0;
		console.log("reset game");
		console.log($scope.gameContainer.cellListArray);
	};
	// $scope.restartGame();
	$scope.special = function(cellID) {
		if (cellID.player == 0 && $scope.gameContainer.isGameOver == false) {
			if ($scope.gameContainer.clickCounter % 2 == 0){
				//selects the cell clicked on and puts an "X"
				cellID.player = 1;
			}

			else {
				//selects the cell clicked on and puts an "O"
				cellID.player = 2;
			}
		}
		$scope.gameContainer.clickCounter ++;
	}

}]);

	// console.log($scope.boxArray[0].player)
	// for ($scope.i = 0; $scope.i < $scope.boxArray.length; $scope.i++) {
	// 	if ($scope.boxArray[i].player ==1){
	// 		if($scope.boxArray[1]==1 && $scope.boxArray[2] ==1) {
	// 			console.log("player win");
	// 		}
	// 	}
	// }
	// $scope.cellOnHover = function () {
	// 	console.log('shit');
	// 	console.log(angular.srcElement);

	// 	//  if (this.cell.player ==0) {
	// 	// 		angular.element(e.srcElement).addClass('tHi');
	// 	// }
	// };
// 		    // return function(scope, element) {
//       //   element.bind('mouseenter', function(){
//       //       element.addClass('hover');
//       //   }).bind('mouseleave', function(){
//       //     element.removeClass('hover');
//       //   })
//     }
// })
// 	}
		// if ($scope.boxArray[4].player == 1 &&
		// 	$scope.boxArray[0].player == 1 || $scope.boxArray[2].player == 1 || $scope.boxArray[6].player==1 || $scope.boxArray[8].player==1 ||
		// 	$scope.boxArray[3].player ==1 || $scope.boxArray[1].player ==1 || $scope.boxArray[5].player ==1 || $scope.boxArray[3].player ==1 &&
		// 	$scope.boxArray[]) {
		// 	alert('win');
		// };
//	if middle,
		// then check if has top left, top right, bottom left, or bottom right, 
		// 	if top left, then check bottom right
		// 	if top right then check bottom left	
		
		//alternate between player 1 and player 2
//********
// app.directive('myRotate', function(){
// 	return {
// 		restrict: 'A',
// 		scope: {
// 			thatcell: '=mydata'
// 			//=mean binding goes both ways, so can change it in controller, bowf will be the variable in the scope of the controller
// 			//the mydata is name attribute in the div that is pointing to the cell in the boxArray in the controller
// 		},	
// 	controller: function($scope) {
// 			console.log('it works! this controller');
// 			console.log($scope.thatcell);
// 			console.log($scope.thatcell.player);
// 			console.log(this);
// 			// while ($scope.bowf.name)	
//     //   element.bind("mouseover", function(e){    
//     //        element.addClass('unfill').removeClass('filled');
//     //   });
//     //   element.bind("mouseout", function(e){
//     //        element.addClass('filled').removeClass('unfill');
//     //   }),
//     // link: function ($scope, element, attrs) {     
//     //   element.bind("mouseover", function(e){    
//     //        element.addClass('unfill').removeClass('filled');
//     //   });
//     //   element.bind("mouseout", function(e){
//     //        element.addClass('filled').removeClass('unfill');
//     //   }),						
// 		}
// 	}
// });
//*********************
// app.directive('myRotate', function(){
// 	return {
// 		restrict: 'A',
// 		scope: {
// 			bowf: '=mydata'
// 			//=mean binding goes both ways, so can change it in controller, bowf will be the variable in the scope of the controller
// 			//the mydata is name attribute in the div that is pointing to the cell in the boxArray in the controller
// 		},
// 	controller: function($scope) {
// 			console.log('it works! this controller');
// 			console.log($scope.bowf);
// 			console.log($scope.bowf.player);
// 			console.log(this);
// 			if ($scope.bowf.player == 0) {
// 			}
// 			// while ($scope.bowf.name)		
// 		}
// 	}
// });
	// //code above works, testing out how to create directives 
 
    //     element.bind('mouseenter', function(){
    //         element.addClass('rotatebox');
    //     }).bind('mouseleave', function(){
    //       element.removeClass('rotatebox');
    //     })
    // }
// document.getElementById("restart").addEventListener("click", function(){
// 	window.location.reload();
// });
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