// with angular we can do stuff that curl does
// var myHttp;
//declare variable myHttp


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
	// myHttp = $http; 
	$scope.boxArray = 
	[{player: 0}, {player: 0}, {player: 0},
	 {player: 0}, {player: 0}, {player: 0},
	 {player: 0}, {player: 0}, {player: 0}];
	$scope.restartArray = angular.copy($scope.boxArray);
	//an array used to make the board
	console.log($scope.boxArray);
	// $scope.scoreBoard = [{first: }, {second: }]
	$scope.turn = 0;
	$scope.gameOver = false;
	$scope.gameScore = [{score: 0}, {score: 0}];
	//turn and gameOver defined for turns of the game and when the game is over respectively
	$scope.cellOnClick = function () {
		// console.log("clicked " + this.$index);
		$scope.turn ++;
		while (this.cell.player == 0) {
			for (var i = 0; i <$scope.boxArray.length ; i++) {
				if ($scope.turn % 2 != 0) {
					$scope.boxArray[this.$index].placeholder = "X";
					this.cell.player = 1;
					console.log(this.cell.player + " this is what it is");
				}
				else {
					$scope.boxArray[this.$index].placeholder = "O";
					this.cell.player = 2;
					console.log(this.cell.player + " this is what it is");
				};
			}
		};
		//the above is to determine who's turn it is and what gets placed in the property player
		// console.log(this.$index);
		console.log(this.cell.player)
		$scope.$apply()(function() {
		if ($scope.boxArray[0].player == 1 && $scope.boxArray[1].player == 1 && $scope.boxArray[2].player == 1 ||
			$scope.boxArray[3].player == 1 && $scope.boxArray[4].player == 1 && $scope.boxArray[5].player == 1 ||
			$scope.boxArray[6].player == 1 && $scope.boxArray[7].player == 1 && $scope.boxArray[8].player == 1 ||
			$scope.boxArray[0].player == 1 && $scope.boxArray[3].player == 1 && $scope.boxArray[6].player == 1 ||
			$scope.boxArray[1].player == 1 && $scope.boxArray[4].player == 1 && $scope.boxArray[7].player == 1 ||
			$scope.boxArray[2].player == 1 && $scope.boxArray[5].player == 1 && $scope.boxArray[8].player == 1 ||
			$scope.boxArray[0].player == 1 && $scope.boxArray[4].player == 1 && $scope.boxArray[8].player == 1 ||
			$scope.boxArray[6].player == 1 && $scope.boxArray[4].player == 1 && $scope.boxArray[2].player == 1 )	
		 {
			alert("Player 1 Win");
			$scope.gameOver = true;
			$scope.boxArray = angular.copy($scope.restartArray);
			$scope.turn = 1;
			//resets turn to 1, makes it so it is player 2's turn
			console.log("turn is", $scope.turn);
			$scope.gameScore[0].score ++;
			console.log("player one won", $scope.gameScore[0].score, "time(s)!");
		}
		else if (
			$scope.boxArray[0].player == 2 && $scope.boxArray[1].player == 2 && $scope.boxArray[2].player == 2 ||
			$scope.boxArray[3].player == 2 && $scope.boxArray[4].player == 2 && $scope.boxArray[5].player == 2 ||
			$scope.boxArray[6].player == 2 && $scope.boxArray[7].player == 2 && $scope.boxArray[8].player == 2 ||
			$scope.boxArray[0].player == 2 && $scope.boxArray[3].player == 2 && $scope.boxArray[6].player == 2 ||
			$scope.boxArray[1].player == 2 && $scope.boxArray[4].player == 2 && $scope.boxArray[7].player == 2 ||
			$scope.boxArray[2].player == 2 && $scope.boxArray[5].player == 2 && $scope.boxArray[8].player == 2 ||
			$scope.boxArray[0].player == 2 && $scope.boxArray[4].player == 2 && $scope.boxArray[8].player == 2 ||
			$scope.boxArray[6].player == 2 && $scope.boxArray[4].player == 2 && $scope.boxArray[2].player == 2 ) {
			// $scope.apply();
			alert("Player 2 Win");
			$scope.gameOver = true;
			$scope.boxArray = angular.copy($scope.restartArray);
			$scope.turn = 0;
			//resets turn to 0, makes it so it is player 1's turn
			console.log("turn is", $scope.turn);
			$scope.gameScore[1].score ++;
			returnconsole.log("player two won", $scope.gameScore[1].score, "time(s)!");
		};
		// conditions to win the game
		console.log("it is turn " + $scope.turn);
		if ($scope.turn == 9 && $scope.gameOver == false) {
			alert("Tie Game!");
			$scope.boxArray = angular.copy($scope.restartArray);
		};
});
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
	};
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

}]);
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